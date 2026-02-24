export type Severity = 'critical' | 'warning' | 'info';

export interface CliOptions {
  maxPages: number;
  depth: number;
  screenshots: string;
  timeout: number;
  interact: boolean;
  verbose: boolean;
}

export interface Issue {
  type: 'js-exception' | 'console-error' | 'http-failure' | 'slow-load' | 'missing-alt';
  message: string;
  severity: Severity;
  url: string;
  timestamp: string;
  screenshot?: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
}

export interface ActionRecord {
  type: 'navigation' | 'fill' | 'submit' | 'click' | 'discovery' | 'analysis';
  target?: string;
  detail: string;
  success: boolean;
  timestamp: string;
}

export interface PageResult {
  url: string;
  depth: number;
  title: string;
  statusCode?: number;
  loadTimeMs: number;
  screenshot: string;
  discoveredLinks: string[];
  actions: ActionRecord[];
  issues: Issue[];
}

export interface CrawlReport {
  startedAt: string;
  finishedAt: string;
  rootUrl: string;
  options: CliOptions;
  summary: {
    pagesVisited: number;
    errorsFound: number;
    warningsFound: number;
    infosFound: number;
  };
  pages: PageResult[];
  issues: Issue[];
}
