const root = document.documentElement;

const store = {
  get(key: string) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string | null) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch { /* التخزين غير متاح: تعمل الصفحة بلا حفظ */ }
  },
};

// ---------- القائمة ----------

document.addEventListener('click', (e) => {
  const menu = document.querySelector<HTMLDetailsElement>('.menu[open]');
  if (menu && !menu.contains(e.target as Node)) menu.open = false;
});

// ---------- الألسنة ----------

function isHidden(el: HTMLElement) {
  return el.offsetParent === null;
}

function selectTab(group: HTMLElement, id: string) {
  group.querySelectorAll<HTMLButtonElement>('[role="tab"]').forEach((t) => {
    const on = t.dataset.tab === id;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
  });
  group.querySelectorAll<HTMLElement>('[data-panel]').forEach((p) => {
    if (p.dataset.panel === id) p.removeAttribute('data-inactive');
    else p.setAttribute('data-inactive', '');
  });
}

function ensureVisibleTab(group: HTMLElement) {
  const active = group.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]');
  if (active && !isHidden(active)) return;
  const first = [...group.querySelectorAll<HTMLButtonElement>('[role="tab"]')].find((t) => !isHidden(t));
  if (first) selectTab(group, first.dataset.tab!);
}

document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
  const first = group.querySelector<HTMLButtonElement>('[role="tab"]');
  if (first) selectTab(group, first.dataset.tab!);
  const list = group.querySelector<HTMLElement>('[role="tablist"]');
  list?.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (t) selectTab(group, t.dataset.tab!);
  });
  // الأسهم تنقل بين الألسنة الظاهرة؛ في الاتجاه من اليمين إلى اليسار يكون السهم الأيسر هو التالي.
  list?.addEventListener('keydown', (e) => {
    const step = { ArrowLeft: 1, ArrowRight: -1, Home: -Infinity, End: Infinity }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const visible = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')].filter((t) => !isHidden(t));
    const current = visible.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const next = Number.isFinite(step)
      ? visible[(current + step + visible.length) % visible.length]
      : visible[step > 0 ? visible.length - 1 : 0];
    if (!next) return;
    selectTab(group, next.dataset.tab!);
    next.focus();
  });
});

// ---------- قارئ الأبيات ----------

function openVerse(verse: HTMLElement, { scroll = false } = {}) {
  const reader = verse.closest('.reader');
  // إغلاق بيت مفتوح فوق هذا البيت يُقصر الصفحة فوقه، فيقفز البيت عن موضعه تحت الإصبع.
  // نقيس موضعه قبل الإغلاق وبعده، ونعيده إلى مكانه.
  const head = verse.querySelector<HTMLElement>('.verse-head');
  const before = head?.getBoundingClientRect().top ?? 0;
  reader?.querySelectorAll<HTMLElement>('.verse.is-open').forEach((v) => {
    if (v !== verse) closeVerse(v);
  });
  if (!scroll && head) window.scrollBy(0, head.getBoundingClientRect().top - before);
  verse.classList.add('is-open');
  verse.querySelector('.verse-body')?.removeAttribute('hidden');
  verse.querySelector('.verse-head')?.setAttribute('aria-expanded', 'true');
  const tabs = verse.querySelector<HTMLElement>('[data-tabs]');
  if (tabs) ensureVisibleTab(tabs);
  history.replaceState(null, '', `#${verse.id}`);
  if (scroll) verse.scrollIntoView({ block: 'start' });
}

function closeVerse(verse: HTMLElement) {
  verse.classList.remove('is-open');
  verse.querySelector('.verse-body')?.setAttribute('hidden', '');
  verse.querySelector('.verse-head')?.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll<HTMLElement>('.reader .verse').forEach((verse) => {
  const head = verse.querySelector<HTMLAnchorElement>('.verse-head');
  head?.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (verse.classList.contains('is-open')) {
      closeVerse(verse);
      history.replaceState(null, '', location.pathname);
    } else {
      openVerse(verse);
    }
  });
});

function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const verse = document.getElementById(id);
  if (verse?.classList.contains('verse')) openVerse(verse, { scroll: true });
}
openFromHash();
window.addEventListener('hashchange', openFromHash);

// ---------- نسخ الرابط ----------

document.addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy]');
  if (!btn) return;
  const link = new URL(btn.dataset.copy!, location.origin).href;
  const label = btn.textContent;
  try {
    await navigator.clipboard.writeText(link);
    btn.textContent = 'نُسخ الرابط';
  } catch {
    location.href = link;
    return;
  }
  setTimeout(() => { btn.textContent = label; }, 1500);
});

// ---------- التقدم في المسار ----------

const doneKey = (id: string) => `done:${id}`;
const isDone = (id: string) => store.get(doneKey(id)) === '1';

