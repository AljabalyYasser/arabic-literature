# Brief: the mother poem in full

The owner's decision of 2026-10-20: a poet's mother poem is given in full in his chapter, not as selected verses with
bridges. Many of its most beautiful verses had been left out, for example in Imruʾ al-Qays:
- «كأني غداة البين»;
- «أفاطم مهلًا»;
- «إذا التفتت نحوي»;
- «نؤوم الضحى».

The mother poems are:
- the Muʿallaqa of Imruʾ al-Qays, Tarafa, Zuhayr, ʿAntara and Labid;
- «يا دار ميّة» of al-Nabigha;
- «ودّع هريرة» of al-Aʿsha.

Repo: /home/user/arabic-literature. No git and no `npm run build`; the lead does both. First read `book/README.md`,
`book/brief-book-poets.md` and your chapter in `book/src/`.

## What to do in your chapter

1. **Every verse.** Give every verse of the mother poem, in the order and numbering of the recension the chapter
   already follows. Copy each verse letter for letter from the site's verse files
   (`src/content/verses/<text-id>/NNN.yaml`, fields `first` and `second`). The text id is in
   `src/content/texts/*.md`.
2. **Consecutive verses.** Set consecutive verses one after another as `@` lines. Not every verse gets a «= المعنى».
   - Hard words go in footnotes on the verse, from the verse file's `vocabulary`, with their source.
   - After a group of verses, a short `=` paragraph or a plain paragraph is written only where it says something
     useful. That can be a meaning a reader would miss, a rhetorical point or a grammatical point. It can also be a
     point about how the Arabs lived, as in «نؤوم الضحى»: the commentators read it as a sign of her ease and
     luxury, since others serve her.
   - Take every such point from the site's layers for that verse (`meaning`, `rhetoric`, `syntax`, `context`) with
     its source. A critic's judgement is credited to the critic by name. Never add our own impressions.
3. **Keep what is there.** The existing «المعنى» paragraphs, rhetorical notes and disputes stay. Bridges (`~`) that
   only summarised verses now given in full are removed. A bridge stays only where it carries a fact the verses do
   not.
4. **Explicit verses.** Leave out only verses that describe intercourse or the sexual organs explicitly. Judge each
   verse again by that rule alone.
   - Love poetry of every kind stays, including the body, embraces and mention of breasts. For example, Imruʾ
     al-Qays's 26–30 and 31–43 are not explicit by this rule. His 16–17 are.
   - Where verses are left out, write one neutral `~` line that gives their numbers and what they are about. For
     example: «~ والبيتان 16–17 في مغامرته مع امرأة حامل أو مرضع.»
   - Never write «لا ننقلها», «فلا ننقله» or any apology. The scholars before us cited such verses; we only give
     the numbers, and the reader may look them up.
5. **Apologies elsewhere.** Remove any «لا ننقلها» elsewhere in your chapter the same way.
6. **Clarity.** Apply the clarity test to everything you add.
7. **Build.** Render and build, then report the page count:
   ```
   python3 book/tools/render.py --out <id> --no-title "العصر الجاهلي · أعلام التكوين" book/src/<id>.txt
   node book/tools/build.mjs $PWD/book <id> shots
   ```

Do not edit the site in this task, except where a verse file you copy from is plainly wrong; log any such fix in
`research/audits/clarity-<poet>.md`.

## Density (added after the first chapter came back at twice its size)

The owner asked for the verses «دفعة», with explanation only where it is needed. So:
- **Verses run.** Give verse after verse without a paragraph between them. A section of 5–15 verses gets at most one
  short note of 1–3 lines, and only if it carries a real point: a meaning the reader would miss, a named critic's
  rhetorical or grammatical point, or a fact of how the Arabs lived. Do not paraphrase verse by verse.
- **«= المعنى» paragraphs.** Only the hinge verses that already had them, plus a verse whose sense is truly hard.
- **Footnote glosses.** Gloss only words a cultivated reader would not know, one short gloss each. Put all the glosses
  of a verse in one footnote, with one short source at the end. Do not cite Lisan word by word when a commentator
  already glosses the word.
- **Length.** Added verses should cost about one page per 12–14 verses. Report the pages before and after.

## Final reply (under 120 words)

Verses added, verses left out with their numbers, page count before and after, anything unresolved.
