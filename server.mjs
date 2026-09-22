import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try {
    const requested = new URL(req.url, 'http://localhost').pathname;
    const safePath = normalize(requested === '/' ? '/index.html' : requested).replace(/^([.]{2}[\\/])+/, '');
    let path = join(root, safePath);
    if (!path.startsWith(root) || !(await stat(path).catch(() => null))?.isFile()) path = join(root, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(path));
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, () => console.log(`CAREERLENS running at http://localhost:${port}`));
