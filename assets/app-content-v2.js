"use strict";

function renderPoet() {
  const poet = POETS[state.poetId];
  return `
    <section class="entity-hero poet-hero">
      <div>
        <span class="eyebrow">${esc(poet.born)} — ${esc(poet.died)}</span>
        <h1>${esc(poet.name)}</h1>
        <p>${esc(poet.summary)}</p>
      </div>
      <div class="identity-card"><small>الاسم</small><b>${esc(poet.fullName)}</b><small>الموضع الأدبي</small><b>القرن الرابع الهجري</b></div>
    </section>

    <section class="poet-position">
      <span class="kicker">ضعه في مكانه الصحيح</span>
      <h2>المتنبي داخل العصر لا بدل العصر</h2>
      <p>${esc(poet.relationshipToEra)}</p>
    </section>

    ${sectionHead("مفاتيح القراءة", "كيف نقرأ المتنبي؟", "هذه المفاتيح أهم من قائمة صفات محفوظة؛ لأنها ستعود معنا عند تحليل القصيدة نفسها.")}
    <div class="reading-key-grid">
      ${poet.readingKeys.map((x,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
    </div>

    <div class="deep-only">
      ${sectionHead("السيرة بوصفها سياقًا", "خط زمني مختصر", "لا نعرض السيرة لمجرد جمع الأحداث؛ نختار ما يساعد على فهم الشعر ومساره.")}
      <div class="timeline-list">${poet.timeline.map(x=>`<div><time>${esc(x.year)}</time><p>${esc(x.text)}</p></div>`).join("")}</div>
      <div class="source-inline">${poet.sourceIds.map(id=>sourceButton(id,true)).join("")}</div>
    </div>

    <section class="next-work">
      <div><span class="kicker">النص التطبيقي</span><h2>الآن نقرأ قصيدة، لا «مثالًا»</h2><p>القصيدة التالية مرتبطة بواقعة محددة وببناء حجة واضحة من الحكمة إلى مشهد الحرب. قارئ القصيدة سيجعل كل بيت عقدة يمكن فتحها دون تفكيك القصيدة إلى جزر.</p></div>
      <button type="button" class="primary-action" data-view="poem">افتح «على قدر أهل العزم»</button>
    </section>`;
}

