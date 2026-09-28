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

// أرقام الأبيات المشروحة مجموعة في مدى متصل، مثل: 1–6، 44–46.
export function ranges(numbers: number[]) {
  const out: string[] = [];
  let start = numbers[0];
  for (let i = 1; i <= numbers.length; i++) {
    if (numbers[i] === numbers[i - 1] + 1) continue;
    const end = numbers[i - 1];
    out.push(start === end ? String(start) : `${start}–${end}`);
    start = numbers[i];
  }
  return out.join('، ');
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

type DateVal = { h?: number; g?: number; approx?: boolean; text?: string } | undefined;

export function formatDate(d: DateVal) {
  if (!d) return '';
  if (d.text) return d.text;
  const bits = [d.h ? `${d.h}هـ` : '', d.g ? `${d.g}م` : ''].filter(Boolean).join(' / ');
  return d.approx ? `نحو ${bits}` : bits;
}

export function lifespan(born: DateVal, died: DateVal) {
  if (born && died) return `${formatDate(born)} — ${formatDate(died)}`;
  if (died) return `ت ${formatDate(died)}`;
  return formatDate(born);
}

// ---------- البعد عن عصرنا ----------

// السنة التي بُني فيها الموقع؛ يُحسب منها البعد، فيبقى صحيحًا مع كل بناء جديد.
const NOW = new Date().getFullYear();
const fromHijri = (h: number) => Math.round(622 + h * 0.970229);

// «قبل نحو 1400 سنة». الأبعاد الطويلة تُقرَّب إلى أقرب عشر سنين.
export function ago(g: number, approx = false) {
  const diff = NOW - g;
  if (diff < 1) return 'في عامنا هذا';
  const n = diff >= 100 ? Math.round(diff / 10) * 10 : diff;
  const about = approx || diff >= 100 ? 'نحو ' : '';
  if (n === 1) return `قبل ${about}سنة`;
  if (n === 2) return `قبل ${about}سنتين`;
  const word = n % 100 >= 3 && n % 100 <= 10 ? 'سنوات' : 'سنة';
  return `قبل ${about}${n} ${word}`;
}

// البعد من تاريخ في ملف المحتوى: الميلادي إن وُجد، وإلا المحوَّل من الهجري.
export function dateAgo(d: DateVal) {
  if (d?.g) return ago(d.g, d.approx || Boolean(d.text));
  if (d?.h) return ago(fromHijri(d.h), true);
  return '';
}

// بُعد العلَم عن عصرنا: من وفاته، وإلا من مولده.
export const livedAgo = (born: DateVal, died: DateVal) => dateAgo(died) || dateAgo(born);

const agoSpan = (text: string) => `<span class="ago">${text}</span>`;

// داخل النص: [~630] سنة ميلادية، و[~h41] سنة هجرية.
const AGO = /\[~(h)?(\d{1,4})\]/g;
const agoToken = (_: string, h: string | undefined, y: string) =>
  agoSpan(h ? ago(fromHijri(Number(y)), true) : ago(Number(y)));

// «(ت 463هـ)» و«(ت 1332هـ / 1914م)» يضاف إليهما البعد تلقائيًا.
const DEATH = /\(ت (\d{1,4})هـ(?: \/ (\d{3,4})م)?\)/g;
export function withDeathAgo(text: string, html = false) {
  return text.replace(DEATH, (m, h: string, g?: string) => {
    const t = g ? ago(Number(g)) : ago(fromHijri(Number(h)), true);
    return `${m.slice(0, -1)}، ${html ? agoSpan(t) : t})`;
  });
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
  const html = escapeHtml(text).replace(CITE, (_, id: string, loc?: string) => citeLink(id, loc, sources));
  return withDeathAgo(html.replace(AGO, agoToken), true);
}

// البعد الزمني وحده، لمكوّن <Ago /> في المحطات.
export const agoHtml = (g: number | undefined, h: number | undefined) =>
  agoSpan(g ? ago(g) : h ? ago(fromHijri(h), true) : '');

// يحوّل الإحالات داخل متن Markdown بعد تحويله إلى HTML.
export function citeHtml(html: string | undefined, sources: SourceMap) {
  if (!html) return '';
  const out = html.replace(CITE, (_, id: string, loc?: string) => citeLink(id, loc, sources));
  return withDeathAgo(out.replace(AGO, agoToken), true);
}

// نص بلا إحالات، لوصف الصفحة في محركات البحث.
export function stripCites(text: string | undefined) {
  return text
    ?.replace(CITE, '')
    .replace(AGO, (_, h: string | undefined, y: string) => (h ? ago(fromHijri(Number(y)), true) : ago(Number(y))))
    .replace(/\s+([،.])/g, '$1')
    .trim();
}

// نسخة من النص بلا تشكيل، ليجده البحث مهما كُتبت الكلمة.
export function plain(text: string) {
  return text
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[أإآٱ]/g, 'ا');
}
