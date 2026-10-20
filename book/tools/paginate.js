// تقسيم المتن على صفحات ثابتة القياس، مع حواشٍ في أسفل كل صفحة يبدأ ترقيمها من جديد.
(function () {
  const AR = (x) => String(x).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  const KEEP = new Set(['H1', 'H2', 'H3']);
  const keepWithNext = (el) => KEEP.has(el.tagName) || el.classList.contains('subtitle') || el.classList.contains('bridge');
  const splittable = (el) => el.tagName === 'P' || el.classList.contains('meaning');
  const book = document.getElementById('book');
  const src = document.getElementById('src');
  let page = null, body = null, notes = null, area = null, fn = 0, folio = 0, cur = { poet: '', era: '' };

  function newPage(kind) {
    folio += 1;
    page = document.createElement('div');
    page.className = 'page' + (kind ? ' ' + kind : '');
    page.innerHTML = '<div class="deco grain"></div><img class="deco" src="frame.svg">' +
      '<div class="area"><div class="body"></div><div class="notes"><div class="bar"></div><ol></ol></div></div>';
    book.appendChild(page);
    area = page.querySelector('.area'); body = page.querySelector('.body'); notes = page.querySelector('.notes ol');
    fn = 0;
    if (kind !== 'title') {
      const h = (cls, t) => { const d = document.createElement('div'); d.className = cls; d.textContent = t; page.appendChild(d); };
      h('head era', cur.era); h('head poet', cur.poet); h('folio', AR(folio));
    }
  }
  const fits = () => body.offsetHeight + (notes.children.length ? notes.parentElement.offsetHeight : 0) <= area.clientHeight + 0.5;

  // ينقل حواشي الكتلة إلى أسفل الصفحة ويضع أرقامها في المتن؛ ويعيد عدد ما أضاف
  function attachNotes(el) {
    let added = 0;
    el.querySelectorAll('span.footnote').forEach((s) => {
      fn += 1; added += 1;
      const li = document.createElement('li');
      li.innerHTML = '<span class="m">(' + AR(fn) + ')</span> ' + s.innerHTML;
      notes.appendChild(li);
      const call = document.createElement('sup'); call.className = 'fn'; call.textContent = '(' + AR(fn) + ')';
      call.dataset.note = s.innerHTML;
      s.replaceWith(call);
    });
    return added;
  }
  // يعيد الكتلة إلى حالها قبل الإلحاق
  function detach(el, added) {
    for (let i = 0; i < added; i++) notes.removeChild(notes.lastElementChild);
    fn -= added;
    el.querySelectorAll('sup.fn').forEach((c) => { const s = document.createElement('span'); s.className = 'footnote'; s.innerHTML = c.dataset.note; c.replaceWith(s); });
    el.remove();
  }
  function tokens(el) {
    const t = [];
    el.childNodes.forEach((n) => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach((w) => { if (w) t.push(w); });
      else t.push(n.outerHTML);
    });
    return t;
  }
  function fragment(proto, toks, cont) {
    const el = proto.cloneNode(false);
    el.innerHTML = toks.join('');
    if (cont) el.classList.add('cont');
    return el;
  }
  // يحاول وضع جزء من كتلة قابلة للقسمة؛ ويعيد الباقي أو null
  function splitInto(el) {
    const toks = tokens(el), lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
    let lo = 1, hi = toks.length - 1, best = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const f = fragment(el, toks.slice(0, mid), el.classList.contains('cont'));
      body.appendChild(f); const a = attachNotes(f); const ok = fits(); detach(f, a);
      if (ok) { best = mid; lo = mid + 1; } else hi = mid - 1;
    }
    // نقطع عند مسافة لا في وسط كلمة
    while (best > 0 && !/^\s+$/.test(toks[best - 1]) && best < toks.length && !/^\s+$/.test(toks[best])) best -= 1;
    if (best <= 0) return el;
    const head = fragment(el, toks.slice(0, best), el.classList.contains('cont'));
    head.classList.add('split');
    body.appendChild(head); attachNotes(head);
    if (head.offsetHeight < lh * 1.9) { detach(head, 0); return el; } // سطر يتيم: ننقل الكتلة كلها
    // نمدّ السطر الأخير من الجزء المقطوع إذا كان قريبًا من التمام
    const r = document.createRange(); r.selectNodeContents(head);
    const rects = [...r.getClientRects()]; const top = Math.max(...rects.map((x) => x.top));
    const last = rects.filter((x) => Math.abs(x.top - top) < 3);
    const lastW = Math.max(...last.map((x) => x.right)) - Math.min(...last.map((x) => x.left));
    if (lastW > head.clientWidth * 0.8) head.classList.add('full');
    const rest = toks.slice(best); while (rest.length && /^\s+$/.test(rest[0])) rest.shift();
    return rest.length ? fragment(el, rest, true) : null;
  }
  // يوزّع الفراغ الباقي على ما بين الكتل حتى يمتلئ أسفل الصفحة
  function justifyPage() {
    const kids = [...body.children]; if (kids.length < 2) return;
    const left = area.clientHeight - body.offsetHeight - (notes.children.length ? notes.parentElement.offsetHeight : 0);
    if (left <= 0 || left > 110) return;
    const per = left / (kids.length - 1);
    kids.slice(0, -1).forEach((k) => { k.style.marginBottom = (parseFloat(getComputedStyle(k).marginBottom) + per) + 'px'; });
  }

  function place(el) {
    if (el.tagName === 'H1') cur = { poet: el.dataset.poet, era: el.dataset.era };
    if (el.classList.contains('titlepage')) { newPage('title'); body.appendChild(el); return; }
    if (!page) newPage();
    if (el.tagName === 'H1' && body.children.length) { justifyPage(); newPage(); }
    body.appendChild(el);
    const a = attachNotes(el);
    if (fits()) return;
    detach(el, a);
    if (splittable(el)) {
      const rest = splitInto(el);
      if (rest === null) return;
      if (rest !== el) { justifyPage(); newPage(); place(rest); return; }
    }
    // ننقل معها ما يجب أن يلزمها من عنوان أو سطر وصل
    const carry = [];
    while (body.lastElementChild && keepWithNext(body.lastElementChild) && body.children.length > 1) {
      const k = body.lastElementChild; const n = k.querySelectorAll('sup.fn').length; detach(k, n); carry.unshift(k);
    }
    justifyPage(); newPage();
    carry.forEach((k) => { body.appendChild(k); attachNotes(k); });
    body.appendChild(el); attachNotes(el);
  }

  // يصغّر البيت الذي لا يتسع شطره لعموده
  function fitVerses() {
    src.querySelectorAll('.bayt').forEach((b) => {
      let size = parseFloat(getComputedStyle(b).fontSize); const min = size * 0.85;
      const over = () => [...b.querySelectorAll('.h')].some((h) => h.scrollWidth > h.clientWidth + 1);
      while (over() && size > min) { size -= 0.5; b.style.fontSize = size + 'px'; }
    });
  }
  document.fonts.ready.then(() => {
    fitVerses();
    [...src.children].forEach((el) => place(el));
    src.remove();
    window.__pages = book.children.length;
  });
})();
