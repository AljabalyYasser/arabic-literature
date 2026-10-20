# Brief: the abridgement — the five topics of the Jahili era (and their site review)

Repo: /home/user/arabic-literature. No git, no `npm run build` (the lead does both). Read `book/README.md` (owner
decisions), `book/brief-book-tarafa.md` (the writing rules), `book/brief-clarity.md` (the clarity test), and the model
chapter `book/src/tarafa.txt` — it was rewritten sentence by sentence after the owner rejected a first draft for
unclear, misframed and padded sentences. Match its standard.

## Two jobs per topic, in this order

**1. Review the site's topic page** (`src/content/chapters/1/<topic>.mdx`) **and the stories and people files it embeds or
links as its own matter**, with the clarity test of `book/brief-clarity.md` (fix in place, keep citations and MDX
components, change a fact or quote only after checking the source with `SCRATCH/sh.py`, never change `status`). Log every
change in `research/audits/clarity-<topic>.md` as in `research/audits/clarity-tarafa.md`. Run qcheck/vcheck/fmcheck on the
changed files.

**2. Write the book chapter** `book/src/<topic>.txt` from the reviewed page, in the book markup, within its page budget:
- Same language as the site; every fact and quote from the site with the site's citation (as footnotes).
- No site devices (grade labels, «المرحلة», «في الموقع», links, review questions, outcomes). Attribution in prose only
  where it matters, as the ancients write it.
- **Apply the clarity test to your own text before you finish**: read every sentence alone. Is it understood without the
  site? Is every pronoun, name and «هذا/هذان» clear? Does each quote say what its source says, with no missing step of a
  report? Is it clear why a witness or verse is cited? Is every word needed? Define a term at first use.
- Prefer one clear sentence to two half-sentences. No commentary on our own sources or copies («نسختنا», «الموقع»).
- Chapter heading line: `# <short title>` (it goes into the running head: keep it under ~30 characters), then
  `% <subtitle>` for the full title if needed.

Check the length:

```
python3 book/tools/render.py --out <topic> --no-title "العصر الجاهلي · قضايا العصر" book/src/<topic>.txt
node book/tools/build.mjs $PWD/book <topic> shots     # prints the page count; PNGs in book/out/<topic>-pN.png
```

Look at two or three of the PNGs to see the result. Stay within the budget; the last page may be part-filled.

SCRATCH = /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad (tools: sh.py,
qcheck.py, vcheck.py, fmcheck.py, meter.py).

## Assignments and page budgets

- **Agent 1:** `al-sahra` «الصحراء والقبيلة والسوق» (≤ 4 pages) and `al-muallaqat` «المعلقات» (≤ 8 pages: what they are, who
  collected and named them, the tale of the hanging and its grade, the lists of seven and ten, one line on each poet
  pointing to his chapter — not the poems themselves).
- **Agent 2:** `ayyam-al-arab` «أيام العرب» (≤ 12 pages: al-Basus, Dahis and al-Ghabraʾ, Shiʿb Jabala, al-Fijar, al-Kulab
  al-Thani, Dhu Qar — each day's cause, course and outcome, its key verses, and the grade of its stories in prose).
- **Agent 3:** `al-nathr` «النثر الجاهلي» (≤ 7 pages) and `al-intihal` «صحة الشعر الجاهلي» (≤ 9 pages).

## Final reply (under 150 words)

Per topic: site fixes (count by type), book pages, and anything unresolved.
