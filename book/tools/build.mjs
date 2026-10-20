import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
// Playwright: the project's copy if installed, else the global one.
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
const D = process.argv[2], NAME = (process.argv[3] && process.argv[3] !== 'shots') ? process.argv[3] : 'book', shots = process.argv.includes('shots');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 700, height: 1000 }, deviceScaleFactor: 1.5 });
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.goto('file://' + D + '/out/' + NAME + '.html');
await p.waitForFunction(() => window.__pages > 0, null, { timeout: 120000 });
const bad = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg, i) => { const a = pg.querySelector('.area'), b = pg.querySelector('.body'), n = pg.querySelector('.notes'); const used = b.offsetHeight + (n.querySelector('li') ? n.offsetHeight : 0); return [i + 1, Math.round(a.clientHeight - used)]; }));
console.log('free px per page', JSON.stringify(bad));
await p.evaluate(() => document.fonts.ready);
const n = await p.evaluate(() => window.__pages);
console.log('pages', n);
if (shots) { const els = await p.$$('.page'); for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: `${D}/out/${NAME}-p${i + 1}.png` }); }
await p.pdf({ path: D + '/out/' + NAME + '.pdf', preferCSSPageSize: true, printBackground: true });
await b.close();
