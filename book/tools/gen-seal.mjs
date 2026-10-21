// التوقيع والختم الشمعي في آخر المقدمة: الاسم بخط الرقعة، وتحته ختم من الشمع الأحمر محفور فيه «ياسر».
// node book/tools/gen-seal.mjs <name-font.woff2> <seal-font.woff2> <out.png> [seal text] [seal font size]
// الخطوط من حزم fontsource (مثل @fontsource/aref-ruqaa)، والصورة تُحفظ في book/assets.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
const [nameFont, sealFont, out, sealText = 'ياسر', sealSize = '62'] = process.argv.slice(2);
const b64 = (f) => readFileSync(f).toString('base64');

// حافة الشمع: دائرة متموجة غير منتظمة، كما يسيل الشمع تحت الختم
const R = 100, pts = [];
for (let i = 0; i < 96; i++) {
  const t = (i / 96) * 2 * Math.PI;
  const r = R * (1 + 0.035 * Math.sin(8 * t + 0.6) + 0.018 * Math.sin(13 * t + 2.1) + 0.012 * Math.sin(5 * t + 4));
  pts.push([r * Math.cos(t), r * Math.sin(t)]);
}
let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
for (let i = 0; i < pts.length; i++) {
  const p0 = pts[(i - 1 + pts.length) % pts.length], p1 = pts[i], p2 = pts[(i + 1) % pts.length], p3 = pts[(i + 2) % pts.length];
  const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
  d += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
}
// حبات الحلقة الداخلية
const beads = Array.from({ length: 36 }, (_, i) => {
  const t = (i / 36) * 2 * Math.PI;
  return `<circle cx="${(63 * Math.cos(t)).toFixed(2)}" cy="${(63 * Math.sin(t)).toFixed(2)}" r="1.6"/>`;
}).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: N; src: url(data:font/woff2;base64,${b64(nameFont)}); }
@font-face { font-family: S; src: url(data:font/woff2;base64,${b64(sealFont)}); }
html, body { margin: 0; background: transparent; }
#w { width: 240px; padding: 4px 0; display: flex; flex-direction: column; align-items: center; }
#n { font: 700 40px N; color: #2b1d12; direction: rtl; line-height: 1.5; margin-bottom: -2px; }
</style><div id="w"><div id="n">ياسر أحمد</div>
<svg width="220" height="220" viewBox="-110 -110 220 220">
<defs>
  <radialGradient id="wax" cx="40%" cy="35%" r="75%">
    <stop offset="0" stop-color="#b8222d"/><stop offset=".6" stop-color="#951620"/><stop offset="1" stop-color="#5e0810"/>
  </radialGradient>
  <radialGradient id="disc" cx="50%" cy="50%" r="55%">
    <stop offset="0" stop-color="#9e1a24"/><stop offset="1" stop-color="#82121b"/>
  </radialGradient>
  <filter id="bulge" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="b"/>
    <feSpecularLighting in="b" surfaceScale="2.5" specularConstant=".4" specularExponent="22" lighting-color="#ffd0d0" result="s">
      <feDistantLight azimuth="225" elevation="48"/></feSpecularLighting>
    <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
    <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0"/>
  </filter>
  <filter id="press" x="-10%" y="-10%" width="120%" height="120%">
    <feOffset in="SourceAlpha" dx="1.8" dy="2.2" result="o"/>
    <feGaussianBlur in="o" stdDeviation="2" result="ob"/>
    <feComposite in="SourceAlpha" in2="ob" operator="out" result="shadow"/>
    <feFlood flood-color="#3d0408" flood-opacity=".75"/><feComposite in2="shadow" operator="in" result="sh"/>
    <feOffset in="SourceAlpha" dx="-1.4" dy="-1.6" result="o2"/>
    <feGaussianBlur in="o2" stdDeviation="1.6" result="o2b"/>
    <feComposite in="SourceAlpha" in2="o2b" operator="out" result="hl"/>
    <feFlood flood-color="#ff9a9a" flood-opacity=".35"/><feComposite in2="hl" operator="in" result="hh"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sh"/></feMerge>
  </filter>
  <filter id="raise" x="-20%" y="-20%" width="140%" height="140%">
    <feOffset in="SourceAlpha" dx="1.2" dy="1.6" result="o"/><feGaussianBlur in="o" stdDeviation=".9" result="ob"/>
    <feFlood flood-color="#3d0408" flood-opacity=".8"/><feComposite in2="ob" operator="in" result="sh"/>
    <feOffset in="SourceAlpha" dx="-.9" dy="-1.1" result="h"/><feGaussianBlur in="h" stdDeviation=".6" result="hb"/>
    <feFlood flood-color="#ffb3b3" flood-opacity=".7"/><feComposite in2="hb" operator="in" result="hl"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="hl"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="drop" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="2" dy="3" result="o"/>
    <feFlood flood-color="#2a0a05" flood-opacity=".35"/><feComposite in2="o" operator="in"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
<g filter="url(#drop)"><path d="${d}" fill="url(#wax)" filter="url(#bulge)"/></g>
<circle r="74" fill="url(#disc)" filter="url(#press)"/>
<circle r="74" fill="none" stroke="#d24a52" stroke-opacity=".35" stroke-width="1"/>
<g filter="url(#raise)" fill="#931821">
  <circle r="69" fill="none" stroke="#931821" stroke-width="2.2"/>
  ${beads}
  <circle r="57" fill="none" stroke="#931821" stroke-width="1.4"/>
  <text id="t" x="0" y="0" text-anchor="middle" direction="rtl" style="font: 400 ${sealSize}px S">${sealText}</text>
</g>
</svg></div>`;

const br = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await br.newPage({ deviceScaleFactor: 4 });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
// يوسَّط الاسم في الختم بحسب حدود حبره الفعلية (canvas)، لا بحسب مقاييس الخط
await p.evaluate(([txt, size]) => {
  const c = document.createElement('canvas').getContext('2d');
  c.font = `400 ${size}px S`; c.direction = 'rtl'; c.textAlign = 'center';
  const m = c.measureText(txt), t = document.getElementById('t');
  t.setAttribute('x', ((m.actualBoundingBoxLeft - m.actualBoundingBoxRight) / 2).toFixed(2));
  t.setAttribute('y', ((m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2).toFixed(2));
}, [sealText, sealSize]);
await (await p.$('#w')).screenshot({ path: out, omitBackground: true });
await br.close();
console.log('wrote', out);
