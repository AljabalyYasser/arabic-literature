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

// الفصل قضية في باب (معرّفه <رقم الباب>/<المعرّف>) أو مرحلة في مسار علم (<معرّف العلم>/<المعرّف>).
const isEraId = (id: string) => /^\d+$/.test(id);
export const chapterHome = (id: string) => id.split('/')[0];
export const chapterSlug = (id: string) => id.split('/')[1];
export const isTopic = (id: string) => isEraId(chapterHome(id));

export const url = {
  era: (id: string) => `/path/${id}/`,
  chapter: (id: string) =>
    isTopic(id) ? `/path/${chapterHome(id)}/${chapterSlug(id)}/` : `/people/${chapterHome(id)}/${chapterSlug(id)}/`,
  person: (id: string) => `/people/${id}/`,
  group: (id: string) => `/people/groups/${id}/`,
  text: (id: string) => `/texts/${id}/`,
  verse: (id: string) => `/texts/${verseTextId(id)}/${verseOrder(id)}/`,
  story: (id: string) => `/stories/${id}/`,
  concept: (id: string) => `/concepts/${id}/`,
  mahfuz: (id: string) => `/mahfuzat/#${id}`,
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

export type Chapter = CollectionEntry<'chapters'>;
export type Person = CollectionEntry<'people'>;
// الاسم بعد مضاف: «مسار امرئ القَيْس».
export const nameGen = (p: Person) => p.data.nameGen ?? p.data.name;
export type Slot = { id: string; name: string; entry?: Person };
export type TopicSlot = { id: string; title: string; entry?: Chapter };
export type GroupSlot = { id: string; title: string; number: number; entry?: CollectionEntry<'groups'>; faces: Person[] };
export type RouteItem =
  | { kind: 'topic'; slot: TopicSlot }
  | { kind: 'person'; person: Person; stages: Chapter[] };
export type Era = {
  entry: CollectionEntry<'parts'>;
  topics: TopicSlot[];
  formative: Slot[];
  important: Slot[];
  groups: GroupSlot[];
  route: RouteItem[];
  // أعلام من أبواب أخرى يحيل إليهم هذا الباب (قاعدة المخضرمين).
  referred: Person[];
  // للباب صفحة إذا بُنيت بنيته.
  hasPage: boolean;
};

const byOrder = (a: Chapter, b: Chapter) => (a.data.order ?? 0) - (b.data.order ?? 0);

// مراحل مسار العلم بترتيبها.
export async function stagesOf(personId: string) {
  return (await getCollection('chapters', (c) => chapterHome(c.id) === personId)).sort(byOrder);
}

let eraCache: Promise<Era[]> | undefined;

// يبني بنية كل باب من ملفه ومن المحتوى المكتوب، ويُفشل البناء عند أي تعارض.
export function getEras(): Promise<Era[]> {
  eraCache ??= buildEras();
  return eraCache;
}

async function buildEras(): Promise<Era[]> {
  const parts = (await getCollection('parts')).sort((a, b) => a.data.number - b.data.number);
  const chapters = await getCollection('chapters');
  const people = await getCollection('people');
  const groups = await getCollection('groups');
  const partIds = new Set(parts.map((p) => p.id));
  const personById = new Map(people.map((p) => [p.id, p]));
  const fail = (msg: string) => { throw new Error(`بنية المسار: ${msg}`); };

  for (const c of chapters) {
    const home = chapterHome(c.id);
    if (isEraId(home)) {
      if (!partIds.has(home)) fail(`الفصل ${c.id} في باب غير موجود`);
      if (!parts.find((p) => p.id === home)!.data.topics.some((t) => t.id === chapterSlug(c.id))) fail(`القضية ${c.id} ليست في قائمة قضايا بابها`);
    } else {
      const person = personById.get(home);
      if (!person) fail(`الفصل ${c.id} في مسار علم غير موجود`);
      if (c.data.order === undefined) fail(`مرحلة المسار ${c.id} بلا ترتيب (order)`);
      if (chapters.some((o) => o !== c && chapterHome(o.id) === home && o.data.order === c.data.order)) fail(`ترتيب مكرر في مسار ${home}`);
    }
  }

  for (const p of people) {
    const era = parts.find((x) => x.id === p.data.part.id)!;
    const d = era.data;
    if (p.data.tier === 'face') {
      if (!p.data.group || !d.groups.some((g) => g.id === p.data.group)) fail(`الوجه ${p.id} في مجموعة غير موجودة في بابه: ${p.data.group}`);
    } else {
      if (p.data.group) fail(`${p.id} ليس من الوجوه، فلا مجموعة له`);
      if (!d[p.data.tier].some((s) => s.id === p.id)) fail(`${p.id} ليس في قائمة درجته في بابه`);
    }
    for (const r of p.data.refer) if (r.id === p.data.part.id) fail(`${p.id} يحيل إلى بابه نفسه`);
    // الوجه الذي لا بطاقة له يُكتب مدخلًا في صفحة مجموعته، فلا بد أن تكون المجموعة مكتوبة.
    if (!p.data.card && (p.data.tier !== 'face' || !groups.some((g) => g.id === p.data.group))) fail(`${p.id} بلا بطاقة، فمكانه صفحة مجموعة مكتوبة`);
  }

  for (const g of groups) {
    if (!parts.find((x) => x.id === g.data.part.id)!.data.groups.some((s) => s.id === g.id)) fail(`المجموعة ${g.id} ليست في قائمة مجموعات بابها`);
  }

  const stages = new Map<string, Chapter[]>();
  for (const c of chapters) if (!isTopic(c.id)) stages.set(chapterHome(c.id), [...(stages.get(chapterHome(c.id)) ?? []), c].sort(byOrder));

  return parts.map((entry) => {
    const d = entry.data;
    const slot = (tier: 'formative' | 'important') => (s: { id: string; name: string }): Slot => {
      const person = personById.get(s.id);
      if (person && (person.data.tier !== tier || person.data.part.id !== entry.id)) fail(`${s.id} في قائمة ${tier} في الباب ${entry.id}، ودرجته في ملفه غير ذلك`);
      return { ...s, entry: person };
    };
    const topics = d.topics.map((t) => ({ ...t, entry: chapters.find((c) => c.id === `${entry.id}/${t.id}`) }));
    const route: RouteItem[] = d.route.map((id) => {
      const topic = topics.find((t) => t.id === id);
      if (topic) return { kind: 'topic', slot: topic };
      const person = personById.get(id);
      if (person && person.data.part.id === entry.id) return { kind: 'person', person, stages: stages.get(id) ?? [] };
      return fail(`الطريق المقترح في الباب ${entry.id} يذكر ما ليس فيه: ${id}`);
    });
    return {
      entry,
      topics,
      formative: d.formative.map(slot('formative')),
      important: d.important.map(slot('important')),
      groups: d.groups.map((g, i) => ({
        ...g,
        number: i + 1,
        entry: groups.find((x) => x.id === g.id),
        faces: people
          .filter((p) => p.data.tier === 'face' && p.data.group === g.id && p.data.part.id === entry.id)
          .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.id.localeCompare(b.id)),
      })),
      route,
      referred: people.filter((p) => p.data.refer.some((r) => r.id === entry.id)),
      hasPage: d.formative.length + d.important.length + d.groups.length > 0 || Boolean(d.summary || d.overview),
    };
  });
}

