"use strict";

renderMap = function () {
  const era = ERAS[state.eraId];
  const eras = [
    ["الجاهلي", "قبل الإسلام"], ["صدر الإسلام", "1–40هـ"], ["الأموي", "41–132هـ"], ["العباسي", "132–656هـ"],
    ["الأندلسي", "92–897هـ"], ["الدول والإمارات", "متداخل زمنيًا"], ["النهضة", "القرن 19م"], ["الحديث والمعاصر", "القرنان 20–21م"]
  ];
  return `
    <section class="hero-panel">
      <div class="hero-copy-block">
        <span class="eyebrow">تاريخ الأدب العربي</span>
        <h1>صورة الأدب<br><em>عبر عصوره</em></h1>
        <p>تبدأ القراءة من التحولات الكبرى التي صنعت الأدب: الزمن، والبيئة، ومراكز الثقافة، وتطور الشعر والنثر، ثم تنتقل إلى الأعلام والنصوص. أما التعمق فيفتح داخل الموضوع نفسه طبقات اللغة والبلاغة والنقد والمصادر.</p>
        <div class="hero-actions">
          <button class="primary-action" type="button" data-view="era">العصر العباسي</button>
          <button class="text-action" type="button" data-view="poem">قصيدة «على قدر أهل العزم» ←</button>
        </div>
      </div>
      <div class="depth-explainer">
        <div><span>01</span><b>الخلاصة</b><p>الزمن، والتحولات الأدبية، وأبرز الأعلام والنصوص التي ترسم صورة الموضوع.</p></div>
        <div><span>02</span><b>التعمق</b><p>السياق الأدق، وخصائص الأسلوب، واللغة، والبلاغة، والنقد، ومواضع الخلاف والمصادر.</p></div>
      </div>
    </section>

    ${sectionHead("الخريطة الزمنية", "العصور والمحطات الكبرى", "تُقرأ المراحل بوصفها سياقات متصلة؛ وقد تتداخل بعض البيئات والتيارات زمنيًا ولا تنحصر دائمًا في حدود سياسية صارمة.")}
    <div class="era-timeline">
      ${eras.map(([name,date], i) => `<button type="button" class="era-node ${name === "العباسي" ? "current" : "disabled"}" ${name === "العباسي" ? 'data-view="era"' : 'aria-disabled="true"'}><span>${String(i+1).padStart(2,"0")}</span><b>${name}</b><small>${date}</small></button>`).join("")}
    </div>

    <section class="map-principle">
      <div><span class="kicker">منهج القراءة</span><h2>العصر سياق ممتد من الأعلام والنصوص والتحولات</h2></div>
      <p>${esc(era.framing)}</p>
    </section>`;
};

