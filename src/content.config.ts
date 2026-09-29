import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// مسودة: لم تمر بعد بمنهج البحث كاملًا. قيد المراجعة: تنتظر مراجعة صاحب المشروع. معتمد: روجعت واعتُمدت.
const status = z.enum(['draft', 'review', 'approved']).default('draft');

const card = z.object({ title: z.string(), text: z.string() });

// تاريخ بالهجري والميلادي؛ approx يعني أن التاريخ تقريبي ويُسبق بـ«نحو».
const date = z.object({
  h: z.number().int().optional(),
  g: z.number().int().optional(),
  approx: z.boolean().default(false),
  // صيغة حرة حين لا يُعرف التاريخ بسنة واحدة، مثل: «بين 530 و540م على الأرجح».
  text: z.string().optional(),
});

// إحالة إلى موضع محدد من مصدر. الكتاب يُسجَّل مرة واحدة في sources، والموضع هنا.
const citation = z.object({
  source: reference('sources'),
  loc: z.string().optional(),
  url: z.url().optional(),
  note: z.string().optional(),
});

// الباب: عصر من عصور الأدب، أو «قبل الرحلة» (الباب 0).
// بنية العصر (docs/alam.md): قضاياه، وأعلامه بدرجاتهم، ومجموعات وجوهه، والطريق المقترح فيه.
// ما في هذه القوائم ولم يُكتب بعد يظهر باهتًا.
const slot = z.object({ id: z.string(), name: z.string() });
// اسم في صفحة العصر مع سطر عنه، ويُربط بصفحة العلم إن كُتبت.
const named = z.object({ name: z.string(), person: reference('people').optional(), text: z.string() });
const parts = defineCollection({
  loader: glob({ base: './src/content/parts', pattern: '*.yaml' }),
  schema: z.object({
    number: z.number().int(),
    title: z.string(),
    range: z.string().optional(),
    // السنة الميلادية التقريبية لبداية الباب، ليُحسب بعدها عن عصرنا.
    start: z.number().int().optional(),
    // «أين أنت؟»: سطران في رأس صفحة العصر.
    summary: z.string().optional(),
    // تنبيه ظاهر تحت رأس صفحة العصر: حدود ما تغطيه الصفحة، أو حدّ للعصر قيد المراجعة.
    caveat: z.string().optional(),
    // صفحة العصر المختصرة تجيب عن أسئلة سبعة، ولا تكون هي الدراسة نفسها.
    overview: z.object({
      history: z.string(),                                  // ماذا حدث تاريخيًا مما أثّر في الأدب؟
      change: z.string(),                                   // ما الذي تغيّر في اللغة والأدب؟
      arts: z.array(card).default([]),                      // الفنون التي برزت
      poets: z.array(named).default([]),                    // أهم الشعراء
      writers: z.array(named).default([]),                  // أهم الأدباء والكتّاب والنقاد
      writersTitle: z.string().optional(),                  // عنوان آخر للقسم حين يلزم، كـ«الخطباء والحكماء» في الجاهلي
      // أهم الكتب قسمان: كتب من العصر نفسه (أُلّفت فيه، أو دواوين أهله)،
      // وكتب لاحقة نقرأ بها العصر (جُمعت أو أُلّفت بعده)، فلا تظهر كتب لاحقة كأنها من العصر.
      books: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      booksLater: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      texts: z.array(z.object({ title: z.string(), text: z.string(), text_id: reference('texts').optional() })).default([]), // النصوص التي صنعت العصر
      // تنبيه تحت القسم حين تنقصه أسماء لم نجد لها بعد سندًا في مصادرنا المعتمدة، فلا يظن القارئ أن القائمة تامة.
      notes: z.object({ poets: z.string(), writers: z.string(), books: z.string(), texts: z.string() }).partial().default({}),
    }).optional(),
    topics: z.array(z.object({ id: z.string(), title: z.string() })).default([]),
    formative: z.array(slot).default([]),
    important: z.array(slot).default([]),
    groups: z.array(z.object({ id: z.string(), title: z.string() })).default([]),
    // الطريق المقترح: معرّفات قضايا وأعلام من هذا الباب، بترتيب القراءة.
    route: z.array(z.string()).default([]),
    // خطة مسودة لباب لم تُبنَ بنيته بعد.
    plan: z.array(z.object({ number: z.string(), title: z.string() })).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

// الفصل: صفحة قراءة طويلة. موضعه من مجلده:
// chapters/<رقم الباب>/<المعرّف>.mdx قضية من قضايا العصر، ترتيبها من قائمة topics في الباب؛
// chapters/<معرّف العلم>/<المعرّف>.mdx مرحلة في مسار العلم، ترتيبها من order.
const chapters = defineCollection({
  loader: glob({ base: './src/content/chapters', pattern: '*/*.mdx' }),
  schema: z.object({
    order: z.number().int().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    minutes: z.number().int().optional(),
    people: z.array(reference('people')).default([]),
    texts: z.array(reference('texts')).default([]),
    concepts: z.array(reference('concepts')).default([]),
    stories: z.array(reference('stories')).default([]),
    outcomes: z.array(z.string()).default([]),
    review: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

// العلم ودرجته (docs/alam.md): أعلام التكوين، وأعلام مهمون، ووجوه من العصر.
// الوجه في مجموعة من مجموعات عصره، ومكانه صفحة المجموعة: بطاقة موسعة فيها أو مدخل قصير.
// ولا تكون للوجه صفحة منفردة إلا بقرار مستقل (page).
const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '*.md' }),
  schema: z.object({
    name: z.string(),
    // الاسم مجرورًا حين يختلف، مثل «امرئ القَيْس»، لقولنا «مسار امرئ القَيْس».
    nameGen: z.string().optional(),
    fullName: z.string().optional(),
    kinds: z.array(z.enum(['poet', 'prose', 'critic', 'commentator', 'narrator', 'linguist', 'patron'])).min(1),
    born: date.optional(),
    died: date.optional(),
    part: reference('parts'),
    tier: z.enum(['formative', 'important', 'face']),
    group: z.string().optional(),
    // للوجه: بطاقة موسعة في صفحة مجموعته (true)، أو مدخل قصير فيها (false). والبطاقة ليست صفحة.
    card: z.boolean().default(true),
    // للوجه الاستثنائي وحده: صفحة منفردة، بقرار في خريطة العصر. والأصل ألا تكون.
    page: z.boolean().default(false),
    // ترتيب الوجه في مجموعته.
    order: z.number().optional(),
    // لضمائر العناوين: «من هي؟» و«نصوصها».
    female: z.boolean().default(false),
    // المخضرم: الأبواب الأخرى التي تحيل إليه (قاعدة المخضرمين).
    refer: z.array(reference('parts')).default([]),
    summary: z.string(),
    placement: z.string().optional(),
    timeline: z.array(z.object({ year: z.string(), text: z.string() })).default([]),
    readingKeys: z.array(card).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

const texts = defineCollection({
  loader: glob({ base: './src/content/texts', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    author: reference('people').optional(),
    kind: z.enum(['qasida', 'muqattaa', 'khutba', 'risala', 'maqama', 'novel', 'story', 'play', 'other']).default('qasida'),
    form: z.enum(['amudi', 'tafeela', 'prose', 'muwashshah']).default('amudi'),
    // درجة القراءة: عميقة، أو موجهة، أو حرة. تُذكر حين يُقرأ النص كاملًا.
    reading: z.enum(['deep', 'guided', 'free']).optional(),
    attribution: z.object({
      grade: z.enum(['thabit', 'rajih', 'mukhtalaf', 'mansub']),
      note: z.string(),
    }).optional(),
    year: date.optional(),
    meter: z.string().optional(),
    rhyme: z.string().optional(),
    occasion: z.string().optional(),
    thesis: z.string().optional(),
    movement: z.string().optional(),
    map: z.array(z.object({ range: z.string(), title: z.string(), text: z.string() })).default([]),
    edition: citation.optional(),
    sources: z.array(citation).default([]),
    status,
  }),
});

// كل بيت ملف مستقل داخل مجلد نصه: verses/<معرّف النص>/<رقم البيت>.yaml
// وكل بيت يُشرح في الموقع يُشرح كاملًا: المعنى والمفردات، ثم النحو والصرف والبلاغة والوزن.
const verses = defineCollection({
  loader: glob({ base: './src/content/verses', pattern: '*/*.yaml' }),
  schema: z.object({
    first: z.string(),
    second: z.string().optional(),
    meaning: z.string(),
    vocabulary: z.array(z.object({ term: z.string(), text: z.string() })).min(1, 'البيت يحتاج إلى مفرداته'),
    syntax: z.array(z.string()).min(1, 'البيت يحتاج إلى النحو والتركيب'),
    morphology: z.array(z.string()).min(1, 'البيت يحتاج إلى الصرف والاشتقاق'),
    rhetoric: z.object({
      thesis: z.string(),
      devices: z.array(card).min(1, 'البلاغة تحتاج إلى وجه واحد على الأقل'),
      connection: z.string().optional(),
    }),
    prosody: z.object({
      meter: z.string(),
      rhyme: z.string(),
      scansion: z.string(),
      note: z.string().optional(),
    }),
    context: z.string().optional(),
    variants: z.array(z.object({ reading: z.string(), status: z.string(), note: z.string() })).default([]),
    sources: z.array(citation).min(1, 'البيت يحتاج إلى مصدر'),
    status,
  }),
});

const stories = defineCollection({
  loader: glob({ base: './src/content/stories', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // درجة القصة (وثيقة الأساس 5.1)، ووسمها عند الحاجة.
    grade: z.enum(['thabit', 'rajih', 'mukhtalaf', 'mansub']),
    tag: z.enum(['adabi', 'usturi']).optional(),
    gradeReason: z.string(),
    earliest: citation,
    people: z.array(reference('people')).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

const concepts = defineCollection({
  loader: glob({ base: './src/content/concepts', pattern: '*.md' }),
  schema: z.object({
    name: z.string(),
    group: z.enum(['arud', 'balagha', 'nahw', 'sarf', 'naqd', 'adab']),
    short: z.string(),
    example: z.object({
      verse: reference('verses').optional(),
      note: z.string().optional(),
    }).optional(),
    related: z.array(reference('concepts')).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

// المحفوظات: ما يحسن بقارئ الأدب أن يحفظه أو يعرفه.
// bayt بيت سائر، maqta مقطع أو قصيدة قصيرة، mathal مثل أو قول سائر، hikaya حكاية أدبية مشهورة.
const line = z.object({ first: z.string(), second: z.string().optional() });
const mahfuzat = defineCollection({
  loader: glob({ base: './src/content/mahfuzat', pattern: '*.yaml' }),
  schema: z.object({
    kind: z.enum(['bayt', 'maqta', 'mathal', 'hikaya']),
    title: z.string().optional(),
    part: reference('parts'),
    order: z.number().default(0),
    person: reference('people').optional(),
    // الأبيات المشروحة في قارئ الأبيات، أو نص يُكتب هنا لما لم يُشرح بعد.
    verses: z.array(reference('verses')).default([]),
    lines: z.array(line).default([]),
    text: z.string().optional(),
    story: reference('stories').optional(),
    meaning: z.string(),
    chapter: reference('chapters').optional(),
    year: date.optional(),
    sources: z.array(citation).default([]),
    status,
  }).superRefine((m, ctx) => {
    const has = { bayt: m.verses.length + m.lines.length > 0, maqta: m.verses.length + m.lines.length > 0, mathal: Boolean(m.text), hikaya: Boolean(m.story) }[m.kind];
    if (!has) ctx.addIssue({ code: 'custom', path: ['kind'], message: 'المحفوظ ينقصه نصه: أبيات، أو نص المثل، أو الحكاية' });
  }),
});

// مجموعة من مجموعات «وجوه من العصر». المجموعة تابعة لبابها، فملفها groups/<رقم الباب>/<المعرّف>.md
// ومعرّفها «<رقم الباب>/<المعرّف>»، فلا تصطدم مجموعتان متشابهتا الاسم في بابين.
// عنوانها وترتيبها في ملف الباب، ومتنها مدخل يعرّف ظاهرتها.
const groups = defineCollection({
  loader: glob({ base: './src/content/groups', pattern: '*/*.md' }),
  schema: z.object({
    sources: z.array(citation).default([]),
    status,
  }),
});

const sources = defineCollection({
  loader: glob({ base: './src/content/sources', pattern: '*.yaml' }),
  schema: z.object({
    short: z.string(),
    author: z.string(),
    title: z.string(),
    kind: z.enum(['primary', 'study', 'dictionary']),
    editor: z.string().optional(),
    edition: z.string().optional(),
    publisher: z.string().optional(),
    year: z.string().optional(),
    url: z.url().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { parts, chapters, people, groups, texts, verses, stories, concepts, mahfuzat, sources };
