import type { CrawlReport, PageResult } from './types';

interface RoomNode {
  id: number;
  url: string;
  label: string;
  depth: number;
  x: number;
  y: number;
  hasErrors: boolean;
  hasForms: boolean;
  statusCode?: number;
  consoleErrors: string[];
  actions: string[];
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pathLabel(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname || '/';
  } catch {
    return url;
  }
}

function toRoom(page: PageResult, id: number): RoomNode {
  const hasErrors = page.issues.some((i) => i.severity === 'critical' || i.severity === 'warning');
  const hasForms = page.actions.some((a) => a.type === 'fill' || a.type === 'submit');
  const consoleErrors = page.issues.filter((i) => i.type === 'console-error').map((i) => i.message);

  return {
    id,
    url: page.url,
    label: pathLabel(page.url),
    depth: page.depth,
    x: 0,
    y: 0,
    hasErrors,
    hasForms,
    statusCode: page.statusCode,
    consoleErrors,
    actions: page.actions.map((a) => `${a.type}: ${a.detail}`)
  };
}

function buildLayout(rooms: RoomNode[]): RoomNode[] {
  const byDepth = new Map<number, RoomNode[]>();
  for (const room of rooms) {
    if (!byDepth.has(room.depth)) byDepth.set(room.depth, []);
    byDepth.get(room.depth)!.push(room);
  }

  const depths = [...byDepth.keys()].sort((a, b) => a - b);
  const colGap = 210;
  const rowGap = 140;
  const baseX = 140;
  const baseY = 140;

  for (const depth of depths) {
    const group = byDepth.get(depth)!;
    group.forEach((room, idx) => {
      room.x = baseX + depth * colGap;
      room.y = baseY + idx * rowGap;
    });
  }

  return rooms;
}

