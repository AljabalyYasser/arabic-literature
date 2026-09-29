# Brief: research for a SHORT era page (research only)

Project: an Arabic-literature learning site (repo /home/user/arabic-literature, Astro). You do RESEARCH ONLY: do not edit the repo, do not commit, do not build. Write your findings, in Arabic, to the output file named in your task (inside the scratchpad `era/` folder).

Scratchpad (run tools from here): /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad

## What the page is
Each era gets one short "map" page that tells the reader: where am I, and what will I study here. It is NOT the study itself. It answers seven questions (the owner's own list):
1. ماذا حدث تاريخيًا مما أثّر في الأدب؟
2. ما الذي تغيّر في اللغة والأدب؟
3. ما الفنون التي برزت؟
4. من أهم الشعراء؟
5. من أهم الأدباء والكتّاب والنقاد؟
6. ما أهم الكتب؟
7. ما النصوص التي صنعت هذا العصر؟
The owner will write the page from your file, so give him FACTS WITH EXACT QUOTES AND PAGE REFERENCES, not prose.

## Sources (approved registry; cite ONLY these, and ONLY pages you actually opened)
Core (all eras): Shawqi Dayf, تاريخ الأدب العربي — Shamela 11996. Volume start indices: ج1 العصر الجاهلي 2 · ج2 العصر الإسلامي 429 · ج3 العباسي الأول 908 · ج4 العباسي الثاني 1478 · ج5 الدول والإمارات: الجزيرة العربية/العراق/إيران 2126 · ج6 الشام 2803 · ج7 مصر 3149 · ج8 الأندلس 3642 · ج9 ليبيا/تونس/صقلية 4182 · ج10 الجزائر/المغرب/موريتانيا/السودان 4609.
Other core books (eras 1–4 mostly): ابن قتيبة الشعر والشعراء 23785 · البيان والتبيين 10614 · الكامل 8505 · العمدة 10909 · الأغاني (search copy ketabonline 10786; record "ج/ص (pid)").
Biography/dates: وفيات الأعيان 1000 (eras 2–6) · معجم الأدباء 9788 (2–6) · الأعلام للزركلي 12286 (1–8, for death years) · تاريخ الطبري 9783 (1–4, history only).
Your era's own bundle is listed in your task.
Anything else (websites, Wikipedia, encyclopedias, poetry sites, modern books not listed) is NOT a source. If a fact you need has no approved source, do not use it: list it under «ثغرات» with the book that would support it (it goes to the candidates bank).

## Tools
- `python3 sh.py toc BOOK` · `python3 sh.py page BOOK IDX [IDX2]` · `python3 sh.py find BOOK FROM TO REGEX` (Shamela; prints volume, printed page and URL). `python3 subtoc.py BOOK` prints the nested table of contents (use it on 11996 to find chapters).
- `python3 srch.py "term" BOOKID ...` (search inside given Shamela books; wrap a phrase in double quotes inside the term for exact match).
- `python3 tsearch.py "phrase" [pages] [BOOKID...]` (Turath full-text search; book_id == Shamela id).
- Hindawi PDFs: `curl -sL -o era/<id>.pdf https://downloads.hindawi.org/books/<id>.pdf` then extract text with python `pypdf` (PdfReader). Cite «ص N من نسخة هنداوي» using the printed page if visible, else the PDF page.
- Cite Shamela as: «ضيف ج3 ص14» + the URL https://shamela.ws/book/11996/<idx>.

## Output format (Arabic), keep it compact
### 0. أين أنت؟ حدود العصر (start/end with هـ and م, what marks them) — quote + ref.
### 1. أحداث أثّرت في الأدب — 3 to 6 items: event, date (هـ/م), its effect on literature — quote + ref.
### 2. ما الذي تغيّر في اللغة والأدب — 3 to 5 items — quote + ref.
### 3. الفنون التي برزت — 4 to 6 items (fann name + one line) — quote + ref.
### 4. أهم الشعراء — 8 to 12 candidates: name (with the vowel marks the source prints, if any), death year هـ/م, one line on why he matters, a short quote showing his standing + ref. Order by importance, most important first.
### 5. أهم الأدباء والكتّاب والنقاد — 6 to 10 candidates, same format.
### 6. أهم الكتب — 6 to 10: title, author, death year, what the book is/does — quote + ref.
### 7. النصوص التي صنعت العصر — 6 to 10: the text (poem by its opening words, or khutba/risala/maqama/book chapter), author, why it defined the era, and where it can be read in an approved source (book + page) — quote + ref.
### ثغرات — what you could not support from approved sources.

Rules:
- Quotes exactly as printed, short (one or two sentences). Every item needs a quote and a page you saw.
- Prefer Dayf; use the others to confirm dates or add what Dayf lacks.
- Dates: give both هـ and م when the source gives them; if only one, say so.
- Do not judge tiers (formative/important); just rank by importance with evidence.
- Stay inside your era; mention overlaps in one line if needed.
- Be efficient: this is a map page. Aim for ~30–45 cited items in total.
