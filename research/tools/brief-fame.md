# Brief: audit of famous poems against what the site reads

The owner found that ʿAmr ibn Maʿdikarib's card reads «أمن ريحانة» but never mentions his piece «ليس الجمال بمئزر /
فاعلم وإن رُدّيت بُردا» (Abu Tammam's Hamasa, al-Tabrizi ج1 ص50). The fear: other poets' best-known works were missed
too. Your job is to find every such gap for the poets assigned to you. REPORT ONLY: write one file
`research/audits/fame-<name>.md` (Arabic, internal) and edit nothing else. No git.

## Method (per poet)

1. Gather the poet's pieces from these FAME WITNESSES (all approved; ids are source cards in src/content/sources):
   - Abu Tammam's Hamasa: `tabrizi-hamasa` (Shamela 6907) — every piece ascribed to the poet. Never cite al-Marzuqi.
   - `mufaddaliyyat`, `asmaiyyat`, `jamhara` — every piece by the poet.
   - Ibn Qutayba's entry on the poet (`ibn-qutayba`, Shamela 23785): what he singles out («ومما يستجاد له»، «أحسن»،
     «سبق إليه»، «يتمثل به»).
   - Ibn Sallam's entry (`ibn-sallam`, 6738).
   - al-Aghani entry (`aghani-dk` via dk.py): the poems it sings (أصوات) and those tied to its stories.
   - Ibn Rashiq (`ibn-rashiq`, 10909), al-Jahiz (`bayan`), al-Mubarrad (`kamil`, 8505), al-Qali (`qali`, 9160):
     verses or poems named as the best, the most famous, or proverbial.
   - Shawqi Dayf's chapter (`deif`, 11996): the poems he treats as the poet's best.
   For a formative poet with a diwan in the registry, also check the diwan's own order only to identify pieces.
2. A piece is FAMOUS if (a) two or more independent witnesses carry it (copies of one origin count once), or
   (b) an ancient critic singles it out as best/most famous/proverbial, or (c) a single verse of it became a proverb
   or a standard quotation. Note which test it meets.
3. Check the site: is the piece read in full (`src/content/texts/*.md` with `author:` the poet), quoted in part
   (grep its incipit and key words in `src/content/`), or absent? Use several spellings (with and without tashkeel).
4. Recommend for each famous piece that is not read in full: add as full text (free or guided, with grade), add as a
   quoted verse with `<Bayt>` in a named chapter/card, or leave out — with the reason (e.g. attribution rejected by an
   ancient critic; explicit; duplicate of a text already read). Apply docs/foundation.md §5.1 grades literally.

## Output file

Per poet: a short table (piece incipit · length · witnesses with exact loc · test met · site status with the file ·
recommendation), then a 2–3 line verdict. End the file with a GAPS list: only the recommended additions, each with
poet, piece, depth, grade, where it goes. Dense, evidence only. Read `docs/foundation.md` §5.1 and §6.4 first, and the
poet's survey in `research/paths/` or `research/groups/` to see what was decided and why (a piece the survey already
rejected with a reason is not a gap unless the reason is wrong).

## Tools (scratchpad /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad)

`srch.py "phrase" BOOKID…` (Shamela full-text search; short distinctive words work best), `sh.py page ID IDX`,
`sh.py find ID FROM TO REGEX`, `sh.py toc ID`, `dk.py find VOL WORD…` / `dk.py img VOL N OUT.jpg` (Aghani),
`diwan.py find/page/img BOOK …`. Exact references only (volume and printed page you saw).

## Final reply

Under 250 words: per poet, the number of famous pieces found and how many are gaps; the GAPS list in one line each.
