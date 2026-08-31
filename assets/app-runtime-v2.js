"use strict";

function searchIndex() {
  const items = [];
  Object.values(ERAS).forEach(x=>items.push({type:"عصر",title:x.name,text:`${x.framing} ${x.quickSummary.map(y=>y.text).join(" ")}`,view:"era"}));
  Object.values(POETS).forEach(x=>items.push({type:"شاعر",title:x.name,text:`${x.fullName} ${x.summary} ${x.readingKeys.map(y=>y.text).join(" ")}`,view:"poet"}));
  Object.values(POEMS).forEach(x=>items.push({type:"قصيدة",title:x.title,text:`${x.occasion} ${x.readingThesis}`,view:"poem"}));
  Object.values(VERSES).forEach(x=>items.push({type:`بيت ${x.order}`,title:`${x.first} / ${x.second}`,text:`${x.meaning} ${x.vocabulary.map(y=>`${y.term} ${y.text}`).join(" ")} ${x.rhetoric.devices.map(y=>`${y.title} ${y.text}`).join(" ")}`,view:"poem",verseId:x.id}));
  Object.values(TERMS).forEach(x=>items.push({type:"مصطلح",title:x.name,text:x.definition,view:"guide"}));
  return items;
}

const INDEX = searchIndex();

function renderGuide() {
  const terms = Object.values(TERMS);
  return `
    ${sectionHead("الدليل", "بحث مترابط لا فهرس أسماء فقط", "سيكبر هذا الدليل مع المشروع. في النسخة الحالية يعرض الكيانات والمصطلحات التي بُنيت فعلًا.")}
    <button class="guide-search-box" type="button" id="guide-open-search"><span>⌕</span><b>ابحث في العصر والشاعر والقصيدة والأبيات والمصطلحات</b><small>مثال: الخضارم، الحدث، الاشتقاق، المتنبي</small></button>
    <div class="guide-groups">
      <article><span>العصر</span><button type="button" data-view="era">العصر العباسي <small>132–656هـ</small></button></article>
      <article><span>الشاعر</span><button type="button" data-view="poet">أبو الطيب المتنبي <small>303–354هـ</small></button></article>
      <article><span>القصيدة</span><button type="button" data-view="poem">على قدر أهل العزم <small>سنة 343هـ</small></button></article>
      <article><span>مصطلحات</span><div class="term-stack">${terms.map(t=>`<details><summary>${esc(t.name)}</summary><p>${esc(t.definition)}</p></details>`).join("")}</div></article>
    </div>`;
}

function renderSources() {
  return `
    ${sectionHead("التوثيق", "المصادر المستخدمة في هذه العينة", "لا تُعرض هنا مصادر لم نستعملها. لكل مصدر وظيفة واضحة داخل النص أو التحليل.")}
    <div class="sources-grid">${Object.keys(SOURCES).map(sourceCard).join("")}</div>`;
}

function renderMethod() {
  return `
    ${sectionHead("منهج التحقيق", "ما الذي يحدث قبل أن يظهر الشرح للقارئ؟", "هذا المنهج جزء من المنتج، وليس صفحة شكلية في آخر الموقع.")}
    <div class="method-steps">
      <article><span>01</span><h3>تثبيت النص</h3><p>يُقابل النص بديوان أو شرح موثوق، وتُسجل مواضع اختلاف الرواية بدل دمجها في نص واحد بلا تنبيه.</p></article>
      <article><span>02</span><h3>تثبيت المناسبة</h3><p>تُفرق الرواية التاريخية الثابتة عن الصياغة التفسيرية المتأخرة. في هذه القصيدة أثبت الواحدي صلتها ببناء ثغر الحدث سنة 343هـ.</p></article>
      <article><span>03</span><h3>الشرح اللغوي</h3><p>يبدأ من اللفظ والتركيب: معنى «الخضارم»، دلالة «القوائم»، وتوجيه «أتم» مثلًا. لا تُبنى البلاغة على فهم لغوي خاطئ.</p></article>
      <article><span>04</span><h3>التحليل البلاغي</h3><p>لا نكتفي بتسمية المحسن. نسأل: لماذا هذا الترتيب؟ كيف ترتبط الصورة بالحجة؟ ماذا يفعل البيت داخل القصيدة؟ وما الذي يتغير لو عُزل عن سياقه؟</p></article>
      <article><span>05</span><h3>فصل النقل عن القراءة</h3><p>ما يقوله الواحدي أو ابن سيده يُنسب إليهما. أما قراءتنا لوظيفة التقديم أو بنية المقطع فتعرض بوصفها تحليلًا للمشروع لا نصًا موروثًا.</p></article>
      <article><span>06</span><h3>إظهار المصدر</h3><p>المصدر مرتبط بالادعاء والبيت، ويمكن فتحه من موضع القراءة نفسه بدل قائمة مراجع بعيدة لا يعرف القارئ ماذا أسندت.</p></article>
    </div>`;
}

