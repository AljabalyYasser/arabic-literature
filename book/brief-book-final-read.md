# Brief: final reading of the book

The book is finished: 408 pages in `book/src/*.txt` (order in `book/tools/build-all.sh`). This is the last reading
before print. Read your chapters in full, as a careful reader of the printed book would, and fix what is wrong.

Repo: /home/user/arabic-literature. No git, no `npm run build` (the lead does both). Read `book/README.md` first.

## What to look for, in every sentence

1. **Errors of fact or text.** A quote that is not on the site, a wrong name, date, or page, or a verse that differs
   from its verse file in `src/content/verses/`.
   - Check doubtful quotes against the site's files with grep, and against the source with
     `/tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad/sh.py` or
     `research/tools/dk.py` when the site itself may be wrong.
   - A fix to the site is logged in `research/audits/clarity-<id>.md`.
2. **Clarity.** A sentence that does not stand alone, a pronoun without a clear antecedent, a term used before it is
   defined, a misframed source (a report given as a verdict, one critic's words given to another), or a sentence that
   says nothing.
3. **Cross-references.** Every «كما مرّ في…» and «سيأتي…» must point to a chapter that really contains that content,
   and in the right order. Grep the target chapter.
4. **Repetition across chapters.** The same story, quote, or verse told in full in two chapters. Keep it where it
   belongs, and in the other place refer to it in one line. Grep `book/src/` for the key words of every story you
   read.
5. **Rules of the book**, from `book/README.md`:
   - no grade words used as labels;
   - no impressions of our own;
   - hard words glossed in verse footnotes, glosses first and the sources once at the end;
   - poems read in units of meaning;
   - omitted verses named by number, with no apology;
   - footnotes cite only books that have source cards.
6. **Language.** Typos, broken Arabic, missing or doubled words, wrong agreement, and punctuation that misleads.

Fix every clear error in place. Change nothing that is not wrong: this is not a rewrite.

Log a doubtful point in `research/audits/book-final-read.md` under your part's heading instead of changing it. A
doubtful point is a judgement call, a change of substance, or something the owner should decide.

## Build check

After your fixes, run `python3 book/tools/fn-sources-last.py book/src/<id>.txt` on each chapter you changed. Then
render and build each one, so you know it still builds:

```
python3 book/tools/render.py --out <id> --no-title "x" book/src/<id>.txt
node book/tools/build.mjs $PWD/book <id>
```

## Final reply (under 200 words)

- Count of fixes by kind.
- The worst five.
- The items you logged for the owner.
