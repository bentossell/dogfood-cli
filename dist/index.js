#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const commander_1 = require("commander");
const crawler_1 = require("./crawler");
const reporter_1 = require("./reporter");
const rpg_1 = require("./rpg");
const program = new commander_1.Command();
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
    .action(async (url, opts) => {
    try {
        const parsedUrl = new URL(url);
        const options = {
            maxPages: Number(opts.maxPages ?? 20),
            depth: Number(opts.depth ?? 3),
            screenshots: String(opts.screenshots ?? './screenshots'),
            timeout: Number(opts.timeout ?? 10000),
            interact: Boolean(opts.interact ?? true),
            verbose: Boolean(opts.verbose ?? false)
        };
        if (options.maxPages <= 0 || Number.isNaN(options.maxPages))
            throw new Error('--max-pages must be a positive number');
        if (options.depth < 0 || Number.isNaN(options.depth))
            throw new Error('--depth must be a number >= 0');
        if (options.timeout <= 0 || Number.isNaN(options.timeout))
            throw new Error('--timeout must be a positive number');
        const report = await (0, crawler_1.crawlSite)(parsedUrl.toString(), options);
        const output = opts.json ? (0, reporter_1.renderJson)(report) : (0, reporter_1.renderMarkdown)(report);
        if (opts.report) {
            const reportPathInput = String(opts.report);
            const reportPath = node_path_1.default.extname(reportPathInput)
                ? reportPathInput
                : `${reportPathInput}${opts.json ? '.json' : '.md'}`;
            node_fs_1.default.writeFileSync(reportPath, output, 'utf8');
            if (options.verbose)
                console.error(`[dogfood] Report written to ${reportPath}`);
            if (opts.rpg) {
                const rpgPath = reportPath.replace(/\.[^.]+$/, '-rpg.html');
                node_fs_1.default.writeFileSync(rpgPath, (0, rpg_1.renderRpgMap)(report), 'utf8');
                if (options.verbose)
                    console.error(`[dogfood] RPG map written to ${rpgPath}`);
            }
        }
        else {
            process.stdout.write(`${output}\n`);
            if (opts.rpg) {
                const rpgPath = './dogfood-rpg.html';
                node_fs_1.default.writeFileSync(rpgPath, (0, rpg_1.renderRpgMap)(report), 'utf8');
                if (options.verbose)
                    console.error(`[dogfood] RPG map written to ${rpgPath}`);
            }
        }
    }
    catch (error) {
        console.error(`[dogfood] ${error instanceof Error ? error.message : String(error)}`);
        process.exitCode = 1;
    }
});
program.parseAsync(process.argv);
