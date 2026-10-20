# Brief: the printed abridgement — Tarafa's chapter (sample)

The owner wants a printed abridgement («مختصر») of the Jahili era: the whole era in ≤300 pages, drawn from the site
(/home/user/arabic-literature, Astro; content in `src/content/`). This task: write **Tarafa ibn al-ʿAbd's chapter**,
which must fit in **7 printed pages** (about 2,300–2,500 words in all, counting verses and footnotes). Do not edit the
repo; write only the output file below.

## Language and rules (owner's decisions)

- **Same language as the site**: reuse the site's own sentences, condensed. Do not invent claims; every fact and quote
  comes from the site's text, with the site's citation. Names with tashkeel as on the site.
- **No site-only devices**: no «درجة النص», no grade words as labels (ثابت/راجح/منسوب), no «قراءة موجهة», no «المرحلة»,
  no «في الموقع», no links, no review questions. A book in the classical manner.
- **Attribution in prose, as the ancients write it**, only where it matters: disputed → «وفي نسبتها خلاف: …»; weakly
  attributed → «ويُنسب إليه ولا يصح» / «ويروونه بلا إسناد»; legendary story → «ويروون أن…» with a short note of doubt.
  Sound attribution → say nothing.
- **Verses**: from long poems take only the matlaʿ, the hinge verses and the famous ones; join them with one-line
  bridges that keep the poem's structure («ثم يصف ناقته في نحو ثلاثين بيتًا…»). Key verses get «المعنى» (2–3 lines,
  from the site's meaning layer). Other selected verses get only their hard words glossed in a footnote.
- **Footnotes**: sources and glosses. First citation of a book: author, short title, vol/page («ابن قُتَيْبة، الشعر والشعراء،
  ج1 ص185.»); later: author and page («ابن قُتَيْبة، ج1 ص185.»). Glosses: «الحُدوج: مراكب النساء.» and the source.

## Read

`src/content/chapters/tarafa/*.mdx` (hayatuhu, al-muallaqa-1, al-muallaqa-2, al-qasida-al-thaniya), `src/content/people/tarafa.md`,
the texts with `author: "tarafa"` and their verse files (`src/content/verses/<text>/NNN.yaml`: `first`, `second`, `meaning`,
`vocabulary`), `stories/sahifat-al-mutalammis.md`, `stories/maqtal-tarafa.md`, `src/content/nahl/` entries for tarafa,
`src/content/sources/*.yaml` for book titles.

## Plan (adjust to fit 7 pages)

1. Title «طَرَفَة بن العَبْد», subtitle line (e.g. «الغلام القتيل»).
2. His life (~550 words): name and lineage, the family of poets, Labid's «الغلام القتيل», his youth and his satire,
   the letter of al-Mutalammis and his death — the two stories told briefly with their attribution in prose.
3. The Muʿallaqa (~1,250 words): what the ancients said of it, recension and count; then sections: الأطلال والظعائن;
   الناقة (a bridge for the 30-verse description + 3–4 verses); نفسه ولذّاته والموت (the famous verses: «ألا أيهذا اللائمي…»,
   «فإن كنت لا تستطيع دفع منيتي…», «أرى الموت يعتام الكرام…», «وظلم ذوي القربى…», «ستبدي لك الأيام…» — check each is in the
   site's text and use its reading).
4. Other poems (~300 words): two or three famous pieces or verses (e.g. the «آدب» verse «نحن في المشتاة ندعو الجفلى»), and
   in one or two lines what is attributed to him and is not his, if the site's nahl entries say so.

## Output format (write exactly this markup, UTF-8) — `SCRATCH/book/src/tarafa.txt`

```
# طَرَفَة بن العَبْد
% الغلام القتيل
## حياته
Paragraph text on one line, with inline footnotes like this^[ابن سَلّام، طبقات فحول الشعراء، ج1 ص137.] and more text.
## المعلقة
@ 1 | لِخَوْلَةَ أَطْلَالٌ بِبُرْقَةِ ثَهْمَدِ | تَلُوحُ كَبَاقِي الْوَشْمِ فِي ظَاهِرِ الْيَدِ
= Meaning text (rendered after «المعنى:»), with footnotes^[…].
~ A one-line bridge.
@ 3 | first hemistich | second hemistich ^[gloss footnote for the verse]
```

One line = one block. `@ N` is the verse's number in its poem (Latin digits; the renderer converts). A footnote on a
verse goes at the end of its line. `###` for a sub-heading inside a section if needed. SCRATCH is
/tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad.

## Final reply

Under 120 words: word count, sections, anything you could not source from the site.
