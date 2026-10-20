# Brief: the abridgement — a formative poet's chapter (and the site review of his path)

Repo: /home/user/arabic-literature. No git, no `npm run build` (the lead does both). Read first:
- `book/README.md` (owner decisions; note the no-gaps rule: a reader who finishes must know the subject fully and be able
  to discuss it and answer objections);
- `book/brief-book-tarafa.md` (writing rules) and `book/brief-clarity.md` (the clarity test);
- the model chapter `book/src/tarafa.txt` and the five topic chapters `book/src/{al-sahra,ayyam-al-arab,al-muallaqat,
  al-nathr,al-intihal}.txt` — your chapter sits in the same book: do not retell what they tell (e.g. the tale of the
  hanging, the Ayyam), refer to it in one line.

## Two jobs, in this order

**1. Review the site's path for your poet** with the clarity test (fix in place; keep citations and MDX components;
change a fact or quote only after checking the source with `SCRATCH/sh.py`; never change `status`):
`src/content/chapters/<poet>/*.mdx`, `src/content/people/<poet>.md`, every story whose `people` includes the poet, the body
and `attribution.note`/`occasion`/`thesis`/`edition.note` of every text with `author: "<poet>"`, and the poet's
`src/content/nahl/` entries. Verse files: fix only those you use in the book and find wanting. Log every change in
`research/audits/clarity-<poet>.md` as in `research/audits/clarity-tarafa.md`. Run qcheck/vcheck/fmcheck on changed files.

**2. Write the book chapter** `book/src/<poet>.txt` in the book markup, ≤ 7 pages (up to 9 if the no-gaps rule needs
it; say so). Shape, as in `tarafa.txt`: his life (with the stories told briefly, their reliability in prose); his
Muʿallaqa or main poem (matlaʿ, hinge and famous verses, each key verse with «المعنى», hard words in footnotes, one-line
bridges that keep the poem's structure); his other famous poetry; the critics' judgements of him; what is attributed to
him and is not his; every dispute with its sides and evidence. Same language as the site, every fact and quote from the
site with its citation, no site devices, attribution in prose. Apply the clarity test to your own text before you finish.

```
python3 book/tools/render.py --out <poet> --no-title "العصر الجاهلي · أعلام التكوين" book/src/<poet>.txt
node book/tools/build.mjs $PWD/book <poet> shots      # page count; PNGs in book/out/<poet>-pN.png
```

SCRATCH = /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad (sh.py, qcheck.py,
vcheck.py, fmcheck.py, meter.py).

## Final reply (under 150 words)

Site fixes (count by type, and the worst three), book pages, anything unresolved.