function render() {
  document.body.classList.toggle("depth-deep", state.depth === "deep");
  document.querySelectorAll(".depth-btn").forEach(btn=>btn.classList.toggle("active", btn.dataset.depth === state.depth));
  renderBreadcrumbs();
  const renderers = {map:renderMap, era:renderEra, poet:renderPoet, poem:renderPoem, guide:renderGuide, sources:renderSources, method:renderMethod};
  app.innerHTML = (renderers[state.view] || renderMap)();
  bindDynamic();
}

function bindDynamic() {
  app.querySelectorAll("[data-view]").forEach(el=>el.addEventListener("click",()=>setView(el.dataset.view)));
  app.querySelectorAll("[data-verse]").forEach(el=>el.addEventListener("click",()=>{
    state.verseId = el.dataset.verse;
    state.analysisTab = "meaning";
    render();
    history.replaceState(null,"",buildHash());
    if (window.innerWidth < 980) document.getElementById("analysis-panel")?.scrollIntoView({behavior:"smooth", block:"start"});
  }));
  app.querySelectorAll("[data-analysis-tab]").forEach(el=>el.addEventListener("click",()=>{
    state.analysisTab = el.dataset.analysisTab;
    const panel = document.getElementById("analysis-panel");
    if (panel) panel.innerHTML = renderVerseAnalysis(VERSES[state.verseId]);
    bindDynamic();
  }));
  app.querySelectorAll("[data-set-depth]").forEach(el=>el.addEventListener("click",()=>setDepth(el.dataset.setDepth)));
  app.querySelectorAll("[data-copy-verse]").forEach(el=>el.addEventListener("click", async()=>{
    const hash = `#view=poem&depth=${state.depth}&verse=${el.dataset.copyVerse}`;
    const url = `${location.origin}${location.pathname}${hash}`;
    try { await navigator.clipboard.writeText(url); el.textContent = "تم نسخ الرابط"; setTimeout(()=>el.textContent="نسخ رابط البيت",1400); }
    catch { location.hash = hash; }
  }));
  document.getElementById("guide-open-search")?.addEventListener("click", openSearch);
}

function openSearch() {
  searchDialog.showModal();
  searchInput.value = "";
  renderSearch("");
  setTimeout(()=>searchInput.focus(), 50);
}

function renderSearch(query) {
  const q = normalizeArabic(query);
  const results = q ? INDEX.filter(item=>normalizeArabic(`${item.title} ${item.text} ${item.type}`).includes(q)).slice(0,30) : INDEX.slice(0,10);
  searchResults.innerHTML = results.length ? results.map((item,i)=>`<button type="button" class="search-result" data-search-index="${INDEX.indexOf(item)}"><span>${esc(item.type)}</span><b>${esc(item.title)}</b><small>${esc(item.text).slice(0,170)}${item.text.length>170?"…":""}</small></button>`).join("") : `<p class="empty-search">لا توجد نتيجة مطابقة.</p>`;
  searchResults.querySelectorAll("[data-search-index]").forEach(el=>el.addEventListener("click",()=>{
    const item = INDEX[Number(el.dataset.searchIndex)];
    if (!item) return;
    searchDialog.close();
    if (item.verseId) setView("poem",{verseId:item.verseId}); else setView(item.view);
  }));
}

document.querySelectorAll("[data-view]").forEach(el=>el.addEventListener("click",()=>setView(el.dataset.view)));
document.querySelectorAll(".depth-btn").forEach(el=>el.addEventListener("click",()=>setDepth(el.dataset.depth)));
document.getElementById("search-trigger").addEventListener("click", openSearch);
searchInput.addEventListener("input", e=>renderSearch(e.target.value));
document.addEventListener("keydown", e=>{
  if (e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  if (e.key === "Escape" && searchDialog.open) searchDialog.close();
});
window.addEventListener("hashchange",()=>{readHash(); render();});

readHash();
render();
