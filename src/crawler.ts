import fs from 'node:fs';
import path from 'node:path';
import { chromium, type Browser, type ConsoleMessage, type Page } from 'playwright';
import { interactWithPage } from './interactor';
import type { CliOptions, CrawlReport, Issue, PageResult } from './types';

interface QueueItem {
  url: string;
  depth: number;
}

function slugifyUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120) || 'page';
}

function toIso(): string {
  return new Date().toISOString();
}

function issueFromConsole(msg: ConsoleMessage, currentUrl: string): Issue | null {
  if (msg.type() !== 'error') return null;
  return {
    type: 'console-error',
    message: msg.text(),
    severity: 'warning',
    url: currentUrl,
    timestamp: toIso()
  };
}

function isSameOrigin(baseOrigin: string, href: string): boolean {
  try {
    return new URL(href).origin === baseOrigin;
  } catch {
    return false;
  }
}

async function findMissingAltIssues(page: Page, url: string): Promise<Issue[]> {
  const count = await page.locator('img:not([alt]), img[alt=""]').count();
  if (count === 0) return [];
  return [{
    type: 'missing-alt',
    message: `${count} image(s) missing alt text`,
    severity: 'info',
    url,
    timestamp: toIso(),
    meta: { count }
  }];
}

export async function crawlSite(rootUrl: string, options: CliOptions): Promise<CrawlReport> {
  fs.mkdirSync(options.screenshots, { recursive: true });

  const startedAt = toIso();
  const queue: QueueItem[] = [{ url: rootUrl, depth: 0 }];
  const visited = new Set<string>();
  const pageResults: PageResult[] = [];
  const allIssues: Issue[] = [];

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const origin = new URL(rootUrl).origin;

  while (queue.length > 0 && visited.size < options.maxPages) {
    const next = queue.shift()!;
    if (visited.has(next.url) || next.depth > options.depth) continue;

    visited.add(next.url);
    if (options.verbose) console.error(`[dogfood] Visiting (${visited.size}/${options.maxPages}) depth=${next.depth} ${next.url}`);

    const page = await context.newPage();
    const issues: Issue[] = [];

    page.on('console', (msg) => {
      const issue = issueFromConsole(msg, page.url() || next.url);
      if (issue) issues.push(issue);
    });

    page.on('pageerror', (error) => {
      issues.push({
        type: 'js-exception',
        message: error.message,
        severity: 'critical',
        url: page.url() || next.url,
        timestamp: toIso()
      });
    });

    page.on('requestfailed', (request) => {
      issues.push({
        type: 'http-failure',
        message: `${request.method()} ${request.url()} failed: ${request.failure()?.errorText || 'unknown error'}`,
        severity: 'warning',
        url: page.url() || next.url,
        timestamp: toIso()
      });
    });

    const actions: PageResult['actions'] = [];
    const navStart = Date.now();

    try {
      const response = await page.goto(next.url, { waitUntil: 'domcontentloaded', timeout: options.timeout });
      const loadTimeMs = Date.now() - navStart;
      actions.push({ type: 'navigation', detail: `Loaded ${next.url} in ${loadTimeMs}ms`, success: true, timestamp: toIso() });

      if (loadTimeMs > 3000) {
        issues.push({
          type: 'slow-load',
          message: `Slow load: ${loadTimeMs}ms`,
          severity: 'warning',
          url: page.url(),
          timestamp: toIso(),
          meta: { loadTimeMs }
        });
      }

      const pageUrl = page.url();
      const screenshotBase = slugifyUrl(pageUrl);
      const pageShot = path.join(options.screenshots, `${String(pageResults.length + 1).padStart(3, '0')}-${screenshotBase}.png`);
      await page.screenshot({ path: pageShot, fullPage: true });

      const altIssues = await findMissingAltIssues(page, pageUrl);
      issues.push(...altIssues);

      // Discover links BEFORE interacting (interactions can navigate/close the page)
      const links = await page.locator('a[href]').evaluateAll((els) =>
        els.map((e) => (e as HTMLAnchorElement).href).filter(Boolean)
      );

      if (options.interact) {
        const interactionActions = await interactWithPage(page, options.timeout);
        actions.push(...interactionActions);
      }

      const discoveredLinks: string[] = [];
      for (const href of links) {
        if (!isSameOrigin(origin, href)) continue;
        const normalized = href.split('#')[0];
        discoveredLinks.push(normalized);
        if (!visited.has(normalized) && next.depth + 1 <= options.depth && queue.length + visited.size < options.maxPages) {
          queue.push({ url: normalized, depth: next.depth + 1 });
        }
      }

      actions.push({ type: 'discovery', detail: `Discovered ${discoveredLinks.length} same-origin links`, success: true, timestamp: toIso() });

      // Error screenshots (page may have been closed by interactions)
      if (!page.isClosed()) {
        for (let i = 0; i < issues.length; i++) {
          const issue = issues[i];
          const errorShot = path.join(options.screenshots, `${String(pageResults.length + 1).padStart(3, '0')}-${screenshotBase}-issue-${i + 1}.png`);
          try {
            await page.screenshot({ path: errorShot, fullPage: true });
            issue.screenshot = errorShot;
          } catch {
            // ignore screenshot failures
          }
        }
      }

      const result: PageResult = {
        url: pageUrl,
        depth: next.depth,
        title: await page.title(),
        statusCode: response?.status(),
        loadTimeMs,
        screenshot: pageShot,
        discoveredLinks,
        actions,
        issues
      };
      pageResults.push(result);
      allIssues.push(...issues);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      const failIssue: Issue = {
        type: 'js-exception',
        message: `Failed processing page ${next.url}: ${errMessage}`,
        severity: 'critical',
        url: next.url,
        timestamp: toIso()
      };
      const errorShot = path.join(options.screenshots, `${String(pageResults.length + 1).padStart(3, '0')}-${slugifyUrl(next.url)}-fatal.png`);
      if (!page.isClosed()) {
        try {
          await page.screenshot({ path: errorShot, fullPage: true });
          failIssue.screenshot = errorShot;
        } catch {
          // ignore
        }
      }
      allIssues.push(failIssue);
      pageResults.push({
        url: next.url,
        depth: next.depth,
        title: '(failed to load)',
        loadTimeMs: Date.now() - navStart,
        screenshot: failIssue.screenshot || '',
        discoveredLinks: [],
        actions: [...actions, { type: 'navigation', detail: errMessage, success: false, timestamp: toIso() }],
        issues: [failIssue]
      });
    } finally {
      if (!page.isClosed()) await page.close();
    }
  }

  await context.close().catch(() => undefined);
  await browser.close().catch(() => undefined);

  const summary = {
    pagesVisited: pageResults.length,
    errorsFound: allIssues.filter((i) => i.severity === 'critical').length,
    warningsFound: allIssues.filter((i) => i.severity === 'warning').length,
    infosFound: allIssues.filter((i) => i.severity === 'info').length
  };

  return {
    startedAt,
    finishedAt: toIso(),
    rootUrl,
    options,
    summary,
    pages: pageResults,
    issues: allIssues
  };
}
