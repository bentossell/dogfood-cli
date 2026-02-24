"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderJson = renderJson;
exports.renderMarkdown = renderMarkdown;
function renderJson(report) {
    return JSON.stringify(report, null, 2);
}
function renderMarkdown(report) {
    const lines = [];
    lines.push('# Dogfood Report');
    lines.push('');
    lines.push(`- **Target:** ${report.rootUrl}`);
    lines.push(`- **Started:** ${report.startedAt}`);
    lines.push(`- **Finished:** ${report.finishedAt}`);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push(`- Pages visited: **${report.summary.pagesVisited}**`);
    lines.push(`- Critical errors: **${report.summary.errorsFound}**`);
    lines.push(`- Warnings: **${report.summary.warningsFound}**`);
    lines.push(`- Info findings: **${report.summary.infosFound}**`);
    lines.push('');
    lines.push('## Per-page breakdown');
    lines.push('');
    for (const [idx, page] of report.pages.entries()) {
        lines.push(`### ${idx + 1}. ${page.title || '(untitled)'}  `);
        lines.push(`${page.url}`);
        lines.push('');
        lines.push(`- Depth: ${page.depth}`);
        lines.push(`- Load time: ${page.loadTimeMs}ms`);
        lines.push(`- Screenshot: ${page.screenshot || '(none)'}`);
        lines.push(`- Discovered links: ${page.discoveredLinks.length}`);
        lines.push('');
        lines.push('**Actions taken**');
        if (page.actions.length === 0) {
            lines.push('- None');
        }
        else {
            for (const action of page.actions) {
                lines.push(`- [${action.success ? 'x' : ' '}] ${action.type}${action.target ? ` (${action.target})` : ''}: ${action.detail}`);
            }
        }
        lines.push('');
        lines.push('**Issues**');
        if (page.issues.length === 0) {
            lines.push('- None');
        }
        else {
            for (const issue of page.issues) {
                lines.push(`- **${issue.severity.toUpperCase()}** [${issue.type}] ${issue.message}`);
                if (issue.screenshot)
                    lines.push(`  - Screenshot: ${issue.screenshot}`);
            }
        }
        lines.push('');
    }
    lines.push('## All issues');
    lines.push('');
    if (report.issues.length === 0) {
        lines.push('- None 🎉');
    }
    else {
        for (const issue of report.issues) {
            lines.push(`- **${issue.severity.toUpperCase()}** ${issue.url} — ${issue.type}: ${issue.message}`);
        }
    }
    lines.push('');
    return lines.join('\n');
}
