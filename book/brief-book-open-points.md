# Brief: open points from the final reading

Repo: /home/user/arabic-literature. No git and no `npm run build`; the lead does both. First read `book/README.md`,
`book/brief-book-final-read.md` and the Part 2 and Part 4 sections of `research/audits/book-final-read.md`.

Do not edit `book/src/ayyam-al-arab.txt`, the five topic chapters, `imru-al-qais.txt`, `tarafa.txt` or the fourteen
figure chapters: other readers are still working on them.

## 1. Glosses with no source

Part 4, item 5, lists 19 verse footnotes, and Part 2, item 3, lists two more. Each has plain glosses with no source.

For each gloss:
- Find it in that text's commentators. If they lack it, look in the Lisan, using `research/tools/dk.py` or the
  Shamela helper `/tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad/sh.py`.
- Where the source words the gloss differently, use the source's gloss.
- Put the source at the end of the footnote, in the book's form: glosses first, then the sources once, separated by «؛».
- Add the gloss with its source to the verse file's `vocabulary`. Log the change in `research/audits/clarity-<id>.md`.
- If no approved source has the word, leave it and say so.

## 2. Sakhr's «أرى أم صخر»

The verse numbers in `al-khansa.txt` and `group-asra.txt` clash (Part 4, item 4). Use the order and numbers of the
site's verse files, al-Asmaʿi's recension. Correct whichever chapter differs, its verses and any prose that cites a
verse number.

## 3. Abu ʿAmr in hukama

Part 4, item 7. Read the Aghani (Dar al-Kutub) at vol. 3, p. 103 and its chain of transmission with `dk.py`. Name the
Abu ʿAmr in full in the book and on the site, but only if the text makes clear which one he is. If it does not, write
the sentence so that he is not taken for Ibn al-ʿAlaʾ.

## 4. A definition quoted in full more than once

See Part 2, item 2, and Part 4, item 6. The book is read in order, so a critic's definition is quoted in full once,
at its first use. After that, name the device and apply it to the verse in our own words, with the critic's name.
- ʿAbd al-Qahir's definition of kināya first appears in full in «أيام العرب», which stays as it is. Shorten the
  definition in Zuhayr, al-Nabigha and awail.
- In al-Khansa, «طويل النجاد» is ʿAbd al-Qahir's own example. Keep what he says about this verse, but cut the
  general definition.
- Keep his tamthīl phrase «محصّلاً بضرب من التأوّل» in Zuhayr. In al-Nabigha, refer back to it.
- Keep Ibn Rashiq's «وأولى ما تكرر فيه الكلام باب الرثاء» in «أيام العرب». In al-Khansa, refer back to it in a few
  words.

Each verse keeps its own point. Only the general definition goes.

## Check and build

Run `python3 book/tools/fn-sources-last.py book/src/<id>.txt` on each chapter you change. Then render and build it:

```
python3 book/tools/render.py --out <id> --no-title "x" book/src/<id>.txt
node book/tools/build.mjs $PWD/book <id>
```

Run qcheck, vcheck and fmcheck from the scratchpad on every site file you change. Under each item in
`research/audits/book-final-read.md`, write one line saying what you did.

## Final reply (under 150 words)

What you did for each item, and anything left unresolved.