renderEra = function () {
  const era = ERAS[state.eraId];
  return `
    <section class="entity-hero era-hero">
      <div>
        <span class="eyebrow">${esc(era.periodHijri)} · ${esc(era.periodGregorian)}</span>
        <h1>${esc(era.name)}</h1>
        <p>${esc(era.framing)}</p>
      </div>
      <div class="entity-stat"><b>موضع القراءة</b><strong>القرن الرابع</strong><small>حلب الحمدانية</small></div>
    </section>

    ${sectionHead("الخلاصة", "أربع ملامح مركزية", "تضع هذه الملامح الإطار الذي تُقرأ داخله النصوص والأعلام قبل الانتقال إلى التفاصيل.")}
    <div class="quick-grid">
      ${era.quickSummary.map((x,i)=>`<article class="quick-card"><span>${String(i+1).padStart(2,"0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
    </div>

    <section class="focus-window">
      <div><span class="kicker">القرن الرابع الهجري</span><h2>${esc(era.focusWindow.title)}</h2><p>${esc(era.focusWindow.text)}</p></div>
      <strong>${esc(era.focusWindow.range)}</strong>
    </section>

    <div class="deep-only">
      ${sectionHead("الحياة الأدبية", "مكوّنات المشهد العباسي", "يتكوّن المشهد من تفاعل الشعر والنثر وعلوم العربية والنقد مع السياسة والبلاط والحرب ومراكز الثقافة.")}
      <div class="axis-grid">
        ${era.literaryAxes.map(x=>`<article><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
      </div>

      <section class="names-section">
        <div><span class="kicker">أعلام مختارون</span><h2>أسماء ترسم اتساع العصر</h2><p>تمثل هذه الأسماء مراحل واتجاهات وبيئات متباينة داخل العصر العباسي، وتوضح أن المتنبي يُقرأ داخل شبكة أدبية أوسع منه.</p></div>
        <div class="name-cloud">${era.keyNames.map(name=>`<span class="${name === "المتنبي" ? "active" : ""}">${esc(name)}</span>`).join("")}</div>
      </section>
    </div>

    <section class="checkpoint">
      <span class="kicker">خلاصة العصر</span>
      <h2>أربع نتائج مركزية</h2>
      <ol>${era.whatYouKnow.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <button type="button" class="primary-action" data-view="poet">أبو الطيب المتنبي</button>
    </section>

    <div class="deep-only source-inline">${era.sourceIds.map(id=>sourceButton(id,true)).join("")}</div>`;
};

renderPoet = function () {
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
      <span class="kicker">الموقع التاريخي والأدبي</span>
      <h2>المتنبي في القرن الرابع الهجري</h2>
      <p>${esc(poet.relationshipToEra)}</p>
    </section>

    ${sectionHead("مفاتيح القراءة", "خصائص تتكرر في شعر المتنبي", "تساعد هذه المفاتيح على قراءة بناء القصيدة والبيت، لا على اختزال الشاعر في صفات عامة منفصلة عن نصوصه.")}
    <div class="reading-key-grid">
      ${poet.readingKeys.map((x,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}
    </div>

    <div class="deep-only">
      ${sectionHead("السيرة والسياق", "محطات ذات صلة بالشعر", "تُختار من السيرة المحطات التي تساعد على فهم البيئات والعلاقات والوقائع التي دخلت في شعره.")}
      <div class="timeline-list">${poet.timeline.map(x=>`<div><time>${esc(x.year)}</time><p>${esc(x.text)}</p></div>`).join("")}</div>
      <div class="source-inline">${poet.sourceIds.map(id=>sourceButton(id,true)).join("")}</div>
    </div>

    <section class="next-work">
      <div><span class="kicker">قصيدة الحدث</span><h2>من الحكمة إلى مشهد الحرب</h2><p>تبدأ القصيدة بحكمتين تؤسسان معيار العظمة، ثم تُسقطان على سيف الدولة، قبل أن تنتقل إلى صور الحرب وآثارها. قراءة الأبيات في تسلسلها تكشف بناءً يتجاوز استقلال البيت المفرد.</p></div>
      <button type="button" class="primary-action" data-view="poem">على قدر أهل العزم</button>
    </section>`;
};

renderPoem = function () {
  const poem = POEMS[state.poemId];
  const verses = poem.verseIds.map(id => VERSES[id]).filter(Boolean);
  const selected = VERSES[state.verseId] || verses[0];
  return `
    <section class="poem-head">
      <div class="poem-title-block">
        <span class="eyebrow">${esc(poem.meter)} · ${esc(poem.rhyme)}</span>
        <h1>${esc(poem.title)}</h1>
        <p>${esc(poem.occasion)}</p>
        <div class="status-row"><span class="verified">النسبة: ${esc(poem.attribution.grade)}</span><span>المقطع المعروض: الأبيات 1–8</span></div>
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

renderGuide = function () {
  const terms = Object.values(TERMS);
  return `
    ${sectionHead("الدليل", "بحث في الكيانات والمصطلحات", "يجمع الدليل العصور والأعلام والقصائد والأبيات والمصطلحات في نقطة بحث واحدة، مع إبقاء الصلات بينها ظاهرة أثناء الانتقال.")}
    <button class="guide-search-box" type="button" id="guide-open-search"><span>⌕</span><b>ابحث في العصر والشاعر والقصيدة والأبيات والمصطلحات</b><small>مثال: الخضارم، الحدث، الاشتقاق، المتنبي</small></button>
    <div class="guide-groups">
      <article><span>العصر</span><button type="button" data-view="era">العصر العباسي <small>132–656هـ</small></button></article>
      <article><span>الشاعر</span><button type="button" data-view="poet">أبو الطيب المتنبي <small>303–354هـ</small></button></article>
      <article><span>القصيدة</span><button type="button" data-view="poem">على قدر أهل العزم <small>سنة 343هـ</small></button></article>
      <article><span>مصطلحات</span><div class="term-stack">${terms.map(t=>`<details><summary>${esc(t.name)}</summary><p>${esc(t.definition)}</p></details>`).join("")}</div></article>
    </div>`;
};

renderSources = function () {
  return `
    ${sectionHead("التوثيق", "المصادر المستخدمة", "لا يُدرج المصدر لمجرد الاستزادة؛ بل لأن موضعًا محددًا من النص أو السيرة أو التحليل استند إليه، وتوضح بطاقة المصدر وظيفة استعماله.")}
    <div class="sources-grid">${Object.keys(SOURCES).map(sourceCard).join("")}</div>`;
};

renderMethod = function () {
  return `
    ${sectionHead("منهج التحقيق", "من النص الموروث إلى الشرح", "توضح هذه الخطوات كيف تُثبت الرواية والمناسبة والدلالة اللغوية قبل الانتقال إلى التحليل البلاغي والنقدي.")}
    <div class="method-steps">
      <article><span>01</span><h3>تثبيت النص</h3><p>يُقابل النص بديوان أو شرح موثوق، وتُسجل مواضع اختلاف الرواية بدل دمجها في نص واحد بلا تنبيه.</p></article>
      <article><span>02</span><h3>تثبيت المناسبة</h3><p>تُفرق الرواية التاريخية الثابتة عن الصياغة التفسيرية المتأخرة. وفي هذه القصيدة يثبت الواحدي صلتها ببناء ثغر الحدث سنة 343هـ.</p></article>
      <article><span>03</span><h3>الشرح اللغوي</h3><p>يبدأ من اللفظ والتركيب: معنى «الخضارم»، ودلالة «القوائم»، وتوجيه «أتم» مثلًا؛ لأن الخطأ اللغوي يفسد ما يُبنى عليه من بلاغة.</p></article>
      <article><span>04</span><h3>التحليل البلاغي</h3><p>لا يكفي تسمية التشبيه أو الطباق. يُبحث أثر الترتيب والاختيار والصورة والإيقاع وعلاقة البيت بما قبله وما بعده.</p></article>
      <article><span>05</span><h3>فصل النقل عن القراءة</h3><p>يُنسب كلام الشراح إلى قائليه، وتُفصل عنه القراءة التحليلية التي تستنبط وظيفة التركيب والصورة داخل القصيدة.</p></article>
      <article><span>06</span><h3>إظهار المصدر</h3><p>ترتبط الإحالة بالادعاء والبيت الذي تسنده، حتى يستطيع القارئ الانتقال من الشرح إلى أصله مباشرة.</p></article>
    </div>`;
};

render();
