# dogfood-cli

Autonomously crawl and test websites from the terminal.

## Install

```bash
npm install
npx playwright install chromium
npm run build
npm link
```

Then use:

```bash
dogfood https://example.com
```

## Usage

```bash
dogfood <url> [options]

Options:
  --report <path>     Write report to file (default: stdout)
  --json              Output JSON instead of markdown
  --max-pages <n>     Max pages to visit (default: 20)
  --depth <n>         Max link depth (default: 3)
  --screenshots <dir> Screenshot output dir (default: ./screenshots)
  --timeout <ms>      Per-page timeout (default: 10000)
  --no-interact       Skip form filling and button clicking, just crawl
  --verbose           Show progress in real-time
```

## What it does

- Launches headless Chromium with Playwright
- Crawls same-origin links from the starting URL
- Optionally interacts with forms/buttons using faker test data
- Captures:
  - JS exceptions (`critical`)
  - Console errors (`warning`)
  - Failed network requests (`warning`)
  - Slow page loads >3000ms (`warning`)
  - Missing image alt text (`info`)
- Takes screenshots per page and per issue
- Outputs Markdown or JSON report

## Development

```bash
npm run dev -- https://catalog.bensbites.com --max-pages 5 --verbose
```
