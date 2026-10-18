# Brief: «يُنسب إليه وليس له» — verses people circulate under a Jahili poet's name that are not his

The owner approved a new fixed element on every poet's page: verses that readers meet under the poet's name (social
media, quote sites, school memory, TV series, the folk siras) but that his diwan and the ancient sources do not give
him. It complements the fame rule (famous genuine pieces are read in full). Your job: find these verses for the poets
assigned to you, prove each case from approved books, and write the entries. Work in the repo
/home/user/arabic-literature. No git. Edit nothing outside the files named below.

Read first: docs/foundation.md §5.1 (grades) and §6.4; docs/sources.md (the registry; cite ONLY books that have a card
in src/content/sources); the poet's survey in research/paths/ (what was already decided about doubtful pieces); the
schema `nahl` in src/content.config.ts and labels `nahlVerdicts` in src/lib/labels.ts.

## What counts as an entry

1. **Circulation (popular, real).** The verse or short piece is widely attributed to the poet today. Evidence: at least
   two independent popular pages (quote sites, forums, articles, «أشهر أبيات X» lists, social posts) found with web
   search. Record their URLs in the research file only; they never appear on the site. Search with phrases like
   «أبيات عنترة بن شداد»، «أشهر أبيات امرئ القيس»، «قصيدة … لعنترة»، «ينسب لعنترة»، «ليس لعنترة»، «منحول».
   Pick the most widespread ones; quality over number. Maximum 5 per poet. Zero is a valid result.
2. **Not his (proved).** The verse is absent from the poet's diwan in the registry edition, and absent (as his) from
   the ancient witnesses. Absence must be checked properly:
   - Diwans on archive.org (antara, zuhayr, nabigha, labid, khansa, asha1/asha2): OCR is unreliable for absence.
     Read the diwan's rhyme index (فهرس القوافي / فهرس المطالع) from page IMAGES (`diwan.py img`), or read the pages of
     the poem with that rhyme and meter. Also read the editor's sections on doubtful or appended poetry (e.g. Mawlawi on
     poetry of Sirat ʿAntar; the «ملحق» or «ما نُسب إليه» sections) and record what the editor says, attributed to him.
   - Diwans as Shamela text (imru-al-qais 27112, tarafa 36422): `sh.py find`.
   - Ancient witnesses (Shamela search with distinctive words): Aghani (`dk.py`), Ibn Qutayba 23785, Ibn Sallam 6738,
     Tabrizi's Hamasa 6907, Mufaddaliyyat, Asmaʿiyyat, Jamhara, Khizana 12732, ʿIqd 23789, Kamil 8505, Qali 9160,
     ʿUmda 10909, Yatima 6743, Wafayat 1000, Nafh 1002, and al-Zawzani / Ibn al-Anbari / al-Tabrizi on the Muʿallaqat.
3. **Owner.** If an approved book gives the verse to another poet, the verdict is `ghayruh` with `owner` and the exact
   reference. If no approved book carries it at all, the verdict is `la-asl`. If it appears only in a late source
   without isnad (a late anthology, the folk sira cited by an approved book), the verdict is `mansub`. Never name an
   owner from a non-approved book or from memory; if you strongly suspect an owner you cannot source, say so in the
   research file, not on the site.
4. **Not already on the site.** If the piece is already a text or quoted verse on the site with a grade (grep
   src/content for its key words), it is not an entry; note it in the research file.

## Output

A. `research/nahl/<person-id>.md` (Arabic, internal): per candidate — the verse as circulated; circulation URLs;
   where you looked for it (book, volume, page or index page) and what you found; verdict and why; and candidates you
   rejected with the reason. Dense, evidence only.

B. One YAML per entry: `src/content/nahl/<person-id>-<slug>.yaml`, `status: "review"`:

```yaml
person: "antara"
order: 1
lines:
  - first: "سَيَذكُرُني قَومي إِذا الخَيلُ أَقبَلَت"
    second: "وَفي اللَيلَةِ الظَلماءِ يُفتَقَدُ البَدرُ"
verdict: "la-asl"          # ghayruh | la-asl | mansub
owner: "أبو فِراس الحَمْدانيّ"   # only with ghayruh, and only from an approved book
text: "ليس في ديوانه برواية الأعلم ولا في الملحق … [@diwan-antara، ص…]. ويُروى … [@yatima، ج1 ص…]."
sources:
  - source: "diwan-antara"
    loc: "ص…"
    url: "https://archive.org/details/3562pdf/page/n…"
    note: "فهرس القوافي: لا شيء على هذا الوزن والقافية."
status: "review"
```

- `lines`: the text as it circulates, with light tashkeel where needed for reading. Up to 4 lines; for a longer
  piece give its most quoted lines.
- `text`: 2–4 short sentences in clear Arabic: where it is not (diwan, sources), where it is (owner and place) or what
  its oldest source is, and, when useful, why it cannot be his (language, metre, anachronism) attributed to whoever says
  so. Names with tashkeel at first mention. Citations in the site format `[@source-id، ج1 ص23]`. No mention of X, the
  owner's archive, or web pages. Neutral tone.
- `sources`: every book cited in `text`, with `loc`, `url` to the exact page when you have it, and a short `note`.

Quote words from a source exactly as printed, inside «». Do not invent page numbers: only pages you saw.

## Tools (scratchpad /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad)

`srch.py "phrase" BOOKID…`, `sh.py page/find/toc`, `dk.py find VOL WORD…` / `dk.py img VOL N OUT.jpg` (Aghani),
`diwan.py find/page/img/map BOOK …` (read images with the Read tool), WebSearch and WebFetch for circulation.

## Final reply

Under 200 words: per poet, entries written (incipit + verdict), and candidates rejected in one line each.
