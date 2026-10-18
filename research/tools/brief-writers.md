# Brief: writing texts and verses for a formative path

You write content files for the Arabic-literature site in /home/user/arabic-literature (Astro; all content in
Arabic). The path you write for has an approved survey in `research/paths/<poet>.md`: it is your plan. Follow its
decisions (base text, numbering, readings adopted, depths, which verses are fully explained, grades). If you find
the survey wrong on a fact, follow the evidence, and record the correction in your final reply (not in the survey).

## Hard rules

- Write ONLY the files your assignment lists. Do not edit any other file (not the survey, not sources, not people,
  not chapters). If you need a source card or a person that does not exist, say so in your final reply and use the
  closest existing card meanwhile only if it is the same book; otherwise leave the citation out.
- No git commands. No `npm run build` (the lead runs it). Validate with the scripts below.
- Cite only books with a card in `src/content/sources/` (the source registry is locked). Ids: ls that folder.
  Al-Aghani: new citations to `aghani-dk` (Dar al-Kutub edition, via dk.py), never the Dar al-Fikr `aghani`.
  Al-Hamasa: `tabrizi-hamasa`, text above the footnote line only; never `marzuqi-hamasa`.
  Modern editors' footnotes are the editor's opinion: attribute them («يقول المحقق…»), never as the old author.
- Quotes are verbatim as printed, with the page you saw. Opinions are attributed in the text to their owner.
- Status of every file you write: `review`.
- Never omit a verse for explicitness (see «Explicit and erotic verses» below).

## Read first (in this order)

1. `docs/content-guide.md` — all of it. It is the format spec (verses, reading depths, texts, vocalization,
   clarity rules, the "ago" markers, YAML pitfalls).
2. `docs/foundation.md` §5.1 (grades) and §6.3–6.4.
3. Your survey `research/paths/<poet>.md`.
4. Models — read them closely and match their density and tone:
   - Deep text and fully explained verses: `src/content/texts/li-khawla-atlal.md`, and
     `src/content/verses/li-khawla-atlal/001.yaml` … `010.yaml` (also look at two or three from 040–060).
   - Guided text: `src/content/texts/ashawta.md` and its verses (`verses/ashawta/001.yaml` explained,
     `002.yaml` unexplained).
   - Free text: `src/content/texts/inna-imraan.md` and its verses.
   - Texts read in a life stage: `src/content/texts/ma-tanzuruna.md`, `ala-itazilini.md`.

## Quality bar for an explained verse (every verse of a deep reading; the chosen verses of a guided one)

All layers, in this order of importance: `meaning`, `vocabulary`, `context` (its function in the poem),
`syntax`, `morphology`, `rhetoric` (`thesis`, `devices` each naming the word or phrase of the verse it is in,
`connection` to the next verse), `prosody` (`meter`, `rhyme`, `scansion` — syllables then feet for both
hemistichs — and `note` for any zihaf/ʿilla), `variants` (readings, with who gives them), `sources` (each with
`loc` and `url`). Ground the commentary in the old commentators of that text (for the seven long odes Ibn
al-Anbari first, then al-Zawzani; for the diwans the old commentary inside them, i.e. al-Tusi for Labid and the
commentary ascribed to Thaʿlab for al-Khansa), then Lisan al-ʿArab for words, then the critics who discuss the
verse (Ibn Rashiq, Ibn Qutayba, al-Marzubani's Muwashshah, al-ʿAskari, Qudama, al-Baghdadi's Khizana). For
rhetoric: where a device is one ʿAbd al-Qahir al-Jurjani theorises (tashbih vs tamthil, istiʿara, kinaya, hadhf,
taqdim/taʾkhir, nazm), frame it in his terms and cite `dalail` or `asrar` where he treats a comparable case. Never
invent an old author's view; if no old source discusses a point, it is our reading and carries no citation.
Explain every term at its first use in the file. Vocalize every verse, every quoted hemistich and every variant
fully; vocalize names of people, tribes, places and books in prose.

## Explicit and erotic verses (owner's decisions 2026-10-08)

No verse is left out for explicitness: explicit verses are shown, and every explicit or erotic verse is FULLY explained
whatever the reading depth. Say plainly what happens and what each word means, in clear modern Arabic a reader
understands at once (name the act or body part plainly where the verse does; no bare euphemism). Quote the old
commentators where they exist; where they are silent, vague or euphemistic, add our own clear explanation without a
citation. «لا حياء في العلم». Scholarly register, never vulgar. `omit` is only for verses missing from the source text.

## Unexplained verse (explained: false) in guided and free readings