// صارت المحطات فصولًا في بنية العصور والأعلام (2026-09-29)، فيُنقل ما أنهاه القارئ إلى معرّفاتها الجديدة.
const MOVED: Record<string, string> = {
  '0-1': '0/kayfa-taqra', '0-2': '0/kharitat-al-rihla',
  '1-1': '1/al-sahra', '1-2': '1/ayyam-al-arab', '1-3': '1/al-muallaqat',
  '1-4': 'imru-al-qais/hayatuhu', '1-5': 'imru-al-qais/al-muallaqa-1', '1-6': 'imru-al-qais/al-muallaqa-2',
  '1-7': 'tarafa/hayatuhu', '1-8': 'tarafa/al-muallaqa-1', '1-9': 'tarafa/al-muallaqa-2',
};
for (const [from, to] of Object.entries(MOVED)) {
  if (!isDone(from)) continue;
  store.set(doneKey(to), '1');
  store.set(doneKey(from), null);
}

function syncProgress() {
  document.querySelectorAll<HTMLElement>('[data-station-id]').forEach((el) => {
    el.classList.toggle('is-done', isDone(el.dataset.stationId!));
  });
  // مسار علم ينتهي بانتهاء مراحله كلها.
  document.querySelectorAll<HTMLElement>('[data-done-all]').forEach((el) => {
    const ids = (el.dataset.doneAll || '').split(' ').filter(Boolean);
    el.classList.toggle('is-done', ids.length > 0 && ids.every(isDone));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-done-toggle]').forEach((b) => {
    const done = isDone(b.dataset.doneToggle!);
    b.setAttribute('aria-pressed', String(done));
    b.textContent = done ? `${b.dataset.label} ✓` : b.dataset.label!;
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-continue]').forEach((a) => {
    let order: { id: string; href: string; title: string }[] = [];
    try { order = JSON.parse(a.dataset.continue || '[]'); } catch { return; }
    const next = order.find((c) => !isDone(c.id));
    if (order.some((c) => isDone(c.id)) && next) {
      a.href = next.href;
      a.textContent = `تابع من: ${next.title}`;
    }
  });
}

document.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-done-toggle]');
  if (!b) return;
  const id = b.dataset.doneToggle!;
  store.set(doneKey(id), isDone(id) ? null : '1');
  syncProgress();
});
syncProgress();

// ---------- المحفوظات ----------

const hifzKey = (id: string) => `hifz:${id}`;
const isKnown = (id: string) => store.get(hifzKey(id)) === '1';

function syncHifz() {
  document.querySelectorAll<HTMLButtonElement>('[data-hifz]').forEach((b) => {
    const known = isKnown(b.dataset.hifz!);
    b.setAttribute('aria-pressed', String(known));
    b.textContent = known ? `${b.dataset.label} ✓` : b.dataset.label!;
    b.closest('.mahfuz')?.classList.toggle('is-known', known);
  });
  const count = document.querySelector('[data-hifz-count]');
  if (count) {
    const ids = [...document.querySelectorAll<HTMLElement>('.mahfuz[data-mahfuz]')].map((el) => el.dataset.mahfuz!);
    count.textContent = String(ids.filter(isKnown).length);
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  const b = target.closest<HTMLButtonElement>('[data-hifz]');
  if (b) {
    const id = b.dataset.hifz!;
    store.set(hifzKey(id), isKnown(id) ? null : '1');
    syncHifz();
    return;
  }

  // الاختبار: يُخفى عجز البيت ونص المثل حتى يضغطه القارئ.
  const test = target.closest<HTMLButtonElement>('[data-test-toggle]');
  if (test) {
    const on = !root.classList.contains('test-mode');
    root.classList.toggle('test-mode', on);
    test.setAttribute('aria-pressed', String(on));
    document.querySelectorAll('.revealed').forEach((el) => el.classList.remove('revealed'));
    document.querySelector<HTMLElement>('[data-test-hint]')?.toggleAttribute('hidden', !on);
    return;
  }
  const hidden = target.closest<HTMLElement>('.test-mode .mahfuz .bayt:not(.single) > span:last-child, .test-mode .mahfuz .hideable');
  if (hidden) {
    hidden.classList.toggle('revealed');
    return;
  }

  const f = target.closest<HTMLButtonElement>('[data-filter]');
  if (f) {
    const kind = f.dataset.filter!;
    document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
    document.querySelectorAll<HTMLElement>('.mahfuz[data-kind]').forEach((el) => {
      el.hidden = kind !== 'all' && el.dataset.kind !== kind;
    });
    document.querySelectorAll<HTMLElement>('[data-part-group]').forEach((g) => {
      g.hidden = !g.querySelector('.mahfuz:not([hidden])');
    });
  }
});

syncHifz();
