# Brief: apply the owner's notes

Repo: /home/user/arabic-literature. No git and no `npm run build`: the lead does both. Read these first:
- `research/audits/owner-notes-2026-11.md`: the 36 notes, the plan for each, the general rules, and the owner's
  answers at the end;
- `book/README.md`, especially «Owner's notes on the draft»;
- `book/brief-book-final-read.md`, for how fixes are checked and logged.

Every fact and quote comes from the site or an approved source card, with its citation. Fix the site too where it has
the same fault, and log site fixes in `research/audits/clarity-<id>.md`.

## Part A: the 36 notes → the five topic chapters

Apply every note in `book/src/al-sahra.txt`, `ayyam-al-arab.txt`, `al-muallaqat.txt`, `al-nathr.txt` and
`al-intihal.txt`, as the log's plan and the owner's answers say.
- **p. 8:** cut only «، ومعه تبقى».
- **p. 23:** give ʿAbd Yaghuth's «ألا لا تلوماني» complete, as `src/content/texts/ala-la-talumani.md` and its verse
  files have it, read in units of meaning (see `book/brief-book-fulltext.md`).
- **p. 47, Mahmud Shakir's reply to Taha Husayn.**
  - Write the source card for «جمهرة مقالات الأستاذ محمود محمد شاكر». Collected by ʿAdil Sulayman Jamal, al-Khanji;
    check the edition and pages on its title page in Shamela or archive.org.
  - Write its register entry in Arabic to `research/islami/registry-shakir.md`.
  - Then write his reply in the main text, quoted from the source.
- **Vowels.** Apply rule 1 as the owner restated it. Vowel only a word that can be misread in a way that changes the
  meaning. Never vowel prose in full.

Under each note in the log, write one line saying what was done.

## Part B: the new rules across the rest of the book

Do this after part A, in this order of chapters: the 8 formative poets, the 14 figures, then the 15 faces groups. Apply
the general rules:
- ambiguous words vowelled;
- stories told in order, with clear actors;
- the verses that are talked about quoted;
- every term with an example, and defined in the main text;
- people introduced at first mention;
- glosses that define;
- padding cut;
- lists named first;
- **one version per story**: a story told in several versions keeps one, and the others get one line such as
  «وورد في كذا برواية أخرى».

The book must stay under 500 pages; today it is 410. The one-version rule will free pages; spend them on the owner's
additions.

## Check

After each chapter you change:
1. Run `python3 book/tools/fn-sources-last.py book/src/<id>.txt`.
2. Render and build it:
   ```
   python3 book/tools/render.py --out <id> --no-title "x" book/src/<id>.txt
   node book/tools/build.mjs $PWD/book <id>
   ```
3. Note its page count before and after.

## Final reply (under 200 words)

The notes applied, the site fixes, the page changes per chapter, and anything left open.