// ترتيب القراءة في الموقع كله: الطريق المقترح في كل باب بالترتيب، ثم ما لم يدخل الطريق.
export async function readingOrder(): Promise<Chapter[]> {
  const eras = await getEras();
  const out: Chapter[] = [];
  for (const era of eras) {
    for (const item of era.route) {
      if (item.kind === 'topic') { if (item.slot.entry) out.push(item.slot.entry); }
      else out.push(...item.stages);
    }
  }
  const rest = (await getCollection('chapters')).filter((c) => !out.includes(c)).sort((a, b) => a.id.localeCompare(b.id));
  return [...out, ...rest];
}

// اسم الفصل في موضعه: «القضية 2 من 5» أو «المرحلة 2 من 3».
export async function chapterPlace(c: Chapter) {
  const home = chapterHome(c.id);
  if (isTopic(c.id)) {
    const era = (await getEras()).find((e) => e.entry.id === home)!;
    const i = era.topics.findIndex((t) => t.id === chapterSlug(c.id));
    return { kind: 'topic' as const, era, index: i + 1, total: era.topics.length };
  }
  const person = await must({ collection: 'people', id: home });
  const list = await stagesOf(home);
  return { kind: 'stage' as const, person, index: list.indexOf(list.find((x) => x.id === c.id)!) + 1, total: list.length };
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

// العدد مع معدوده: countWord(3, ['مرحلة واحدة', 'مرحلتان', 'مراحل', 'مرحلة']) = «3 مراحل».
export function countWord(n: number, [one, two, few, many]: [string, string, string, string]) {
  if (n === 1) return one;
  if (n === 2) return two;
  return `${n} ${n % 100 >= 3 && n % 100 <= 10 ? few : many}`;
}
