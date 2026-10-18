# Brief: batch 13 — أصحاب الواحدة (12)، شعراء هذيل (11)، ومصدران جديدان

Repo: /home/user/arabic-literature (Astro, content in Arabic). SCRATCH (tools, other briefs):
/tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad.
No git, no `npm run build` (the lead does both). Status of every file you write: `review`.
The owner asked for economy: work efficiently, no redundant re-reading; run the checks once at the end and fix.

## Read first

- `SCRATCH/brief-writers.md`: ALL its rules apply. Ignore its "formative path / survey" framing.
- `docs/content-guide.md`, `docs/alam.md`, `docs/foundation.md` §5.1, YOUR group's entry in `docs/jahili-map.md`,
  and `docs/sources.md` (register 1.0.3: cite only books with a card in `src/content/sources/`; a registered book
  without a card may get one, written like the existing cards). Al-Aghani is `aghani-dk`; Hamasa is `tabrizi-hamasa`;
  al-Mufaddaliyyat commentary is `tabrizi-ikhtiyarat`.
- Models: `src/content/groups/1/khayl.md`, `groups/1/muammarun.md` and their people files (tier face, `group`,
  `card`, `order`), texts, stories, mahfuzat.
- Before writing any card: `ls src/content/stories src/content/mahfuzat src/content/texts src/content/people` and grep.
  Never link `/people/<face-id>/` for a face: faces have no page; link `/people/groups/1/<group>/#<face-id>`.

## Depths (decided)

Face texts are free readings by default; raise to guided only for a text the map marks as raised or that is a
group's showpiece by the ancients' verdict (say why in the text body). Every text and story with its grade (§5.1) and
oldest source. Explicit verses, if any: shown and fully explained. Survey notes in `research/groups/<group>.md`.
Long poems: give the whole poem as printed in the base edition (free reading: glosses only).

## IDs (fixed, so parallel agents link correctly)

Group 12 `wahida`: `al-husayn-ibn-al-humam` (card), `al-aswad-ibn-yafur`, `suwayd-ibn-abi-kahil`,
`al-musayyab-ibn-alas`, `al-hadira`, `salama-ibn-jandal`, `al-muthaqqib`, `thalaba-ibn-suayr`.
Group 11 `hudhayl`: `abu-khirash`, `abu-kabir`, `al-mutanakhkhil` (cards), `sakhr-al-ghay`, `amr-dhu-al-kalb`.

## Assignments

**Agent 1 — group 12 page and first half.** `groups/1/wahida.md` «أصحاب الواحدة والمقلون المحكمون» (introduction: what
Ibn Sallam and Ibn Rashiq say of the poets of one poem; link ʿAntara, ʿAmr ibn Kulthum and al-Harith ibn Hilliza's
pages; list all eight faces). Faces: al-Husayn ibn al-Humam (card), al-Aswad ibn Yaʿfur, Suwayd ibn Abi Kahil
(mukhadram: `refer: ["2"]`; his «اليتيمة»), al-Musayyab ibn ʿAlas (his story «استنوق الجمل» is
`stories/istanwaqa-al-jamal.md`: add his id to its `people` and link it, don't retell). Mahfuzat orders 261–269.

**Agent 2 — group 12 second half.** Entries (tier face, `group: "wahida"`, `card: false`, order per the map), each with
its Mufaddaliyya per the map: al-Hadira (and Hassan's testimony), Salama ibn Jandal, al-Muthaqqib al-ʿAbdi (and Abu
ʿAmr's verdict), Thaʿlaba ibn Suʿayr (and al-Asmaʿi on Labid: link `/people/labid/`). Do not write `groups/1/wahida.md`
(Agent 1 does). Mahfuzat orders 271–279.

**Agent 3 — group 11 `hudhayl` «شعراء هذيل».** The map says: not before collating the texts with al-Sukkari's «شرح
أشعار الهذليين» (registered أساسي, archive.org `3816pdf`): write its card `sukkari-hudhaliyyin` and use it as the base
text; «ديوان الهذليين» (Shamela 17904) is for consultation only. The group page `groups/1/hudhayl.md` (Hudhayl and its
poets, the Sukkari collection) and all five faces. Abu Khirash is mukhadram (`refer: ["2"]`, his death in his card);
Abu Kabir's story with his stepson links `/people/taabbata-sharran/`. Mahfuzat orders 281–289.

**Agent 4 (starts later) — two sources.** (a) Card `yaqut-buldan` for «معجم البلدان» (registered أساسي: Dar Sadir, 2nd
ed., 1995, 7 vols, Shamela 23735). (b) Tufayl al-Ghanawi's diwan (not yet registered; the owner approved adding it):
find an edited, page-citable copy (Shamela id or archive.org item), check editor, publisher and year on the title
page, write the card `diwan-tufayl` and a short registry entry in Arabic in the style of docs/sources.md §5 to
`SCRATCH/b13-registry-diwan-tufayl.md`. (c) Apply them: collate `texts/jaza-allahu-jafaran.md` and the
`people/tufayl-al-ghanawi.md` entry with the diwan (readings, verse count, cite it); and in the batch-12 texts
(`groups/1/awail`, `muammarun`, `khayl` texts) explain from Yaqut the place names that were left unexplained (glosses
only, cited). Do not edit `docs/sources.md` (the lead does).

## Checks (once, at the end; fix until clean)

`python3 meter.py <verse files>`, `python3 qcheck.py <files>`, `python3 vcheck.py text <text ids>` and
`python3 vcheck.py file <other files>`. Text ids must be unique: `ls src/content/texts` right before naming one.

## Final reply

Under 200 words: files written (counts), checks and results, anything unresolved, any book you needed that has no card.
