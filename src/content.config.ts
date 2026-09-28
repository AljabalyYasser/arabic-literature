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

const parts = defineCollection({
  loader: glob({ base: './src/content/parts', pattern: '*.yaml' }),
  schema: z.object({
    number: z.number().int(),
    title: z.string(),
    range: z.string().optional(),
    // السنة الميلادية التقريبية لبداية الباب، ليُحسب بعدها عن عصرنا.
    start: z.number().int().optional(),
    summary: z.string().optional(),
    highlights: z.array(card).default([]),
    deep: z.array(card).default([]),
    keyNames: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).default([]),
    plan: z.array(z.object({ number: z.string(), title: z.string() })).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

const stations = defineCollection({
  loader: glob({ base: './src/content/stations', pattern: '*.mdx' }),
  schema: z.object({
    part: reference('parts'),
    number: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    minutes: z.number().int().optional(),
    people: z.array(reference('people')).default([]),
    texts: z.array(reference('texts')).default([]),
    concepts: z.array(reference('concepts')).default([]),
    stories: z.array(reference('stories')).default([]),
    outcomes: z.array(z.string()).default([]),
    review: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    memorize: z.array(reference('verses')).default([]),
    sources: z.array(citation).default([]),
    status,
  }),
});

const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '*.md' }),
  schema: z.object({
    name: z.string(),
    fullName: z.string().optional(),
    kinds: z.array(z.enum(['poet', 'prose', 'critic', 'commentator', 'narrator', 'linguist', 'patron'])).min(1),
    born: date.optional(),
    died: date.optional(),
    part: reference('parts').optional(),
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
    grade: z.enum(['thabit', 'khilaf', 'mashhur', 'manhul']),
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

export const collections = { parts, stations, people, texts, verses, stories, concepts, sources };
