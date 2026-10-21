# Brief: candidates for «ملاذ القصيد» from the Jahili era

Repo: /home/user/arabic-literature. No git; the lead commits. Read the section «Later books» in `book/README.md` first:
it gives the owner's plan for the anthology.

## The task

Survey the Jahili material and write the list of candidate passages in `book/malath/jahili.md`, in Arabic, for the
owner to choose from. This is a selection list, not the book: do not write commentary.

Where to look:
- The book's chapters in `book/src/*.txt`. They hold the poems with their glosses, critics' remarks and stories.
- The site, for poems the book leaves out or only mentions: `src/content/texts/*.md`, their verses in
  `src/content/verses/<text-id>/`, and `src/content/stories/`. Grep, do not read everything.

What qualifies:
- Love poetry, poems of parting and longing, and elegies.
- A poem that has a famous story told about it, such as al-Muraqqish and Asmaʾ, or Durayd and his brother.
- A beautiful opening or passage inside a poem that is not a love poem: a love prelude, the ruins, the departing
  women's litters.
- No satire, no praise, no boasting, war or wisdom, except a passage of the kinds above inside such a poem.
- No verse that is explicit about intercourse.

## Each entry

One entry per passage. Each entry is a heading with the poet and the poem's first hemistich, then short lines for:
- **the verses:** their numbers in the site's recension, and how many there are;
- **the kind:** غزل, فراق, رثاء, قصة or مطلع;
- **why:** one line, for example the critics' remark the site gives on it, or the story behind it, or that it is a famous
  verse;
- **where:** the book chapter and the site's text id;
- **الشرح:** whether the site already explains the passage's hard verses, and where; «يحتاج شرحًا جديدًا» if not;
- **a mark:** ★ for your strongest picks.

Group the entries by poet, in the book's order: the formative poets, then the figures, then the faces.

## Size

The anthology is about 300 pages for all eight eras. Mark with ★ about 35–40 pages' worth for the Jahili era, at
about 8 verses a page, since the anthology explains the verses that need it. List more than that, up to about 70 pages, so the owner has a choice.

At the top of the file:
- one paragraph on how the list is built;
- the totals: the number of entries, the number of verses, and the pages for the ★ picks and for the whole list.

## Final reply (under 120 words)

- The number of entries and verses.
- The pages for the ★ picks and for the whole list.
- The five strongest picks.