export function renderRpgMap(report: CrawlReport): string {
  const rooms = buildLayout(report.pages.map((p, i) => toRoom(p, i)));

  const roomIndex = new Map<string, number>();
  rooms.forEach((room, idx) => roomIndex.set(room.url, idx));

  const links: Array<[number, number]> = [];
  report.pages.forEach((page, fromIdx) => {
    for (const link of page.discoveredLinks) {
      const toIdx = roomIndex.get(link);
      if (typeof toIdx === 'number') links.push([fromIdx, toIdx]);
    }
  });

  const totalPages = report.pages.length;
  const errorPages = report.pages.filter((p) => p.issues.some((i) => i.severity === 'critical' || i.severity === 'warning')).length;
  const cleanPages = totalPages - errorPages;
  const formsPages = report.pages.filter((p) => p.actions.some((a) => a.type === 'fill' || a.type === 'submit')).length;

  const totalMs = new Date(report.finishedAt).getTime() - new Date(report.startedAt).getTime();
  const totalSec = Number.isFinite(totalMs) ? (totalMs / 1000).toFixed(1) : '0.0';
  const healthPct = totalPages === 0 ? 100 : Math.round((cleanPages / totalPages) * 100);

  const roomsJson = JSON.stringify(rooms);
  const linksJson = JSON.stringify(links);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dogfood RPG Map</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d1117;
      --hud: #161b22;
      --text: #c9d1d9;
      --green: #2ea043;
      --red: #f85149;
      --gold: #d29922;
      --orange: #d56a26;
      --room: #1f2937;
      --roomText: #9fb3c8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: 'Press Start 2P', system-ui, monospace;
      image-rendering: pixelated;
    }
    .hud {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--hud);
      border-bottom: 4px solid #30363d;
      padding: 12px;
      display: grid;
      gap: 8px;
      grid-template-columns: 1.5fr repeat(4, 1fr);
      align-items: center;
      font-size: 11px;
    }
    .bar {
      background: #010409;
      border: 3px solid #30363d;
      height: 20px;
      position: relative;
      overflow: hidden;
    }
    .bar > span {
      display: block;
      height: 100%;
      background: linear-gradient(90deg, #238636, #2ea043);
      width: ${healthPct}%;
    }
    .value { color: #79c0ff; }
    #wrap { position: relative; padding: 12px; }
    #map { width: 100%; height: calc(100vh - 130px); border: 4px solid #30363d; background: #0b1220; display:block; }
    #tooltip {
      position: absolute;
      pointer-events: none;
      display: none;
      min-width: 220px;
      max-width: 460px;
      background: #111927;
      border: 3px solid #3b4a60;
      padding: 10px;
      font-size: 10px;
      line-height: 1.5;
      white-space: pre-wrap;
      z-index: 20;
    }
  </style>
</head>
<body>
  <div class="hud">
    <div>
      ❤️ Health ${healthPct}%
      <div class="bar"><span></span></div>
    </div>
    <div>📊 Pages <span class="value">${cleanPages}/${totalPages}</span></div>
    <div>💀 Errors <span class="value">${errorPages}</span></div>
    <div>📦 Forms <span class="value">${formsPages}</span></div>
    <div>⏱️ Time <span class="value">${totalSec}s</span></div>
  </div>
  <div id="wrap">
    <canvas id="map" width="1600" height="900"></canvas>
    <div id="tooltip"></div>
  </div>
  <script>
    const rooms = ${roomsJson};
    const links = ${linksJson};
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    const roomW = 140;
    const roomH = 86;

    function roomEdgePoint(a, b) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        return { x: a.x + (dx > 0 ? roomW / 2 : -roomW / 2), y: a.y };
      }
      return { x: a.x, y: a.y + (dy > 0 ? roomH / 2 : -roomH / 2) };
    }

    function drawKnight(x, y) {
      const p = 2;
      const ox = x - 12;
      const oy = y - 10;
      const pix = [
        [0,0,0,1,1,1,1,0],[0,0,1,2,2,2,2,1],[0,1,2,3,3,3,3,2],[1,2,3,3,4,4,3,3],
        [1,2,3,4,4,4,4,3],[0,1,2,4,5,5,4,2],[0,0,1,2,5,5,2,1],[0,0,0,1,2,2,1,0]
      ];
      const colors = {1:'#6e7681',2:'#8b949e',3:'#c9d1d9',4:'#58a6ff',5:'#f2cc60'};
      for (let r=0;r<pix.length;r++) for (let c=0;c<pix[r].length;c++) {
        const v = pix[r][c];
        if (!v) continue;
        ctx.fillStyle = colors[v];
        ctx.fillRect(ox + c*p, oy + r*p, p, p);
      }
    }

    function draw() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const minX = Math.min(...rooms.map(r => r.x), 0);
      const minY = Math.min(...rooms.map(r => r.y), 0);
      const maxX = Math.max(...rooms.map(r => r.x), w - 200);
      const maxY = Math.max(...rooms.map(r => r.y), h - 200);
      const mapW = Math.max(1, maxX - minX + 260);
      const mapH = Math.max(1, maxY - minY + 220);
      const sx = Math.min(1.3, Math.max(0.5, w / mapW));
      const sy = Math.min(1.3, Math.max(0.5, h / mapH));
      const s = Math.min(sx, sy);
      const offX = (w - mapW * s) / 2 - minX * s + 40;
      const offY = (h - mapH * s) / 2 - minY * s + 40;

      function tx(x) { return x * s + offX; }
      function ty(y) { return y * s + offY; }

      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#3b4a60';
      links.forEach(([a,b]) => {
        const ra = rooms[a], rb = rooms[b];
        if (!ra || !rb) return;
        const p1 = roomEdgePoint(ra, rb);
        const p2 = roomEdgePoint(rb, ra);
        ctx.beginPath();
        ctx.moveTo(tx(p1.x), ty(p1.y));
        ctx.lineTo(tx(p2.x), ty(p2.y));
        ctx.stroke();
      });

      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = '#d56a26';
      ctx.lineWidth = 2;
      for (let i = 0; i < rooms.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(tx(rooms[i].x), ty(rooms[i].y));
        ctx.lineTo(tx(rooms[i+1].x), ty(rooms[i+1].y));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      rooms.forEach((room, i) => {
        const x = tx(room.x) - (roomW * s) / 2;
        const y = ty(room.y) - (roomH * s) / 2;
        const w2 = roomW * s;
        const h2 = roomH * s;

        ctx.fillStyle = room.hasForms ? '#463610' : '#1f2937';
        ctx.fillRect(x, y, w2, h2);

        ctx.lineWidth = 4;
        ctx.strokeStyle = room.hasErrors ? '#f85149' : '#2ea043';
        ctx.strokeRect(x, y, w2, h2);

        ctx.fillStyle = '#9fb3c8';
        ctx.font = Math.max(8, Math.floor(10 * s)) + 'px "Press Start 2P"';
        const label = (room.label.length > 16 ? room.label.slice(0, 15) + '…' : room.label) || '/';
        ctx.fillText(label, x + 8, y + 18);

        ctx.font = Math.max(9, Math.floor(11 * s)) + 'px "Press Start 2P"';
        ctx.fillText('✓', x + 8, y + h2 - 10);
        if (room.hasErrors) ctx.fillText('💀', x + 26, y + h2 - 10);
        if (room.hasForms) ctx.fillText('📦', x + 50, y + h2 - 10);

        ctx.fillStyle = '#d56a26';
        ctx.font = Math.max(7, Math.floor(9 * s)) + 'px "Press Start 2P"';
        ctx.fillText(String(i + 1), x + w2 - 18, y + 16);
      });

      if (rooms.length > 0) {
        const last = rooms[rooms.length - 1];
        drawKnight(tx(last.x), ty(last.y));
      }

      window.__roomRects = rooms.map((r) => ({
        room: r,
        x: tx(r.x) - (roomW * s) / 2,
        y: ty(r.y) - (roomH * s) / 2,
        w: roomW * s,
        h: roomH * s
      }));
    }

    function roomAt(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const hit = (window.__roomRects || []).find((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h);
      return hit?.room;
    }

    canvas.addEventListener('mousemove', (e) => {
      const room = roomAt(e.clientX, e.clientY);
      if (!room) {
        tooltip.style.display = 'none';
        return;
      }

      const actions = room.actions.slice(0, 6).join('\n- ');
      const errors = room.consoleErrors.length ? room.consoleErrors.slice(0, 3).join('\n  • ') : 'None';
      tooltip.textContent = 'URL: ' + room.url + '\nStatus: ' + (room.statusCode || 'n/a') + '\nConsole errors:\n  • ' + errors + '\nActions:\n- ' + (actions || 'None');
      tooltip.style.left = (e.offsetX + 20) + 'px';
      tooltip.style.top = (e.offsetY + 20) + 'px';
      tooltip.style.display = 'block';
    });

    canvas.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

    window.addEventListener('resize', resize);
    resize();
  </script>
</body>
</html>`;
}
