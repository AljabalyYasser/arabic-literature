# Brief: new survey of the Jahili era — «وجوه من العصر» (research only)

Project: an Arabic literature learning site (repo /home/user/arabic-literature, Astro). The owner reviews in Arabic. You do RESEARCH ONLY: do not edit the repo, do not commit, do not build. Write your findings to the output file named in your task, in Arabic.

Scratchpad (run tools from here): /tmp/claude-0/-home-user-arabic-literature/d9d10ed4-7204-570a-a479-b8ff89867390/scratchpad

## The question
«من بقيت له قصة أو قصيدة أو بيت لا ينبغي لطالب الأدب أن يمر بالعصر الجاهلي دون أن يعرفه؟»

A person enters «وجوه من العصر» if ANY ONE of these holds (name which, by number):
1. a famous surviving poem;
2. a verse that became a proverb;
3. poetry tied to a famous story;
4. represents a phenomenon of the era (صعلكة، فروسية، أيام العرب، الحكمة، التعمير، الرثاء، العشق، شعر الحيرة والملوك، الحنفاء، الخطابة...);
5. an old anthology preserved a valuable text of theirs;
6. a famous literary report (خبر أدبي مشهور).
No bare names: every entry must carry its story, its text, or its report. «لا أريد اسمًا مجردًا إلا عند الضرورة القصوى».

Already placed (do not re-survey; only note if a source you read adds something important about them):
- أعلام التكوين: امرؤ القيس، زهير، النابغة، الأعشى، طرفة، عنترة، لبيد، الخنساء.
- أعلام مهمون: أوس بن حجر، المهلهل، أمية بن أبي الصلت، عمرو بن كلثوم، الحارث بن حلزة، عبيد بن الأبرص، علقمة، عدي بن زيد، بشر بن أبي خازم، دريد بن الصمة، الشنفرى، تأبط شرًّا، عروة بن الورد.
- سياق: حاتم الطائي، السموأل.

Prior work to read FIRST (so you extend it, not repeat it): jahili-survey.md (65 entries, with sources) and covered-poets-inventory.md in the scratchpad. For every person you report, say whether he is NEW, or already «في jahili-survey.md رقم N» (then add only what is new: a better/older source, a correction, a grade change).

## Sources (approved registry 1.0 — cite only these, and only pages you actually saw)
Shamela ids: ابن سلام 6738 · الشعر والشعراء 23785 · المفضليات 6904 · الأصمعيات 6905 · الوحشيات 36082 · حماسة البحتري 148535 · جمهرة أشعار العرب 1487 · شرح المرزوقي (search copy only) 26536 · شرح التبريزي للحماسة 6907 · البيان والتبيين 10614 · الكامل 8505 · أمالي القالي 9160 · العقد 23789 · خزانة الأدب 12732 · شرح شواهد المغني 17724 · مجمع الأمثال 12929 · جمهرة الأمثال 6897 · المعمرون 671 · شرح النقائض 13609 · معجم الشعراء 26552 · المؤتلف والمختلف 10913 · العمدة 10909 · شوقي ضيف 11996 · ناصر الدين الأسد 2055 · جواد علي 7299 · الموشح 9427.
Candidates bank (may be READ for discovery, and reported, but mark them «من بنك المرشحات»): أمثال العرب للضبي 1034 · منتهى الطلب 732 · مختارات ابن الشجري 740 · حماسة الخالديين 10806 · المحبر 12205 · مصارع العشاق 26549 · الأمثال لأبي عبيد 135.
Aghani: working copy ketabonline 10786 (Dar al-Fikr). Record «ج/ص (pid)». (The project's reference edition is Dar al-Kutub; page mapping comes later — just record the Dar al-Fikr locus.)

## Tools
- `python3 sh.py page BOOK IDX [IDX2]` · `python3 sh.py toc BOOK` · `python3 sh.py find BOOK FROM TO REGEX` (Shamela; prints volume/printed page/url).
- `python3 srch.py "term" BOOKID ...` (Shamela search inside given books; wrap a phrase in double quotes inside the term for exact match, e.g. '"فذهبت مثلا"').
- `python3 tsearch.py "phrase" [pages] [BOOKID...]` (Turath: search all Shamela books at once; book_id == Shamela id).
- `python3 ko.py page PID [PID2]`, `python3 kos.py "term" [maxpages]` (Aghani, Dar al-Fikr).
- Existing TOCs: toc-6904.txt (Mufaddaliyyat), toc-6905.txt (Asma'iyyat).

## Output format (one block per person), in Arabic
#### N. الاسم (بالتشكيل على الاسم) — [جديد | في jahili-survey رقم N]
- **المعيار:** رقم أو أكثر من الستة.
- **لماذا نذكره:** سطر أو سطران.
- **قصته أو خبره:** مختصر، مع المصدر والجزء والصفحة (ورابط الصفحة).
- **ما بقي منه:** النص وأين هو كاملًا (الكتاب، رقم القصيدة إن وُجد، الصفحة، عدد الأبيات)، والمطلع.
- **ما ينبغي أن يتذكره الطالب:** بيت أو عبارة أو مثل.
- **درجة الرواية:** ثابت / راجح / مختلف فيه / منسوب، مع الدليل (من نسبه، ومن شك فيه).
- **أقدم مصدر للنص / أقدم مصدر للقصة:** كلٌّ على حدة.
- **المجموعة الموضوعية المقترحة:** (مثل: الأسرى وقصائد الساعة الأخيرة، الفرسان وأيام العرب، الصعاليك، العشاق، الحكماء والمعمرون، الخطباء، شعراء الحيرة والملوك، الحنفاء، الرثاء، الشواعر، أصحاب الواحدة...).

At the end: (a) a table of all names with NEW/existing and criterion numbers; (b) names you met but rejected, with the reason in a few words; (c) anything you could not verify.

Rules: cite only pages you saw; quote verses exactly as the source prints them; mark doubtful attribution plainly; no modern anthologies or poetry websites as sources. Be thorough over your assigned sources — the goal is not to miss anyone who belongs — but keep each entry short.
