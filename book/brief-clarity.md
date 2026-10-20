# Brief: clarity review of the site's prose (pilot: Tarafa's path)

Repo: /home/user/arabic-literature (Astro; content in Arabic, `src/content/`). SCRATCH (tools):
/tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad. No git, no build (the lead
does both). Do not change any file's `status`.

## Why

The owner found sentences on the site that a reader cannot follow or that misstate a source. This pilot measures how
common that is and fixes it. Three real examples:
1. **A quoted exchange with a step missing.** «سُئل لَبِيد عن أشعر الناس فقال: «المَلِك الضِّلِّيل»… ثم قال: «الغلام القتيل»». This
   reads as two answers to one question. Ibn Sallam (ج1 ص54): he was asked, said «الملك الضليل»; they came back, «ثم من؟»,
   he said «الغلام القتيل»; «ثم من؟» «الشيخ أبو عقيل» (himself). The fix restores the missing step, so the ranking is clear.
2. **A source misframed.** «ويتخذه شوقي ضيف مثالًا للشاب الذي يدمن الخمر…». Dayf (ج1 ص70) speaks of young men of the
   Jahiliyya who drank until their tribe shunned them, and *quotes Tarafa's two verses* as a witness. He does not make
   Tarafa «an example of an addict». The fix states what Dayf does.
3. **Broken or padded grammar.** «وقد ملك من سنة 554 إلى 569م» → «وكان ملك الحيرة من سنة 554 إلى سنة 569م».

## The test: ask of every sentence

1. **Does it stand alone?** Would a reader with no other page open understand it: who is speaking, about whom, and
   what each pronoun refers to?
2. **Is the quote framed truly?** Does the sentence say what the source says, no more and no less? Is a step of a
   dialogue or report missing? Is a witness turned into a verdict, or a «يقال» into a fact?
3. **Is every word needed?** Cut padding: detours that do not serve the point, repetitions, editorial chatter. Keep
   definitions at first use (a site rule) and keep citations.

Also flag: a term used before it is defined, a number or date without its unit or era, and a sentence that only
makes sense next to a link on another page.

## Scope (pilot)

- `src/content/chapters/tarafa/*.mdx` (all prose, including headings, outcomes and review answers).
- `src/content/people/tarafa.md`; every story in `src/content/stories/` whose `people` includes `tarafa`; the body,
  `attribution.note`, `occasion`, `thesis` and `edition.note` of every text with `author: "tarafa"`; the `src/content/nahl/`
  entries for tarafa.
- Verse files: in `verses/li-khawla-atlal/`, the prose fields (`meaning`, `context`, `rhetoric`) of the first 30 files
  that have a `rhetoric` layer — a sample, so we can tell whether the verse layers need a full pass.

## Rules

- Fix in place, keeping the site's style and its citations. Change a fact or a quote only after checking the source
  (`python3 SCRATCH/sh.py find <shamela-id> <from> <to> '<regex>'`; ids in `SCRATCH/qcheck.py` BOOKS), and say so.
- Keep MDX components (`<Cite …/>`, `<Reading …/>`, `<Ago …/>`, `<VerseQuote …/>`) intact.
- Log every change in `research/audits/clarity-tarafa.md`: file, before → after (short), and type (1 stand-alone,
  2 framing, 3 padding, 4 other).

## Checks

`python3 SCRATCH/qcheck.py <changed files>`, `python3 SCRATCH/vcheck.py file <changed files>` (and `vcheck.py text
<ids>` for changed texts), `python3 SCRATCH/fmcheck.py`.

## Final reply (under 200 words)

Words reviewed (approximate), number of fixes by type and by file group (chapters, stories/people/texts, verse
sample), the rate per 1,000 words, the three worst cases, and your judgement: does the rest of the site need a full
pass, and do the verse layers?
