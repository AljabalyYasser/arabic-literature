"use strict";

const ERAS = window.LIT_ERAS || {};
const POETS = window.LIT_POETS || {};
const POEMS = window.LIT_POEMS || {};
const VERSES = window.LIT_VERSES || {};
const SOURCES = window.LIT_SOURCES || {};
const TERMS = window.LIT_TERMS || {};

const app = document.getElementById("app");
const breadcrumbs = document.getElementById("breadcrumbs");
const searchDialog = document.getElementById("search-dialog");
const searchInput = document.getElementById("global-search");
const searchResults = document.getElementById("search-results");

const state = {
  view: "map",
  depth: "simple",
  eraId: "abbasid",
  poetId: "al-mutanabbi",
  poemId: "ala-qadr-ahl-al-azm",
  verseId: "mutanabbi-azm-001",
  analysisTab: "meaning"
};

const viewLabels = {
  map: "الخريطة",
  era: "العصر العباسي",
  poet: "المتنبي",
  poem: "على قدر أهل العزم",
  guide: "الدليل",
  sources: "المصادر",
  method: "منهج التحقيق"
};

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeArabic(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/ـ/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function sourceButton(id, compact = false) {
  const s = SOURCES[id];
  if (!s) return "";
  return `<a class="source-link${compact ? " compact" : ""}" href="${esc(s.url)}" target="_blank" rel="noopener">رؤية المصدر كاملًا ←</a>`;
}

function sourceCard(id) {
  const s = SOURCES[id];
  if (!s) return "";
  return `
    <article class="source-card">
      <div class="source-card-top"><span>مصدر</span>${s.page ? `<small>${esc(s.page)}</small>` : ""}</div>
      <h3>${esc(s.author)}</h3>
      <p class="source-title">${esc(s.title)}</p>
      <dl>
        ${s.editor ? `<div><dt>التحقيق</dt><dd>${esc(s.editor)}</dd></div>` : ""}
        ${s.edition ? `<div><dt>الطبعة</dt><dd>${esc(s.edition)}</dd></div>` : ""}
        ${s.publisher ? `<div><dt>الناشر</dt><dd>${esc(s.publisher)}</dd></div>` : ""}
        ${s.year ? `<div><dt>السنة</dt><dd>${esc(s.year)}</dd></div>` : ""}
      </dl>
      <p class="source-role">${esc(s.role)}</p>
      ${sourceButton(id)}
    </article>`;
}

function sectionHead(kicker, title, desc = "") {
  return `<div class="section-head"><span class="kicker">${esc(kicker)}</span><h2>${esc(title)}</h2>${desc ? `<p>${esc(desc)}</p>` : ""}</div>`;
}

function setView(view, options = {}) {
  if (options.verseId) state.verseId = options.verseId;
  if (options.tab) state.analysisTab = options.tab;
  state.view = view;
  document.querySelectorAll("[data-view]").forEach(btn => {
    if (btn.classList.contains("nav-btn")) btn.classList.toggle("active", btn.dataset.view === view);
  });
  render();
  history.replaceState(null, "", buildHash());
  requestAnimationFrame(() => app.focus({preventScroll:true}));
  window.scrollTo({top: 0, behavior: "smooth"});
}

function setDepth(depth) {
  state.depth = depth;
  document.body.classList.toggle("depth-deep", depth === "deep");
  document.querySelectorAll(".depth-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.depth === depth));
  render();
  history.replaceState(null, "", buildHash());
}

function buildHash() {
  const bits = [`view=${state.view}`, `depth=${state.depth}`];
  if (state.view === "poem") bits.push(`verse=${state.verseId}`);
  return `#${bits.join("&")}`;
}

function readHash() {
  const p = new URLSearchParams(location.hash.replace(/^#/, ""));
  const view = p.get("view");
  const depth = p.get("depth");
  const verse = p.get("verse");
  if (view && viewLabels[view]) state.view = view;
  if (depth === "deep" || depth === "simple") state.depth = depth;
  if (verse && VERSES[verse]) state.verseId = verse;
}

function renderBreadcrumbs() {
  const trail = [{view:"map", label:"تاريخ الأدب"}];
  if (["era","poet","poem"].includes(state.view)) trail.push({view:"era", label:"العصر العباسي"});
  if (["poet","poem"].includes(state.view)) trail.push({view:"poet", label:"المتنبي"});
  if (state.view === "poem") trail.push({view:"poem", label:"على قدر أهل العزم"});
  if (["guide","sources","method"].includes(state.view)) trail.push({view:state.view, label:viewLabels[state.view]});
  breadcrumbs.innerHTML = trail.map((item, i) => `${i ? `<span>←</span>` : ""}<button type="button" data-view="${item.view}">${esc(item.label)}</button>`).join("");
}

function renderMap() {
  const era = ERAS[state.eraId];
  const eras = [
    ["الجاهلي", "قبل الإسلام"], ["صدر الإسلام", "1–40هـ"], ["الأموي", "41–132هـ"], ["العباسي", "132–656هـ"],
    ["الأندلسي", "92–897هـ"], ["الدول والإمارات", "متداخل زمنيًا"], ["النهضة", "القرن 19م"], ["الحديث والمعاصر", "القرنان 20–21م"]
  ];
  return `
    <section class="hero-panel">
      <div class="hero-copy-block">
        <span class="eyebrow">البنية الجديدة: موسوعة واحدة بعمقين</span>
        <h1>ابدأ بالخريطة<br><em>لا بالشاعر</em></h1>
        <p>المسار المختصر ليس «عصر ← شاعر ← قصيدة». هو خريطة كاملة للأدب، ثم لكل عصر بوابة تشرح سياقه وتحولاته وأعلامه ونصوصه. وعندما تريد التعمق لا تنتقل إلى نسخة أخرى من الموقع؛ بل تتسع الصفحة نفسها.</p>
        <div class="hero-actions">
          <button class="primary-action" type="button" data-view="era">افتح نموذج العصر العباسي</button>
          <button class="text-action" type="button" data-view="poem">اذهب مباشرة إلى قارئ القصيدة ←</button>
        </div>
      </div>
      <div class="depth-explainer">
        <div><span>01</span><b>الخلاصة</b><p>تعطيك ما يلزم كي لا تضيع: الزمن، التحول، الأعلام، والنصوص المفاتيح.</p></div>
        <div><span>02</span><b>التعمق</b><p>يفتح داخل الموضوع نفسه: التاريخ الأدق، خصائص الأسلوب، الخلاف، التحليل، والمصادر.</p></div>
      </div>
    </section>

    ${sectionHead("الخريطة الكبرى", "تاريخ الأدب قبل تفاصيله", "هذه ليست القائمة النهائية للعصور؛ بل شكل المسار الذي سيملأ بالمحتوى بعد اعتماد النموذج.")}
    <div class="era-timeline">
      ${eras.map(([name,date], i) => `<button type="button" class="era-node ${name === "العباسي" ? "current" : "disabled"}" ${name === "العباسي" ? 'data-view="era"' : 'aria-disabled="true"'}><span>${String(i+1).padStart(2,"0")}</span><b>${name}</b><small>${date}</small>${name === "العباسي" ? '<i>النموذج المبني الآن</i>' : '<i>يُبنى لاحقًا</i>'}</button>`).join("")}
    </div>

    <section class="map-principle">
      <div><span class="kicker">قاعدة المعلومات</span><h2>العصر بوابة، لا بطاقة شاعر</h2></div>
      <p>${esc(era.framing)}</p>
    </section>`;
}

function renderEra() {
  const era = ERAS[state.eraId];
  return `
    <section class="entity-hero era-hero">
      <div>
        <span class="eyebrow">${esc(era.periodHijri)} · ${esc(era.periodGregorian)}</span>
        <h1>${esc(era.name)}</h1>
        <p>${esc(era.framing)}</p>
      </div>
      <div class="entity-stat"><b>موضعنا</b><strong>القرن الرابع</strong><small>حلب الحمدانية</small></div>
    </section>

    ${sectionHead("الخلاصة", "ما الذي يجب أن تعرفه عن العصر؟", "أربع أفكار تكفي لتكوين الصورة قبل الدخول في التفاصيل.")}
    <div class="quick-grid">
      ${era.quickSummary.map((x,i)=>`<article class="quick-card"><span>${String(i+1).padStart(2,"0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
    </div>

    <section class="focus-window">
      <div><span class="kicker">تكبير الخريطة</span><h2>${esc(era.focusWindow.title)}</h2><p>${esc(era.focusWindow.text)}</p></div>
      <strong>${esc(era.focusWindow.range)}</strong>
    </section>

    <div class="deep-only">
      ${sectionHead("الطبقة المتعمقة", "كيف نقرأ الحركة الأدبية؟", "بدل عبارات عامة مثل «ازدهر الأدب»، نفصل المحاور التي صنعت البيئة الأدبية.")}
      <div class="axis-grid">
        ${era.literaryAxes.map(x=>`<article><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
      </div>

      <section class="names-section">
        <div><span class="kicker">أسماء مفاتيح لا قائمة كاملة</span><h2>أعلام ترسم اتساع العصر</h2><p>وجود هذه الأسماء هنا يمنع الخطأ الذي ظهر في V1: المتنبي واحد من شبكة طويلة، لا «الشاعر الوحيد للعصر».</p></div>
        <div class="name-cloud">${era.keyNames.map(name=>`<span class="${name === "المتنبي" ? "active" : ""}">${esc(name)}</span>`).join("")}</div>
      </section>
    </div>

    <section class="checkpoint">
      <span class="kicker">قبل أن تغادر العصر</span>
      <h2>إذا فهمت هذه الأربع فقد أخذت العمود الفقري</h2>
      <ol>${era.whatYouKnow.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <button type="button" class="primary-action" data-view="poet">انتقل إلى المتنبي داخل هذا السياق</button>
    </section>

    <div class="deep-only source-inline">${era.sourceIds.map(id=>sourceButton(id,true)).join("")}</div>`;
}