`first`, `second`, `vocabulary` (only the words a cultivated non-specialist would not understand; each gloss from
the diwan's old commentary or Lisan, cited), `sources` (the page of the poem in its base edition, plus every
source a gloss uses), `status: review`. Nothing else.

## Text file

Front matter as in the models: `title` (the incipit), `author`, `kind`, `form`, `reading`, `omit` if any,
`attribution` (`grade` and a `note` that states the reason and the oldest source — from the survey), `meter`,
`rhyme`, `occasion`, `thesis`, `movement`, `map` (sections: range, title, one-line text), `edition` (the base
text: source, loc, url, and a note on its verse count and numbering), `sources`. Body: a few short paragraphs
like the models (what the poem is, its occasion with the story's grade, what the ancients said of it, textual
notes such as adopted readings or verses others give to another poet).

## Citing the diwan scans

- `diwan-labid` (Ihsan Abbas): loc «ص297»; url `https://archive.org/details/3929pdf/page/n{LEAF}/mode/1up`
  with LEAF = printed page + 45 (the introduction: LEAF = page + 1).
- `diwan-khansa` (Abu Suwaylim): loc «ص377»; url `https://archive.org/details/3318pdf_202001/page/n{LEAF}/mode/1up`
  with LEAF = printed page − 1. In prose call its commentary «الشرح المنسوب إلى ثَعْلَب».
- `diwan-zuhayr` (Qabawa, al-Aʿlam's recension): loc «ص8»; url `https://archive.org/details/3917pdf/page/n{LEAF}/mode/1up`
  with LEAF = printed page. Only part one (poems 1–20, pp. 5–197) is al-Aʿlam's; call its commentary «شرح الأعلم».
- `sharh-thalab-zuhayr` (Qabawa 2008): url `https://archive.org/details/3918pdf/page/n{LEAF}/mode/1up`, LEAF = page − 1;
  call it «الشرح المنسوب إلى ثَعْلَب». diwan.py keys: `zuhayr`, `thalab` (and `thalab44` for the 1944 printing).
- `diwan-nabigha` (Abu al-Fadl Ibrahim): url `https://archive.org/details/3409pdf_202001/page/n{LEAF}/mode/1up`,
  LEAF = printed page − 1; part one (poems 1–22, pp. 9–122) is al-Aʿlam's. diwan.py key `nabigha`.
- `diwan-antara` (Mawlawi): url `https://archive.org/details/3562pdf/page/n{LEAF}/mode/1up`; the leaf–page offset VARIES and
  some leaves are out of order — always find the leaf whose image shows the printed page you cite. diwan.py key `antara`.
- Shamela books: url `https://shamela.ws/book/{ID}/{IDX}` (IDX from `sh.py page`, which prints volume and printed
  page for each index).

## Tools (scratchpad: /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad; run from there)

- `python3 diwan.py img BOOK LEAF` then open the .jpg with the Read tool: the ONLY reliable way to read verse text
  and commentary from the diwan scans (OCR garbles vocalized verse). `diwan.py find/page/leaf` for OCR search.
- `python3 sh.py page ID IDX [IDX2]`, `sh.py find ID FROM TO REGEX`, `sh.py toc ID`; `python3 srch.py "term" [ID]`.
  Shamela ids are in qcheck.py's BOOKS dict (ibn-al-anbari 124335, zawzani 11253, lisan 1687, dalail 12055,
  asrar 8187, ibn-rashiq 10909, ibn-qutayba 23785, kamil 8505, khizana 12732, muwashshah 9427, sinaatayn 23787,
  naqd-al-shir 28181, atiq 11298 for prosody, tabrizi-hamasa 6907, qali 9160, sibawayh 23018, jamhara 1487,
  wahshiyyat 36082, ibn-sallam 6738, deif 11996).
- `python3 dk.py find VOL WORD…` / `dk.py leaf VOL N` / `dk.py img VOL N OUT.jpg` — al-Aghani, Dar al-Kutub.
- `python3 meter.py FILES…` — scans every verse file against its text's `meter`; fix the vocalization until every
  line passes (a genuine licence the old sources note goes in `prosody.note` / the text body).
- `python3 qcheck.py FILES…` — checks that each «quote» is on the cited Shamela page.
- `python3 vcheck.py text TEXT_ID…` — the build's structural checks (fields, numbering, source ids).
Run meter.py, qcheck.py and vcheck.py on everything you wrote until clean (qcheck NOCACHE for scan-based
sources is expected).

## Final reply

Under 250 words (English fine): files written, counts (explained / unexplained), checks run and their result,
anything you could not resolve, corrections to the survey, and any source card or person you needed but lacked.
