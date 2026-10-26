# Brief: era 2, batch 2: the paths of Hassan, Kaʿb ibn Zuhayr and al-Hutayʾa

Repo: /home/user/arabic-literature (Astro; content in Arabic). No git and no `npm run build`: the lead does both.
Every file you write has status `review`. Work economically: read what you need, and run the checks once at the end.

## Read first

- `research/tools/brief-writers.md`: **all its rules apply.** It is the brief that wrote the Jahili formative paths:
  quality bar, explained verses, explicit verses, text files, citing scans, tools.
- `docs/content-guide.md`, `docs/alam.md`, and `docs/foundation.md` §5.1 and §7.
- `docs/islami-map.md`, especially section «عاشرًا», the place of religion.
  - Quote a Qurʾanic verse exactly, with sura and verse number.
  - Quote a hadith in its wording, with the muhaddithin's own judgement. A hadith never gets one of our grades.
  - No tafsir, fiqh, creed, or judgement of anyone's faith.
- `research/topics/shir-al-sira.md`: **the grading rule for every text of this era.** Apply it, and cite Ibn
  Hisham's note where there is one.
- Your path's survey in `research/paths/`. It is approved: follow its plan, stages, texts, depths and grades.
- The model: Labid's path:
  - `src/content/people/labid.md`;
  - `src/content/chapters/labid/*.mdx`;
  - its texts, verses, stories and mahfuzat (grep `labid`).

## Sources

- Cite only books with a card in `src/content/sources/`. Al-Aghani is `aghani-dk`; Ibn Hisham is `ibn-hisham`.
- **Your diwan's card.** Write it like the existing cards, from the edition your survey settled:
  - `diwan-hassan`: ʿArafat;
  - `diwan-kaab`: al-Sukkari, Dar al-Kutub 1950;
  - `diwan-hutayah`: Nuʿman Taha, al-Halabi 1958.

  Also write a short register entry in Arabic, in the style of `docs/sources.md`, to
  `research/islami/registry-<id>.md`. Do not edit `docs/sources.md`; the lead does.
- The other new books the owner approved can get a card when you first cite them: al-Bukhari, Muslim, Ibn Saʿd, and
  al-Baqillani. Their entries go into the same registry file.
- Do not cite «الاستيعاب», «ميزان الاعتدال» or «الروض الأنف». They are not approved yet.

## IDs (fixed, so the three agents link correctly)

| Path | Person | Chapters | Mahfuzat orders |
|---|---|---|---|
| Hassan | `hassan` | `src/content/chapters/hassan/` | 401–419 |
| Kaʿb ibn Zuhayr | `kaab-ibn-zuhayr` | `src/content/chapters/kaab-ibn-zuhayr/` | 421–439 |
| al-Hutayʾa | `al-hutayah` | `src/content/chapters/al-hutayah/` | 441–459 |

- People: `part: "2"`, `tier: formative`.
- A mukhadram whose Jahili material the Jahili era refers to gets `refer: ["1"]`. This is Hassan.
- Link the other two paths by the ids above. Link Jahili people by their existing ids, for example
  `/people/zuhayr/` for Kaʿb's father, and `/people/al-nabigha/` for the judgement at ʿUkaz.
- Before writing a story, grep `src/content/stories` so you do not duplicate one.
- Do not edit `src/content/parts/2.yaml`. The lead adds your path to it.

## Assignments

1. **Agent 1: Hassan.** The whole path, per `research/paths/hassan.md`:
   - the hamziyya read in depth, in two stages;
   - the guided and free texts;
   - the stories, and the section «ما نُسب إليه وليس له».
   - Its Jahili stage is the part the Jahili era will refer to.
2. **Agent 2: Kaʿb ibn Zuhayr.** The whole path, per `research/paths/kaab-ibn-zuhayr.md`:
   - «بانت سعاد» read in depth over two stages: every verse explained, with the 7 verses not from Ibn Ishaq marked;
   - the burda story, graded «منسوب», with its evidence.
3. **Agent 3: al-Hutayʾa.** The whole path, per `research/paths/al-hutayah.md`:
   - the siniyya read in depth;
   - the stories of al-Zibriqan, ʿUmar's prison and Hassan's judgement.
   - Link Hassan's path for that judgement; do not retell it if Hassan's path tells it.
   - «وطاوي ثلاث» and ʿUmar's purchase are «منسوب».

## Checks

Run qcheck, vcheck and fmcheck from `research/tools/` on every file you wrote.

## Final reply (under 150 words)

- The files you wrote, with counts: stages, texts, verses explained, stories.
- Anything left open.
