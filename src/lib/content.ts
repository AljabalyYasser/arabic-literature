import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';

type Ref<C extends CollectionKey> = { collection: C; id: string };

// يحلّ مرجعًا إلى كيان آخر، ويُفشل البناء إذا كان المرجع غير موجود.
export async function must<C extends CollectionKey>(ref: Ref<C>): Promise<CollectionEntry<C>> {
  const entry = await getEntry(ref as never);
  if (!entry) throw new Error(`مرجع غير موجود: ${ref.collection}/${ref.id}`);
  return entry as CollectionEntry<C>;
}

export async function mustAll<C extends CollectionKey>(refs: Ref<C>[]): Promise<CollectionEntry<C>[]> {
  return Promise.all(refs.map((r) => must(r)));
}

// ---------- الروابط ----------

export const url = {
  station: (id: string) => `/path/${id}/`,
  part: (id: string) => `/path/${id}/`,
  person: (id: string) => `/people/${id}/`,
  text: (id: string) => `/texts/${id}/`,
  verse: (id: string) => `/texts/${verseTextId(id)}/${verseOrder(id)}/`,
  story: (id: string) => `/stories/${id}/`,
  concept: (id: string) => `/concepts/${id}/`,
  source: (id: string) => `/sources/#${id}`,
};

// ---------- الأبيات ----------

// معرّف البيت: <معرّف النص>/<رقم البيت>، مثل qifa-nabki/007
export const verseTextId = (id: string) => id.split('/')[0];
export const verseOrder = (id: string) => Number(id.split('/')[1]);

export async function versesOf(textId: string) {
  const all = await getCollection('verses', (v) => verseTextId(v.id) === textId);
  return all.sort((a, b) => verseOrder(a.id) - verseOrder(b.id));
}

export async function allTexts() {
  return getCollection('texts');
}

// يتحقق من أن كل بيت ينتمي إلى نص موجود.
export async function checkVerseParents() {
  const texts = new Set((await allTexts()).map((t) => t.id));
  for (const v of await getCollection('verses')) {
    if (!texts.has(verseTextId(v.id))) throw new Error(`بيت بلا نص: ${v.id}`);
    if (!Number.isInteger(verseOrder(v.id))) throw new Error(`رقم بيت غير صالح: ${v.id}`);
  }
}

// ---------- المسار ----------

const numKey = (n: string) => n.split('.').map(Number);
export const compareNumbers = (a: string, b: string) => {
  const [x, y] = [numKey(a), numKey(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d;
  }
  return 0;
};

export type PathStation = { number: string; title: string; entry?: CollectionEntry<'stations'> };
export type PathPart = { entry: CollectionEntry<'parts'>; stations: PathStation[]; hasPage: boolean };

// يدمج خطة كل باب مع المحطات المكتوبة فعلًا.
export async function getPath(): Promise<PathPart[]> {
  const parts = (await getCollection('parts')).sort((a, b) => a.data.number - b.data.number);
  const stations = await getCollection('stations');
  for (const s of stations) {
    if (s.id !== s.data.number.replace('.', '-')) throw new Error(`اسم ملف المحطة لا يطابق رقمها: ${s.id}`);
    if (!s.data.number.startsWith(`${s.data.part.id}.`)) throw new Error(`المحطة ${s.id} ليست في بابها`);
  }
  return parts.map((entry) => {
    const own = stations.filter((s) => s.data.part.id === entry.id);
    const list: PathStation[] = entry.data.plan.map((p) => ({ ...p, entry: own.find((s) => s.data.number === p.number) }));
    for (const s of own) {
      if (!list.some((p) => p.number === s.data.number)) list.push({ number: s.data.number, title: s.data.title, entry: s });
    }
    for (const p of list) if (p.entry) p.title = p.entry.data.title;
    list.sort((a, b) => compareNumbers(a.number, b.number));
    return { entry, stations: list, hasPage: Boolean(entry.data.summary) };
  });
}

// ---------- التواريخ ----------

type DateVal = { h?: number; g?: number; approx?: boolean } | undefined;

export function formatDate(d: DateVal) {
  if (!d) return '';
  const bits = [d.h ? `${d.h}هـ` : '', d.g ? `${d.g}م` : ''].filter(Boolean).join(' / ');
  return d.approx ? `نحو ${bits}` : bits;
}

export function lifespan(born: DateVal, died: DateVal) {
  if (born && died) return `${formatDate(born)} — ${formatDate(died)}`;
  if (died) return `ت ${formatDate(died)}`;
  return formatDate(born);
}

// ---------- النصوص المنسقة ----------

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type SourceMap = Map<string, CollectionEntry<'sources'>>;
let sourceCache: SourceMap | undefined;

export async function sourceMap(): Promise<SourceMap> {
  if (!sourceCache) sourceCache = new Map((await getCollection('sources')).map((s) => [s.id, s]));
  return sourceCache;
}

// الإحالة داخل النص: [@معرّف المصدر، الموضع] مثل [@zawzani، ص 12]
const CITE = /\[@([a-z0-9-]+)(?:[،,]\s*([^\]]+))?\]/g;

function citeLink(id: string, loc: string | undefined, sources: SourceMap) {
  const s = sources.get(id);
  if (!s) throw new Error(`إحالة إلى مصدر غير موجود: ${id}`);
  const label = loc ? `${s.data.short}، ${loc.trim()}` : s.data.short;
  return `<a class="cite" href="${url.source(id)}" title="${escapeHtml(s.data.title)}">${escapeHtml(label)}</a>`;
}

// يحوّل نصًا من ملفات المحتوى إلى HTML آمن، مع تحويل الإحالات إلى روابط.
export function fmt(text: string | undefined, sources: SourceMap) {
  if (!text) return '';
  return escapeHtml(text).replace(CITE, (_, id: string, loc?: string) => citeLink(id, loc, sources));
}

// يحوّل الإحالات داخل متن Markdown بعد تحويله إلى HTML.
export function citeHtml(html: string | undefined, sources: SourceMap) {
  if (!html) return '';
  return html.replace(CITE, (_, id: string, loc?: string) => citeLink(id, loc, sources));
}

// نص بلا إحالات، لوصف الصفحة في محركات البحث.
export function stripCites(text: string | undefined) {
  return text?.replace(CITE, '').replace(/\s+([،.])/g, '$1').trim();
}

// نسخة من النص بلا تشكيل، ليجده البحث مهما كُتبت الكلمة.
export function plain(text: string) {
  return text
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[أإآٱ]/g, 'ا');
}
