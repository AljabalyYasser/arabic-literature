# Brief: gloss every hard word in the verse footnotes

The owner's rule (2026-10-20): in a verse footnote, gloss every word a modern reader would not understand, not a
selection. He noticed that «الدمقس» was glossed but «المفتّل» was not, in Imruʾ al-Qays's verse 12. The footnote
form is also fixed: all the glosses first, then the sources once at the end, separated by «؛».

Repo: /home/user/arabic-literature. Do not run git or `npm run build`; the lead does both. First read `book/README.md`
and `book/brief-book-fulltext.md`.

## For every `@` verse line in your chapters

1. Read the verse and list each word a cultivated modern reader would stumble on: rare words, old senses of common
   words, place names that need a word of identification, and words used in a figurative sense the reader would miss.
2. **Existing glosses.** Check the verse's footnote. If a word on your list is not glossed there, add it.
3. **Source.** Take the gloss from the commentators the chapter already uses. These are Ibn al-Anbari, al-Zawzani,
   al-Tabrizi, al-Aʿlam, the Diwan's commentator, al-Marzuqi and al-Baghdadi, or Lisan al-ʿArab when they are silent.
   Check it with `SCRATCH/sh.py` when the site does not already quote it. Keep each gloss short, a few words where
   possible.
4. **Site file.** If the site's verse file (`src/content/verses/<text-id>/NNN.yaml`) lacks the gloss, add a
   `vocabulary` entry there with the same source. Log the addition in `research/audits/clarity-<chapter-id>.md` as
   «gloss added». Run `vcheck.py` and `fmcheck.py` on the files you change.
5. **Form.** Keep the footnote form: glosses first, then the sources at the end. Afterwards run
   `python3 book/tools/fn-sources-last.py book/src/<chapter>.txt`, which tidies any source left in the middle.
6. **Clarity.** Do not gloss what any reader knows, such as «الدمع» or «الليل», and do not change the verses.

SCRATCH = /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad (sh.py, vcheck.py,
fmcheck.py).

## Build and report

```
python3 book/tools/render.py --out <id> --no-title "x" book/src/<id>.txt
node book/tools/build.mjs $PWD/book <id>
```

Final reply, under 100 words per chapter:
- the glosses added to the book;
- the glosses added to the site;
- the pages before and after.
