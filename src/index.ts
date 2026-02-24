#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { Command } from 'commander';
import { crawlSite } from './crawler';
import { renderJson, renderMarkdown } from './reporter';
import { renderRpgMap } from './rpg';
import type { CliOptions } from './types';

const program = new Command();

program
  .name('dogfood')
  .description('Autonomously crawl and dogfood a website using Playwright')
  .argument('<url>', 'Root URL to test')
  .option('--report <path>', 'Write report to file (default: stdout)')
  .option('--json', 'Output JSON instead of markdown')
  .option('--max-pages <n>', 'Max pages to visit (default: 20)', '20')
  .option('--depth <n>', 'Max link depth (default: 3)', '3')
  .option('--screenshots <dir>', 'Screenshot output dir (default: ./screenshots)', './screenshots')
  .option('--timeout <ms>', 'Per-page timeout (default: 10000)', '10000')
  .option('--no-interact', 'Skip form filling and button clicking, just crawl')
  .option('--verbose', 'Show progress in real-time')
  .option('--rpg', 'Generate an RPG dungeon map HTML visualization')
  .action(async (url: string, opts: Record<string, unknown>) => {
    try {
      const parsedUrl = new URL(url);
      const options: CliOptions = {
        maxPages: Number(opts.maxPages ?? 20),
        depth: Number(opts.depth ?? 3),
        screenshots: String(opts.screenshots ?? './screenshots'),
        timeout: Number(opts.timeout ?? 10000),
        interact: Boolean(opts.interact ?? true),
        verbose: Boolean(opts.verbose ?? false)
      };

      if (options.maxPages <= 0 || Number.isNaN(options.maxPages)) throw new Error('--max-pages must be a positive number');
      if (options.depth < 0 || Number.isNaN(options.depth)) throw new Error('--depth must be a number >= 0');
      if (options.timeout <= 0 || Number.isNaN(options.timeout)) throw new Error('--timeout must be a positive number');

      const report = await crawlSite(parsedUrl.toString(), options);
      const output = opts.json ? renderJson(report) : renderMarkdown(report);

      if (opts.report) {
        const reportPathInput = String(opts.report);
        const reportPath = path.extname(reportPathInput)
          ? reportPathInput
          : `${reportPathInput}${opts.json ? '.json' : '.md'}`;
        fs.writeFileSync(reportPath, output, 'utf8');
        if (options.verbose) console.error(`[dogfood] Report written to ${reportPath}`);

        if (opts.rpg) {
          const rpgPath = reportPath.replace(/\.[^.]+$/, '-rpg.html');
          fs.writeFileSync(rpgPath, renderRpgMap(report), 'utf8');
          if (options.verbose) console.error(`[dogfood] RPG map written to ${rpgPath}`);
        }
      } else {
        process.stdout.write(`${output}\n`);
        if (opts.rpg) {
          const rpgPath = './dogfood-rpg.html';
          fs.writeFileSync(rpgPath, renderRpgMap(report), 'utf8');
          if (options.verbose) console.error(`[dogfood] RPG map written to ${rpgPath}`);
        }
      }
    } catch (error) {
      console.error(`[dogfood] ${error instanceof Error ? error.message : String(error)}`);
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
