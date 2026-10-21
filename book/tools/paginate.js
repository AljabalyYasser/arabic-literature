// تقسيم المتن على صفحات ثابتة القياس، مع حواشٍ في أسفل كل صفحة يبدأ ترقيمها من جديد.
(function () {
  const AR = (x) => String(x).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  const KEEP = new Set(['H1', 'H2', 'H3']);
  const keepWithNext = (el) => KEEP.has(el.tagName) || ['subtitle', 'bridge', 'chapsep'].some((c) => el.classList.contains(c));
  const splittable = (el) => el.tagName === 'P' || el.classList.contains('meaning');
  const book = document.getElementById('book');
  const src = document.getElementById('src');
  let page = null, body = null, notes = null, area = null, fn = 0, folio = 0, cur = { poet: '', era: '' }, tocAfter = null;

  function newPage(kind) {
    folio += 1;
    page = document.createElement('div');
    page.className = 'page' + (kind ? ' ' + kind : '');
    page.innerHTML = '<img class="deco" src="paper.jpg"><img class="deco" src="frame.svg">' +
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
    const toks = tokens(el), lh = parseFloat(getComputedStyle(el).lineHeight) || 20, cont = el.classList.contains('cont');
    // أطول جزء يتسع في الصفحة ولا يزيد ارتفاعه على cap، مقطوعًا عند مسافة لا في وسط كلمة
    const search = (cap) => {
      let lo = 1, hi = toks.length - 1, best = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const f = fragment(el, toks.slice(0, mid), cont);
        body.appendChild(f); const a = attachNotes(f); const ok = fits() && f.offsetHeight <= cap; detach(f, a);
        if (ok) { best = mid; lo = mid + 1; } else hi = mid - 1;
      }
      while (best > 0 && !/^\s+$/.test(toks[best - 1]) && best < toks.length && !/^\s+$/.test(toks[best])) best -= 1;
      return best;
    };
    const height = (t) => { const f = fragment(el, t, true); f.querySelectorAll('span.footnote').forEach((x) => x.remove()); body.appendChild(f); const h = f.offsetHeight; f.remove(); return h; };
    let best = search(Infinity);
    if (best <= 0) return el;
    // سطر وحيد في أول الصفحة التالية: ننقل معه سطرًا من هذه الصفحة
    const tail = toks.slice(best); while (tail.length && /^\s+$/.test(tail[0])) tail.shift();
    if (tail.length && height(tail) < lh * 1.9) {
      const fewer = search(height(toks.slice(0, best)) - lh * 0.5);
      if (fewer > 0) best = fewer;
    }
    const head = fragment(el, toks.slice(0, best), cont);
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
    const per = Math.min(left / (kids.length - 1), 10);
    kids.slice(0, -1).forEach((k) => { k.style.marginBottom = (parseFloat(getComputedStyle(k).marginBottom) + per) + 'px'; });
  }

  function place(el) {
    if (el.tagName === 'H1') cur = { poet: el.dataset.poet, era: el.dataset.era };
    if (el.classList.contains('titlepage')) { newPage('title'); body.appendChild(el); return; }
    if (el.classList.contains('tocmark')) { tocAfter = page; return; }
    if (!page) newPage();
    // الفصل يتصل بما قبله بعد فاصل مزخرف، فإن لم يتسع الفاصل بدأ الفصل صفحة جديدة
    if (el.tagName === 'H1' && body.children.length) {
      const sep = document.createElement('div'); sep.className = 'chapsep'; body.appendChild(sep);
      if (!fits()) { sep.remove(); justifyPage(); newPage(); }
    }
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
    // وحدة المعنى: أبياتها المتتالية (أربعة على الأكثر) تنتقل مع بيتها الأخير أو مع أول شرحها،
    // ما لم يترك نقلها فراغًا في أسفل الصفحة أكبر مما يُوزَّع بين الكتل
    if (el.classList.contains('bayt') || el.classList.contains('meaning')) {
      while (carry.length < 4 && body.lastElementChild && body.lastElementChild.classList.contains('bayt') && body.children.length > 1) {
        const k = body.lastElementChild; detach(k, k.querySelectorAll('sup.fn').length); carry.unshift(k);
      }
      const left = area.clientHeight - body.offsetHeight - (notes.children.length ? notes.parentElement.offsetHeight : 0);
      if (left > 110) { carry.forEach((k) => { body.appendChild(k); attachNotes(k); }); carry.length = 0; }
    }
    while (body.lastElementChild && keepWithNext(body.lastElementChild) && body.children.length > 1) {
      const k = body.lastElementChild; const n = k.querySelectorAll('sup.fn').length; detach(k, n); carry.unshift(k);
    }
    justifyPage(); newPage();
    carry.forEach((k) => { if (k.classList.contains('chapsep')) return; body.appendChild(k); attachNotes(k); });
    body.appendChild(el); attachNotes(el);
  }

  // المحتويات: صفحات بعد صفحة العنوان، فيها الأقسام وفصولها بأرقام صفحاتها، ثم يُعاد ترقيم الصفحات كلها
  function contents() {
    const parts = [];
    book.querySelectorAll('h1.chapter').forEach((h) => {
      const part = (h.dataset.era.split('·')[1] || h.dataset.era).trim();
      if (!parts.length || parts[parts.length - 1].title !== part) parts.push({ title: part, items: [] });
      parts[parts.length - 1].items.push({ h, title: h.dataset.poet });
    });
    const saved = cur; cur = { poet: 'المحتويات', era: saved.era.split('·')[0].trim() };
    const before = book.children.length;
    newPage();
    const head = document.createElement('h1'); head.className = 'chapter';
    head.innerHTML = '<span>المحتويات</span>'; body.appendChild(head);
    const rows = [];
    parts.forEach((p) => {
      // قسم من فصل واحد يحمل اسمه (كالمقدمة وثبت المصادر) يُذكر سطرًا واحدًا بلا عنوان قسم
      if (!(p.items.length === 1 && p.items[0].title === p.title)) {
        const t = document.createElement('div'); t.className = 'toc-part'; t.textContent = p.title;
        body.appendChild(t);
        if (!fits()) { t.remove(); newPage(); body.appendChild(t); }
      }
      p.items.forEach((it) => {
        const r = document.createElement('div'); r.className = 'toc-row';
        r.innerHTML = '<span class="t"></span><span class="dots"></span><span class="n"></span>';
        r.querySelector('.t').textContent = it.title;
        body.appendChild(r);
        if (!fits()) { r.remove(); newPage(); body.appendChild(r); }
        rows.push({ r, h: it.h });
      });
    });
    cur = saved;
    // ننقل صفحات المحتويات إلى ما بعد صفحة العنوان، ثم نرقّم الصفحات من جديد
    const added = [...book.children].slice(before);
    let ref = tocAfter.nextSibling;
    added.forEach((p) => book.insertBefore(p, ref));
    [...book.children].forEach((p, i) => { const f = p.querySelector('.folio'); if (f) f.textContent = AR(i + 1); });
    rows.forEach(({ r, h }) => { r.querySelector('.n').textContent = h.closest('.page').querySelector('.folio').textContent; });
  }

  // يصغّر البيت الذي لا يتسع شطره لعموده
  function fitVerses() {
    src.querySelectorAll('.bayt').forEach((b) => {
      let size = parseFloat(getComputedStyle(b).fontSize); const min = size * 0.85;
      const over = () => [...b.querySelectorAll('.h')].some((h) => h.scrollWidth > h.clientWidth + 1);
      while (over() && size > min) { size -= 0.5; b.style.fontSize = size + 'px'; }
    });
  }
  // الأوزان القصيرة: تضيق أعمدة الأبيات المتتالية على أطول شطر فيها، فلا تتسع الفراغات بين الكلمات
  function fitColumns() {
    const runs = []; let run = [];
    [...src.children].forEach((el) => {
      if (el.classList.contains('bayt')) run.push(el); else if (run.length) { runs.push(run); run = []; }
    });
    if (run.length) runs.push(run);
    runs.forEach((r) => {
      const col = r[0].querySelector('.h').clientWidth;
      let w = 0;
      r.forEach((b) => b.querySelectorAll('.h').forEach((h) => {
        const p = document.createElement('span');
        p.className = 'h'; p.style.cssText = 'position:absolute;display:inline;white-space:nowrap;visibility:hidden';
        p.innerHTML = h.innerHTML; p.querySelectorAll('.footnote').forEach((x) => x.remove());
        b.appendChild(p); w = Math.max(w, p.offsetWidth); p.remove();
      }));
      if (w < col * 0.8) {
        const c = Math.ceil(w * 1.08 + 4) + 'px';
        r.forEach((b) => { b.style.gridTemplateColumns = `6mm ${c} 6mm ${c}`; });
      }
    });
  }
  document.fonts.ready.then(() => {
    fitVerses();
    fitColumns();
    [...src.children].forEach((el) => place(el));
    if (tocAfter) contents();
    src.remove();
    window.__pages = book.children.length;
  });
})();
