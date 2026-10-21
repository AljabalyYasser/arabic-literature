# Brief: the abridgement — a faces group chapter (and the site review of its path)

Repo: /home/user/arabic-literature. Do not run git or `npm run build`; the lead does both.

## Read first

- `book/README.md`: the owner's decisions, all binding.
- `book/brief-book-poets.md`: the two jobs and the clarity test.
- `book/brief-book-fulltext.md`, section «Units of meaning»: how verses are read, the glosses and the footnote form.
- One finished chapter as a model: `book/src/durayd-ibn-al-simma.txt`.

## The material

- Each group has a page in `src/content/groups/1/<group>.md`: its sections, and the faces in each section.
- Each face is a person in `src/content/people/<id>.md` with `group: "<group>"`. A face is either a card (a full
  short page) or an entry (a few lines), as the group page and the person page show.
- Each face's texts are in `src/content/texts/` (`author: "<id>"`) and its stories in `src/content/stories/`.

## Job 1: review the site path

Review the group page, and the person pages, texts and stories of its faces. Use the clarity test, fix in place, and
log every fix in `research/audits/clarity-group-<group>.md`. Run qcheck, vcheck and fmcheck on the files you change.

## Job 2: write the chapter

Write `book/src/group-<group>.txt` in the book markup.

### Shape

- `# <the group's title>` and `% <its subtitle>`.
- A short paragraph saying what joins these faces.
- Then the group's own sections as `##` headings, in the site's order.
- **A card** gets a `###` heading. It holds:
  - who the face was;
  - the face's story, told briefly with its reliability in prose;
  - one or two key passages, read as units of meaning;
  - a dispute, if there is one, with its sides, evidence, answers and where the evidence stands.
- **An entry** is one paragraph that opens with the name in the prose. It holds who the face was, the one thing they
  are remembered for, and at most one or two verses with a short explanation.

### Length

The whole faces part has about 50 pages for some 120 faces, so be brief without leaving a gap.
- A card is up to two-thirds of a page.
- An entry is 4–8 lines.
- Cut detours, repetition and secondary verses, never an argument or a piece of evidence.
- Report the pages per group.

### Do not retell

Grep `book/src/` for each face's name. Many faces already appear in the topic chapters (the Ayyam, the Muʿallaqat)
or in the poet and figure chapters. Refer to what is told there in one line, and add only what is the face's own.

### Rules

- **Sources.** Every fact and quote comes from the site with its citation. Cite only books with source cards. Cite
  Aghani as `aghani-dk`; only vols 5 and 7 may use `aghani`.
- **Footnotes.** Give the author or short title, then volume and page. Name the book on an author's first citation when
  he has several.
- **Verse footnotes.** Gloss every hard word. Put the glosses first and the sources once at the end. When the site
  lacks a gloss, add it to the verse file and log it.
- **Refined edition.** Leave out verses that are explicit about intercourse or the sexual organs, and give their
  numbers in one neutral `~` line. Never write «لا ننقلها».
- **No site devices.**
  - No grade words used as labels (ثابت، راجح، مختلف فيه، منسوب).
  - No «المرحلة», no links, no review questions.
  - Attribution goes in prose.
- **No impressions of our own.** A judgement belongs to a named critic. Weighing of evidence comes from the evidence.

### Build

```
python3 book/tools/fn-sources-last.py book/src/group-<group>.txt
python3 book/tools/render.py --out group-<group> --no-title "العصر الجاهلي · وجوه من العصر" book/src/group-<group>.txt
node book/tools/build.mjs $PWD/book group-<group> shots
```

## Final reply (under 120 words per group)

- The site fixes, counted by type, and the worst three.
- The pages.
- Anything unresolved.
