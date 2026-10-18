# Handoff: batch 13 paused (2026-10-18)

The session was paused to save credits. Everything written so far is committed on `claude/sweet-wright-tn1e7j`; main is at e1a1352 (batch 12).

- **Batch 13 brief:** `brief-batch13.md`. It needs the other briefs, `brief-writers.md` and the rest; these copies stand in for the scratchpad originals.
- **Group 12 `wahida`, first half:** done. This covers the page, al-Husayn, al-Aswad, Suwayd and al-Musayyab.
- **Group 12 `wahida`, second half:** stopped mid-work. The people files exist for al-Hadira, Salama, al-Muthaqqib and Thaʿlaba. Their texts, verses and mahfuzat (271–279) still need checking and completing.
- **Group 11 `hudhayl`:** stopped mid-work. The page, the five people files and the `sukkari-hudhaliyyin` card exist. The texts and verses are incomplete; the agent was about to generate the unexplained verse files. Mahfuzat 281–289.
- **Sources:** stopped before any card was written. Still to do:
  - the `yaqut-buldan` card;
  - Tufayl's diwan card and registry entry;
  - collating Tufayl's text with the diwan;
  - Yaqut glosses for place names.
- **Before merging:**
  1. Run `vcheck`, `meter` and `qcheck` on the new files.
  2. Run `npm run build` and `fmcheck.py`.
  3. Run the full link check: `check13.mjs`, against `python3 -m http.server 4321 --directory dist`.
  4. Update `docs/jahili-map.md` for groups 11 and 12.
  5. Add an updates entry.
  6. Add the Tufayl entry to `docs/sources.md` as v1.0.4.
- **Remaining Jahili work after batch 13:** al-Nathr al-Jahili with groups 2 and 13, then the intihal question.
