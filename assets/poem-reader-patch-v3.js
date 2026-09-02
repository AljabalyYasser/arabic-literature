"use strict";

renderPoem = function () {
  const poem = POEMS[state.poemId];
  const verses = poem.verseIds.map(id => VERSES[id]).filter(Boolean);
  const selected = VERSES[state.verseId] || verses[0];
  const firstOrder = verses.length ? verses[0].order : 0;
  const lastOrder = verses.length ? verses[verses.length - 1].order : 0;
  return `
    <section class="poem-head">
      <div class="poem-title-block">
        <span class="eyebrow">${esc(poem.meter)} · ${esc(poem.rhyme)}</span>
        <h1>${esc(poem.title)}</h1>
        <p>${esc(poem.occasion)}</p>
        <div class="status-row"><span class="verified">النسبة: ${esc(poem.attribution.grade)}</span><span>المقطع المشروح: الأبيات ${firstOrder}–${lastOrder}</span></div>
      </div>
      <aside class="poem-thesis"><span>مفتاح القراءة</span><p>${esc(poem.readingThesis)}</p></aside>
    </section>

    <section class="poem-map-wrap">
      <div class="poem-map-head"><div><span class="kicker">خريطة المقطع</span><h2>حركة المعنى بين الأبيات</h2></div><p>${esc(poem.sampleNote)}</p></div>
      <div class="poem-map">${poem.map.map(x=>`<article><span>${esc(x.range)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div>
    </section>

    <section class="reader-layout">
      <div class="verse-list" aria-label="أبيات القصيدة">
        <div class="verse-list-head"><span>النص</span><b>اختر بيتًا لشرحه</b></div>
        ${verses.map(v=>`<button type="button" class="verse-row ${v.id===selected.id?"active":""}" data-verse="${v.id}"><span class="verse-number">${String(v.order).padStart(2,"0")}</span><span class="hemistichs"><b>${esc(v.first)}</b><b>${esc(v.second)}</b></span><i>＋</i></button>`).join("")}
      </div>
      <aside class="analysis-panel" id="analysis-panel">${renderVerseAnalysis(selected)}</aside>
    </section>`;
};

render();
