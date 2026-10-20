# المختصر المطبوع

The printed abridgement of each era. The site stays the reference; the book is a separate text written from it.

## Layout

- `src/<chapter>.txt`: chapter text in the book markup. The header of `tools/render.py` documents the markup.
- `tools/`:
  - `render.py`: markup to HTML.
  - `template.html`: page CSS.
  - `paginate.js`: fills fixed pages, with footnotes numbered per page.
  - `build.mjs`: makes the PDF, plus page PNGs when given `shots`.
  - `gen-frame.py`: makes the frame SVG.
- `assets/`: frame, cartouche, folio ornament, paper grain.
- `brief-book-tarafa.md`: the writing rules for a chapter.
- `brief-clarity.md`: the three-question clarity test.

## Build

```
python3 book/tools/render.py "العصر الجاهلي · أعلام التكوين" book/src/tarafa.txt
node book/tools/build.mjs $PWD/book shots   # -> book/out/book.pdf
```

The Amiri fonts are copied from `node_modules/@fontsource/amiri`.

## Owner decisions

- Page and type:
  - Page size 17×24 cm on antique-yellow paper, inside a symmetric frame with Arabic rosettes («شمسة») at the corners.
  - The running head sits in the frame's top band. The font is Amiri.
- Length: up to 300 pages for the Jahili era. Completeness comes first (2026-10-20).
- Hinge verses (those with «المعنى») also get the verse's rhetorical or critical point (2026-10-20).
  - It must come from a source: a critic or commentator such as al-Marzuqi, ʿAbd al-Qahir, Ibn Rashiq or Ibn Qutayba,
    or a point with its witness. Not our own impressions.
  - Two or three lines, in the same paragraph after the meaning, with no new label.
  - Take it from the site's rhetoric layer for that verse. If there is no real point, the meaning alone stands.
- Meanings are written in refined literary prose, not word-for-word glossing. Avoid words with low connotations
  (e.g. «الساقط» for one who fell in battle).
- No empty space: pages are filled to the bottom.
  - A chapter does not start a new page. It follows the previous chapter on the same page, after an ornamental
    separator (`assets/sep.svg`, made by `tools/gen-sep.py`), unless its title, subtitle and first lines do not fit
    (2026-10-20).
- Language: the site's own language.
- No site-only devices: no grade labels, no reading levels, no «المرحلة», no links.
  - Attribution is stated in prose, the way the ancients write it, and only where it matters.
- Title page: «إعداد وتلخيص: ياسر أحمد».
- No abridgement that leaves a gap or distorts (2026-10-20). A reader who finishes the book must know the era fully
  and be able to discuss it and answer objections. For every question or dispute, keep:
  - the positions and who holds them;
  - the decisive evidence for each (the key quote or verse, with its source);
  - the other side's answer;
  - where the evidence stands, said in prose.

  Cut decoration, repetition, detours and secondary examples, never arguments or evidence.
- Refined edition (2026-10-20).
  - Kept: love poetry of every kind, ʿudhri, open ghazal and tashbib, including mention of breasts and the like.
  - Left out: verses that describe intercourse or the sexual organs in explicit detail.
    - They go into a separate mujun book, made after all the eras, which will hold all such verses.
    - Where such a passage belongs to a poem's structure, one neutral bridge line says what it is about, without
      quoting it.
  - The site is unchanged and keeps its mujun section.
- A Word (.docx) version will be needed later.
- The site is reviewed through the book: while writing each chapter, the site pages it draws on get the clarity test.
  - Fixes are made in the site.
  - Each fix is logged in `research/audits/clarity-<id>.md`.
- The bibliography at the end states each book's edition once. For example: «الأغاني: طبعة دار الكتب، إلا الجزأين الخامس
  والسابع فمن طبعة دار الفكر». Footnotes then cite by author or short title, volume and page, with no edition.
