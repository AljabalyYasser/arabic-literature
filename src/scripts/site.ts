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

// ---------- عمق القراءة ----------

function setDepth(depth: string) {
  root.dataset.depth = depth;
  store.set('depth', depth);
  syncDepthButtons();
  document.dispatchEvent(new CustomEvent('depthchange'));
}

function syncDepthButtons() {
  document.querySelectorAll<HTMLButtonElement>('.depth-toggle [data-set-depth]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.setDepth === root.dataset.depth));
  });
}

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-set-depth]');
  if (btn) setDepth(btn.dataset.setDepth!);
});
syncDepthButtons();

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

document.addEventListener('depthchange', () => {
  document.querySelectorAll<HTMLElement>('.verse.is-open [data-tabs]').forEach(ensureVisibleTab);
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

function syncProgress() {
  document.querySelectorAll<HTMLElement>('[data-station-id]').forEach((el) => {
    el.classList.toggle('is-done', isDone(el.dataset.stationId!));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-done-toggle]').forEach((b) => {
    const done = isDone(b.dataset.doneToggle!);
    b.setAttribute('aria-pressed', String(done));
    b.textContent = done ? 'أنهيت هذه المحطة ✓' : 'أنهيت هذه المحطة';
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-continue]').forEach((a) => {
    const ids = (a.dataset.continue || '').split(' ').filter(Boolean);
    const anyDone = ids.some(isDone);
    const next = ids.find((id) => !isDone(id));
    if (anyDone && next) {
      a.href = `/path/${next}/`;
      a.textContent = `تابع من المحطة ${next.replace('-', '.')}`;
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
