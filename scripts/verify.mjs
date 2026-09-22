import { access, readFile } from 'node:fs/promises';
const required = ['index.html', 'styles.css', 'app.js', 'server.mjs'];
for (const file of required) await access(file);
const html = await readFile('index.html', 'utf8');
const js = await readFile('app.js', 'utf8');
if (!html.includes('app.js') || !js.includes('renderApp')) throw new Error('Application entry point is incomplete.');
console.log('Build verification passed: CAREERLENS static application is ready.');

