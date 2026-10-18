import { chromium } from 'playwright';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const base = 'http://localhost:4321';
const dist = '/home/user/arabic-literature/dist';
// every built page
const pages = [];
(function walk(dir, rel) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) { if (!['_astro', 'pagefind'].includes(f)) walk(full, `${rel}${f}/`); }
    else if (f === 'index.html') pages.push(rel);
  }
})(dist, '/');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const mobile = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
const checked = new Map();
for (const path of pages) {
  const p = await mobile.newPage();
  p.on('pageerror', (e) => errors.push(`${path}: ${e.message}`));
  p.on('console', (m) => { if (m.type() === 'error') errors.push(`${path}: ${m.text()}`); });
  const r = await p.goto(base + path, { waitUntil: 'networkidle' });
  if (r.status() !== 200) errors.push(`${path}: HTTP ${r.status()}`);
  const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (over > 0) errors.push(`${path}: horizontal overflow ${over}px`);
  const dups = await p.evaluate(() => { const c = {}; document.querySelectorAll('[id]').forEach((e) => { c[e.id] = (c[e.id] || 0) + 1; }); return Object.keys(c).filter((k) => c[k] > 1).slice(0, 3); });
  if (dups.length) errors.push(`${path}: duplicate ids ${dups.join(' ')}`);
  const raw = await p.evaluate(() => (document.body.textContent.match(/\[[@~][^\]]*\]/g) || []).slice(0, 3));
  if (raw.length) errors.push(`${path}: raw tokens ${raw.join(' ')}`);
  const links = await p.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')));
  for (const l of new Set(links)) {
    const u = l.split('#')[0];
    if (!u) continue;
    if (/^\/path\/\d-\d+\//.test(u)) errors.push(`${path}: link to old station URL ${l}`);
    if (!checked.has(u)) checked.set(u, (await fetch(base + u)).status);
    if (checked.get(u) !== 200) errors.push(`${path}: broken link ${l} (${checked.get(u)})`);
  }
  await p.close();
}
console.log('pages checked:', pages.length);
const p = await mobile.newPage();
// قراءة سابقة محفوظة بالمعرّف القديم تُنقل إلى الجديد
await p.goto(base + '/', { waitUntil: 'networkidle' });
await p.evaluate(() => { localStorage.clear(); localStorage.setItem('done:1-4', '1'); localStorage.setItem('done:0-1', '1'); });
await p.goto(base + '/people/imru-al-qais/', { waitUntil: 'networkidle' });
console.log('migrated key:', await p.evaluate(() => [localStorage.getItem('done:imru-al-qais/hayatuhu'), localStorage.getItem('done:1-4')]));
console.log('stage 1 marked done on person page:', await p.$eval('[data-station-id="imru-al-qais/hayatuhu"]', (li) => li.classList.contains('is-done')));
await p.goto(base + '/', { waitUntil: 'networkidle' });
console.log('continue button:', await p.$eval('[data-continue]', (a) => `${a.textContent} → ${a.getAttribute('href')}`));
// إنهاء مسار كامل يعلّمه في الطريق المقترح
await p.evaluate(() => { for (const s of ['imru-al-qais/al-muallaqa-1', 'imru-al-qais/al-muallaqa-2']) localStorage.setItem(`done:${s}`, '1'); });
await p.goto(base + '/path/1/', { waitUntil: 'networkidle' });
console.log('path of imru al-qais done on era page:', await p.$eval('[data-done-all^="imru-al-qais"]', (li) => li.classList.contains('is-done')));
// زر الإنهاء في صفحة المرحلة
await p.goto(base + '/people/tarafa/hayatuhu/', { waitUntil: 'networkidle' });
await p.click('[data-done-toggle="tarafa/hayatuhu"]');
console.log('done button:', await p.$eval('[data-done-toggle="tarafa/hayatuhu"]', (b) => b.textContent));
console.log('pager:', await p.$$eval('.pager a', (as) => as.map((a) => a.innerText.replace(/\n/g, ' / '))));
// الروابط القديمة
for (const old of ['/path/1-4/', '/path/1-9/', '/path/0-1/']) {
  await p.goto(base + old, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  console.log('redirect', old, '→', p.url().replace(base, ''));
}
// قارئ الأبيات في المرحلة
await p.goto(base + '/people/imru-al-qais/hayatuhu/', { waitUntil: 'networkidle' });
for (const id of ['b-ala-im-sabahan-001', 'b-arana-mudiin-009']) {
  await p.click(`#${id} .verse-head`);
  console.log(`${id} opens:`, await p.$eval(`#${id}`, (v) => v.classList.contains('is-open')));
}
await p.goto(base + '/search/', { waitUntil: 'networkidle' });
for (const q of ['امرؤ القيس', 'أيام العرب', 'جليلة']) {
  await p.fill('#search input', q);
  await p.waitForTimeout(1200);
  console.log(`search ${q}:`, await p.$$eval('.pagefind-ui__result', (r) => r.length));
}
console.log('errors:', errors.length ? errors : 'none');
await b.close();