function renderPoem() {
  const poem = POEMS[state.poemId];
  const verses = poem.verseIds.map(id => VERSES[id]).filter(Boolean);
  const selected = VERSES[state.verseId] || verses[0];
  return `
    <section class="poem-head">
      <div class="poem-title-block">
        <span class="eyebrow">${esc(poem.meter)} · ${esc(poem.rhyme)}</span>
        <h1>${esc(poem.title)}</h1>
        <p>${esc(poem.occasion)}</p>
        <div class="status-row"><span class="verified">النسبة: ${esc(poem.attribution.grade)}</span><span>العينة: الأبيات 1–8</span></div>
      </div>
      <aside class="poem-thesis"><span>مفتاح القراءة</span><p>${esc(poem.readingThesis)}</p></aside>
    </section>

    <section class="poem-map-wrap">
      <div class="poem-map-head"><div><span class="kicker">خريطة المقطع</span><h2>قبل شرح البيت، اعرف وظيفته</h2></div><p>${esc(poem.sampleNote)}</p></div>
      <div class="poem-map">${poem.map.map(x=>`<article><span>${esc(x.range)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div>
    </section>

    <section class="reader-layout">
      <div class="verse-list" aria-label="أبيات القصيدة">
        <div class="verse-list-head"><span>النص</span><b>اضغط أي بيت</b></div>
        ${verses.map(v=>`<button type="button" class="verse-row ${v.id===selected.id?"active":""}" data-verse="${v.id}"><span class="verse-number">${String(v.order).padStart(2,"0")}</span><span class="hemistichs"><b>${esc(v.first)}</b><b>${esc(v.second)}</b></span><i>＋</i></button>`).join("")}
      </div>
      <aside class="analysis-panel" id="analysis-panel">
        ${renderVerseAnalysis(selected)}
      </aside>
    </section>`;
}

function renderVerseAnalysis(v) {
  const tabsSimple = [
    ["meaning","المعنى"], ["vocabulary","المفردات"], ["context","وظيفة البيت"]
  ];
  const tabsDeep = [
    ["meaning","المعنى"], ["vocabulary","المفردات"], ["syntax","النحو والتركيب"], ["morphology","الصرف والاشتقاق"], ["rhetoric","البلاغة ★"], ["prosody","الوزن والقافية"], ["context","السياق"], ["sources","المصادر"]
  ];
  const tabs = state.depth === "deep" ? tabsDeep : tabsSimple;
  if (!tabs.some(([id])=>id===state.analysisTab)) state.analysisTab = "meaning";
  return `
    <div class="analysis-sticky">
      <div class="analysis-title"><span>البيت ${v.order}</span><button type="button" class="copy-link" data-copy-verse="${v.id}">نسخ رابط البيت</button></div>
      <div class="analysis-tabs">${tabs.map(([id,label])=>`<button type="button" class="analysis-tab ${state.analysisTab===id?"active":""} ${id==="rhetoric"?"rhetoric-tab":""}" data-analysis-tab="${id}">${label}</button>`).join("")}</div>
      <div class="analysis-body">${analysisContent(v, state.analysisTab)}</div>
      ${state.depth === "simple" ? `<button class="unlock-deep" type="button" data-set-depth="deep">افتح التعمق: التركيب والبلاغة والوزن والمصادر ←</button>` : ""}
    </div>`;
}

function analysisContent(v, tab) {
  if (tab === "meaning") return `<div class="analysis-prose"><span class="analysis-label">المعنى في السياق</span><p>${esc(v.meaning)}</p></div>`;
  if (tab === "vocabulary") return `<div class="vocab-list">${v.vocabulary.map(x=>`<div><b>${esc(x.term)}</b><p>${esc(x.text)}</p></div>`).join("")}</div>`;
  if (tab === "syntax") return `<div class="point-list"><span class="analysis-label">كيف يعمل النحو والتركيب؟</span>${v.syntax.map(x=>`<p>${esc(x)}</p>`).join("")}</div>`;
  if (tab === "morphology") return `<div class="point-list"><span class="analysis-label">الصرف والاشتقاق</span>${(v.morphology || []).map(x=>`<p>${esc(x)}</p>`).join("")}</div>`;
  if (tab === "rhetoric") return `<div class="rhetoric-deep"><div class="rhetoric-thesis"><span>الفكرة البلاغية المركزية</span><p>${esc(v.rhetoric.thesis)}</p></div>${v.rhetoric.devices.map((x,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><div><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p></div></article>`).join("")}<div class="connection-note"><b>صلة البيت بما بعده</b><p>${esc(v.rhetoric.connection)}</p></div></div>`;
  if (tab === "prosody") return `<div class="prosody-card"><dl><div><dt>البحر</dt><dd>${esc(v.prosody.meter)}</dd></div><div><dt>القافية</dt><dd>${esc(v.prosody.rhyme)}</dd></div></dl><p>${esc(v.prosody.note)}</p></div>`;
  if (tab === "context") return `<div class="analysis-prose"><span class="analysis-label">موضعه في حركة القصيدة</span><p>${esc(v.context)}</p>${v.variants ? `<div class="variant-box"><b>موضع رواية</b>${v.variants.map(x=>`<p><strong>${esc(x.reading)}</strong> — ${esc(x.status)}<br><small>${esc(x.note)}</small></p>`).join("")}</div>` : ""}</div>`;
  if (tab === "sources") return `<div class="mini-sources">${v.sourceIds.map(id=>{const s=SOURCES[id];return s?`<div><b>${esc(s.author)}</b><p>${esc(s.title)} — ${esc(s.page)}</p>${sourceButton(id,true)}</div>`:""}).join("")}</div>`;
  return "";
}
