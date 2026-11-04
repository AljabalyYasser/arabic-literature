# Owner's notes on the 408-page draft (2026-11-04)

The owner annotated the draft before the last one, on about 50 pages. Ignore any note the last version already fixes;
apply the rest, and extend each point to the rest of the book. Nothing is changed before the owner sees the plan.

## Notes received

How they were read: 36 red boxes (white text) on 24 pages, no other marks. In the PDF as sent, every box is drawn
outside the page area: the annotating tool undid the page's 0.24 scale a second time, so no viewer shows them. They
were read by redrawing them in a scratch copy at their intended place (each sits beside the passage it targets; the
p. 49 one lands right after «والانتحال لا يقف عند الشعر…», as logged before). The owner's spelling is kept as written.

Draft chapter → current file: «الصحراء والقبيلة والسوق» → `book/src/al-sahra.txt` (now titled «القبيلة والسوق»);
«أيام العرب» → `ayyam-al-arab.txt`; «النثر الجاهلي» → `al-nathr.txt`; «صحة الشعر الجاهلي» → `al-intihal.txt`.
The «site» below means `src/content/`, where the book's facts must come from (`book/brief-book-tarafa.md`).

1. **p. 6, «الصحراء والقبيلة والسوق», beside the heading «دريد بن الصمة», aimed at «وأغار أخوه عبد الله على غطفان فغنم
   إبلًا، ونصحه دريد أن يسرع بها فأبى…»:** «الاختصار في القصة يشوش على القارئ..واغار أخوه.»
   - *Asks:* tell the story of the raid in full, because the compressed version confuses the reader.
   - *Current state:* not fixed; the paragraph is word for word the same in `al-sahra.txt`.
   - *Proposed fix:* retell it in order from the site's Durayd material: who ʿAbd Allah is, whom he raided (Ghatafan,
     of which Fazara is a clan), Durayd's advice and why, where they camped (منعرج اللوى), how Fazara caught them,
     and when the elegy was made. **General:** see rule 2 (no compressed stories).
   - *Done:* the raid retold in order in `al-sahra.txt` from al-ʿIqd (ج6 ص32–33): who ʿAbd Allah was, Ghatafan raided, Durayd's advice, ʿAbd Allah's refusal («لا أبرح حتى أنتقع نقيعتي»), the camp at al-Liwa, Fazara (of Ghatafan) catching him; Durayd's escape is referred to his own chapter. Site: same sentence expanded in `chapters/1/al-sahra.mdx`.

2. **p. 7, «الصحراء والقبيلة والسوق», under «ويروى البيت الثامن… والاستفهام فيها بمعنى النفي», on the meaning of verse 10
   («وعبد القاهر يقول في الاستفهام بالهمزة: إذا بدأت بالفعل…»):** «الاستفهام في الفعل والإسم .. لو ضربنا مثلا لكان
   أوضح»
   - *Asks:* give an example of ʿAbd al-Qahir's rule on the question that starts with a verb and the one that starts
     with a noun.
   - *Current state:* not fixed; same text.
   - *Proposed fix:* add his own pair from «دلائل الإعجاز» (p. 111: «أبنيتَ الدار؟», a question about the act, against
     «أأنت بنيتَ الدار؟», a question about the doer), then apply it: «أهوى فارس؟» against «أعبدُ الله ذلكم الردي؟».
     **General:** rule 4 (every rule or term gets an example).
   - *Done:* ʿAbd al-Qahir's own pair added from دلائل الإعجاز ص111 («أَبَنَيْتَ الدار…؟» / «أأنت بَنَيْتَ هذه الدار؟»), then applied: «أهوى فارس؟» against «أعبدُ الله ذلكم الرَّدي؟». Site: the same example added to `verses/amartuhum-amri/010.yaml`.

3. **p. 8, «الصحراء والقبيلة والسوق», on the last sentence of «وفي البيت الثامن جواب السؤال…»: «فلهذا كانت القبيلة تفرح
   بشاعرها: من دونه تُنسى مآثرها، ومعه تبقى»:** «من دونه تُنسى مصورها. .... (والباقي حشو) ومعه تبقى!»
   - *Asks:* apparently, that this sentence alone carries the point and the rest of the paragraph is padding.
   - *Current state:* not fixed; same paragraph.
   - *Proposed fix:* cut the paragraph to the verse-8 point plus the closing sentence, and drop the restatement of
     Ibn Rashiq. Confirm the scope first (open question 1). **General:** rule 7 (cut padding).
   - *Done:* cut «، ومعه تبقى» only, in the book and in `chapters/1/al-sahra.mdx`.

4. **p. 8, «الصحراء والقبيلة والسوق», on «فهي دالية مطلقة الروي» (section «البيت والقافية»):** «القافية والروي ووالخ
   يفضل أن تشرح بمثال»
   - *Asks:* explain القافية, الروي and the other terms through a worked example.
   - *Current state:* not fixed; the terms are still defined first, with the verses cited only afterwards.
   - *Proposed fix:* take verse 8 and mark on it the صدر, the عجز, the قافية letters and the روي (with its vowel), then
     give the definition. Do the same for الإقواء with verse 21. **General:** rule 4.
   - *Done:* «البيت والقافية» rewritten example-first on verse 8: صدر and عجز, the qafiya «أَرْشُدِ» marked letter by letter, then the definition, then the rawi; الإقواء shown on verse 21 before it is named.

5. **p. 10, «أيام العرب», end of «مقتل كليب», on «فأتى وفدهم مُرّة بن ذهل، أبا جسّاس» (section «الخصال الأربع»):** «قولنا
   فأتى وفدهم ... وفد من!؟ .. هذا اختصار مخل»
   - *Asks:* say whose delegation it was; the shorthand hides it.
   - *Current state:* not fixed; same sentence in `ayyam-al-arab.txt` (line 10).
   - *Proposed fix:* «فأتى وفدٌ من تغلب مُرّةَ بنَ ذُهْل، أبا جسّاس»; the vowelling also stops مرّة being read as the
     subject of the verb. **General:** rules 1 and 2 (an unclear pronoun or antecedent counts as a compressed story).
   - *Done:* «فأتى وفدٌ من تَغْلِب مُرّةَ بنَ ذُهْل»; the site already names the delegation.

6. **p. 11, «أيام العرب», above «بجير ويوم قضة», on «وقد أدركت وترك، فأنشدك الله في قومك»:** «وترك _ ما تشكيل الكلمة؟!
   تناقشنا في تشكيل ما يُشكل»
   - *Asks:* vowel «وترك», which can be read as a verb (وتَرَك) or a noun (وِتْرَك).
   - *Current state:* not fixed; still bare in line 16 (the gloss «أي قد أخذت ثأرك» stays).
   - *Proposed fix:* «وقد أدركتَ وِتْرَك». **General:** rule 1. The owner says he had already asked for this.
   - *Done:* «وقد أدركتَ وِتْرَك»; site: same in `stories/bu-bishis.md`.

7. **p. 13, «أيام العرب», «نهاية الحرب ومصير بطليها», on «من مبلغ الحيين أن مهلهلا / لله دركما ودر أبيكما، ففطنت ابنته
   لما نقص منه»:** «البيت : من مبلغ الحيين .. لم تُشكل البيت ولم تذكر فطنة ابنته وتكملة الأبيات وهذا نقص! مُخل!»
   - *Asks:* vowel the verse, quote the two complete verses, and show how the daughter worked out the riddle.
   - *Current state:* not fixed; line 27 has the same unvowelled half-verses.
   - *Proposed fix:* follow the site's `stories/mawt-al-muhalhil.md`: the half-verses as the slaves recited them, then
     the daughter's words and the two full verses («أمسى قتيلًا بالفلاة مجندلا» / «لا يبرح العبدان حتى يقتلا»),
     vowelled, plus one sentence on the device (each missing half carries the news). **General:** rules 1 and 3.
   - *Done:* the riddle told in order from Ibn Rashiq (العمدة ج1 ص308): the slaves, the vowelled half-verses, the daughter's words, the two full verses vowelled (as verses 1–2), and one sentence on how the missing halves carry the news.

8. **p. 15, «أيام العرب», «شعر الحرب», under the comment on verses 15–16 of al-Muhalhil's ra'iyya and «التكرار الحسن»:**
   «١_ البيت رقم ١٦ شرحه غير مفهوم / ٢_ فى الشرح ذكر التكرار لأبيات لم تورد منها بيتا واحد !! / ٣_ هنا فى هذه الصفحة
   ١٥ يوجد مساحة فلو ذكرت الأبيات أو بعضها لكان خير دليل»
   - *Asks:* make the meaning of verse 16 clear, and quote the repeated verses that the text discusses, using the
     free space on the page.
   - *Current state:* not fixed; line 41 is the same. Only the endings of the repeated verses are quoted.
   - *Proposed fix:* rewrite verse 16's meaning as the site has it (`verses/alaylatana/016.yaml`): «قتلنا همّامًا، على
     أنه لا يعدل كليبًا…», so it is clear who does not equal whom. Then quote two or three complete refrain verses
     (17 onward, from the site). **General:** rule 3 (when the text names a device, quote the verses that show it).
   - *Done:* verse 16 reworded («قتلنا هَمّامًا، على أنه لا يعدل كُلَيْبًا…»), and refrain verses 17, 18, 20, 21 quoted complete from the site with a short explanation.

9. **p. 16, «أيام العرب», end of «حرب البسوس», on Jalila's single verse and the gloss «والواتر: الذي قتل منّا قتيلًا»:**
   «هل لأبيات من تكملة !؟ فإن كان نزيد فلنذكر على الأقل بيتا اخر بعد البيت المذكور ! الواتر: قتل منا قليلا! هذا ليس
   شرح لمعنى اللفظ..»
   - *Asks:* quote at least one more verse of Jalila's poem, and give a real definition of «الواتر» rather than a
     paraphrase.
   - *Current state:* not fixed; line 46–47 still give one verse and the same gloss. The site's gloss is longer:
     «…فصار لنا عنده ثأر».
   - *Proposed fix:* add one or two verses from the site's `texts/ya-bnata-al-aqwam.md`. The quoted verse is no. 16,
     the last, so the added verses come before it. Gloss: «الواتر: من أصابك بوِتْر، والوِتْر: الثأر؛ أي الذي قتل منّا
     قتيلًا فلنا عنده ثأر», citing Lisan. («قليلا» in the note is a misreading of «قتيلًا».) **General:** rules 3 and 6.
   - *Done:* Jalila's verses 8–9 added before 16, with a meaning paragraph; «الواتر» glossed from Lisan (ج5 ص274: «وكل من أدركته بمكروه فقد وترته»).

10. **p. 19, «أيام العرب», «شعب جبلة», on «وهو عام ولد النبي صلى الله عليه وسلم»:** «عام ولد النبي أم مولد النبي!»
    - *Asks:* whether it should read «عام مولد النبي».
    - *Current state:* not fixed; line 65 is the same. The words are Ibn ʿAbd Rabbih's own (a quotation), and they
      are correct Arabic when vowelled.
    - *Proposed fix:* keep the quotation and vowel it «عامَ وُلِدَ النبيُّ»; or, if the owner prefers, say it outside
      the quotation marks as «عامَ مولد النبي». **General:** rule 1 (a word left bare reads as a mistake).
    - *Done:* kept in the quotation and vowelled «عامَ وُلِدَ النبيُّ»; site: same in `chapters/1/ayyam-al-arab.mdx`.

11. **p. 19, «أيام العرب», «شعب جبلة», on «وذكره بعدُ يفخر بقومه بني عامر» before Labid's verse 48:** «وذكره بعد يفخر
    بقومه.. اختصار مُخل»
    - *Asks:* expand the link sentence before the verse.
    - *Current state:* not fixed; same sentence.
    - *Proposed fix:* «وذكر لبيد هذا اليوم بعد سنين، حين كبر، في قصيدة يفخر فيها بقومه بني عامر الذين حموا الشعب»,
      naming the poem from the site. **General:** rule 2.
    - *Done:* «وذكر هذا اليوم بعدُ في ميميّته «طلل لخولة بالرسيس قديم»، وهي قصيدة فخر يعدّ في آخرها أيام قومه…» (diwan, ص118–137).

12. **p. 21, «أيام العرب», beside the heading «الكلاب الثاني»:** «لو أضفنا جملة لتوضيح يوميّ كُلاب هنا لكان أفضل ..للتذكير»
    - *Asks:* add a sentence telling the two Kulab days apart, as a reminder.
    - *Current state:* not fixed; line 79 is the same. The first Kulab is mentioned in passing only in «شعب جبلة».
    - *Proposed fix:* at the start of the section: the first Kulab, between Shurahbil and Salama sons of al-Harith ibn
      ʿAmr al-Kindi (Bakr against Taghlib, «كلاب ربيعة»); the second, Tamim against Madhhij and the Yemenis, after the
      Prophet's mission. **General:** rule 2 (remind the reader when a name recurs with a different referent).
    - *Done:* the section now opens by telling the two Kulab days apart (كُلاب ربيعة: Shurahbil and Salama, Bakr against Taghlib; the second: Tamim against Madhhij and the Yemenis, after the Mission).

13. **p. 21, «أيام العرب», «الكلاب الثاني», on «فقتلت المقاتلة، وبقيت الذرية والأموال»:** «تشكيل كلمة المقابلة!!»
    - *Asks:* vowel «المقاتلة» (the note's «المقابلة» is a slip).
    - *Current state:* not fixed; it is glossed in the text but still bare.
    - *Proposed fix:* «المُقاتِلة». **General:** rule 1.
    - *Done:* «فقُتِلَت المُقاتِلة»; site: same.

14. **p. 22, «أيام العرب», «الكلاب الثاني», under the paragraph «فأغار أهل اليمن على إبل تميم بالكلاب…»:** «شرح القصة
    (فأغار أهل اليمن..) شرح غير مفهوم والسرديةفيه غير مفهومة»
    - *Asks:* rewrite the account of the battle as a clear narrative.
    - *Current state:* not fixed; line 81 is the same.
    - *Proposed fix:* one line of events in time order. Day one: the raid, the pursuit by Saʿd and al-Ribab, al-Nuʿman
      ibn Jassas killed. Day two: the war cries, Waʿla throwing down the banner, the rout, the hamstringing. Keep a
      quotation only where it carries a word that matters (يال مقاعس). **General:** rule 2.
    - *Done:* the battle retold as two days in order (raid and pursuit, al-Nuʿman ibn Jassas killed; war cries, Waʿla drops the banner, rout, hamstringing), quotations kept only as evidence.

15. **p. 23, «أيام العرب», «الكلاب الثاني», foot of the page after the ʿAbd Yaghuth and Waʿla verses:** «الأبيات أكثر مما
    ذكرت وهي من جيد الشعر فيجب أن لا تختصر وأذكرها كاملة»
    - *Asks:* give the poem complete, because it is fine poetry.
    - *Current state:* not fixed; still verses 1, 8, 9 and 12 of ʿAbd Yaghuth's poem, and one verse of Waʿla's.
    - *Proposed fix:* print ʿAbd Yaghuth's verses 1–12 complete from the site (`texts/ala-la-talumani.md`), since
      al-Asmaʿi said he heard only that far, and keep the note that the rest is weaker. Which poem, and whether
      13–20 go in, is open question 2. **General:** rule 3.
    - *Done:* ʿAbd Yaghuth's «ألا لا تلوماني» given complete (20 verses, from `verses/ala-la-talumani/`), read in nine units of meaning with glosses; al-Asmaʿi's remark kept after verse 12.

16. **p. 24, «أيام العرب», beside the heading «ذو قار»:** «القصة أحداثها غير مفهومةوغير مترابطة لأن الاقتباس كثر فيها»
    - *Asks:* the Dhu Qar story is unclear and disjointed because it is built from too many quotations.
    - *Current state:* not fixed; lines 95–101 are the same.
    - *Proposed fix:* see note 17.
    - *Done:* see 17.

17. **p. 24, «أيام العرب», «ذو قار», after «…وهذا خبر أدبي لا نجده في رواية أبي عبيدة»:** «لو نعيد صياغتها بشكل أبسط
    ومتسلسل»
    - *Asks:* rewrite the story more simply, as a sequence of events.
    - *Current state:* not fixed.
    - *Proposed fix:* tell the main line in our own words: the death of ʿAdi → Kisra's anger → al-Nuʿman's end → the
      deposit with Shayban → Kisra's three choices → the battle → its date. Then put the variants (Ibn al-Kalbi's «بقر
      السواد», which Hani, the leaders) after the main line, or in footnotes. **General:** rule 2 (narration first,
      quotations as evidence).
    - *Done:* Dhu Qar rewritten: the main line in Abu ʿUbayda's version (ʿAdi's death → Kisra's anger → al-Nuʿman's end → the deposit with Hani → the three choices → Hanzala → Iyad's secret pact → the battle → its date), then one paragraph of variants (Ibn al-Kalbi's «بقر السواد», Hani ibn Masʿud, the raid on the Sawad, al-Nuʿman's death, the leaders, Banu ʿIjl's claim).

18. **p. 35, «النثر الجاهلي», «خطبة قس», on «ويزيد أبو الفرج في الخبر أن رجلًا رأى قسًّا وحوله سباع تطيعه، ثم يروي له
    أبياتًا…»:** «قس بن ساعدة وقصة أبيات خليليّ هبا طالما قد رقدتما»
    - *Asks:* tell the story of the verses «خليليّ هبّا طالما قد رقدتما», and quote them.
    - *Current state:* not fixed; `al-nathr.txt` line 21 still only alludes to the verses.
    - *Proposed fix:* from the site's `stories/quss-fi-ukaz.md` («سمعان»): the man who saw Quss among the lions, then
      Quss between his brothers' graves, then the opening verse(s) vowelled, then the attribution to ʿIsa ibn Qudama
      al-Asadi by Ibn al-Sikkit. **General:** rule 3.
    - *Done:* the Simʿan story told in order from الأغاني ج15 ص247–248, with the five verses «خليليّ هبّا…» vowelled and glossed (Lisan), then the attribution to ʿIsa ibn Qudama (Ibn al-Sikkit) and the Rawand version. Verses checked on the Dar al-Kutub page image (ص248).

19. **p. 37, «النثر الجاهلي», beside the heading «سجع الكهان», on its first paragraph («قال الجاحظ إن «كهان العرب…» كانوا
    يحكمون بالأسجاع»):** «وقال الجاحظ ... ثم الكلام غير مترابط ولا مفهوم فبداية الاقتباس غير موفق»
    - *Asks:* rewrite the opening, where the Jahiz quotation is cut in and the sentence stops making sense.
    - *Current state:* not fixed; line 33 is the same.
    - *Proposed fix:* first say in our own words who the kahins were and what people asked of them, then quote al-Jahiz
      as one whole sentence with its verb («…كانوا يحكمون بالأسجاع»), not wrapped around our own text. **General:**
      rule 2 (a quotation must not start or end in mid-sentence).
    - *Done:* the opening says who the kahins were and what was asked of them, then quotes al-Jahiz's whole sentence (البيان ج1 ص241). Site: same fault fixed in `chapters/1/al-nathr.mdx`.

20. **p. 37, «النثر الجاهلي», «سجع الكهان», on «وأشهر ما يُروى من سجعهم خبر الكاهنين سطيح وشق…»:** «خبر الكاهنين إروية
    بصيغة مفهومة ..من قال ولمن»
    - *Asks:* retell the story of the two kahins clearly, saying who says what to whom.
    - *Current state:* not fixed; line 34 is the same.
    - *Proposed fix:* name Rabiʿa ibn Nasr and say who he was, then the dream, the condition he set, Satih's words to
      the king, Shiqq's words to the king, and the interpretation. Each utterance gets its speaker («فقال سطيح للملك:
      …»). **General:** rule 2.
    - *Done:* retold with Rabiʿa ibn Nasr introduced (Ibn Ishaq: «ملك اليمن بين أضعاف ملوك التبابعة»), the dream, his condition, then each utterance with its speaker («فقال سَطِيح…»، «فقال شِقّ للملك…») and the interpretation. Site: the summary in `chapters/1/al-nathr.mdx` now names who speaks.

21. **p. 40, «صحة الشعر الجاهلي», beside the heading «القدماء», aimed at the quotation «وليس يشكل على أهل العلم زيادة
    الرواة…» lower down:** «تشكيل الكلمات المبهمة..مثلا فى اقتباس وليس يشكل على أهل العلم ووالخ وهنا مثال فقط فهناك
    كلمات كثييرةتحتاج إلى تشكيل»
    - *Asks:* vowel the ambiguous words, inside quotations too («يُشكِل» here), and many others like it.
    - *Current state:* not fixed; `al-intihal.txt` line 15 is still bare.
    - *Proposed fix:* «وليس يُشكِلُ على أهل العلم». **General:** rule 1. The owner marks this as one example among many.
    - *Done:* «وليس يُشكِلُ… فيُشكِلُ ذلك»; site: same in `chapters/1/al-intihal.mdx` (both places).

22. **p. 40, «صحة الشعر الجاهلي», «ابن سلام», on «فصنعة الراوي والشاعر المولَّد تُعرف»:** «المولدون والشاعر المولد ما
    معناهم!!»
    - *Asks:* define «المولَّدون».
    - *Current state:* not fixed in the body. A footnote gloss («والمولَّدون: الشعراء الذين نشؤوا بعد العرب الأوائل في
      الحواضر») was already in the draft and is still there, so the owner either missed it or wants it in the text.
    - *Proposed fix:* define the term in the sentence where it first appears in the body, and keep the footnote short.
      **General:** rule 4 (a key term is defined in the text, not only in a note).
    - *Done:* المولّدون defined in the main text where they first appear; the footnote keeps only «عضل بهم».

23. **p. 41, «صحة الشعر الجاهلي», end of «ابن سلام», aimed at «ولم يقبل ابن سلام عذره» (section «ابن إسحاق»):** «نعود
    للتشكيل مثلا ولم يقبل قرأتها يُقبل..وهذا لغياب تشكل الكلام المهم»
    - *Asks:* vowel «يقبل», which he read as passive.
    - *Current state:* not fixed; line 19 is still bare.
    - *Proposed fix:* «ولم يَقبَلِ ابنُ سلّام عذره». **General:** rule 1.
    - *Done:* «ولم يَقبَلِ ابنُ سَلّام عذره»; also «ولا يَقبَلُ ناصر الدين الأَسَد» (book and site).

24. **p. 41, «صحة الشعر الجاهلي», above the heading «حماد الراوية»:** «عند ذكرى مثال للتشكيل لا أقصد به الحصر فيجب مراجعة
    النصوص والكلمات»
    - *Asks:* treat each vowelling example as a sample, and review every text and word for the same problem.
    - *Current state:* not fixed (general instruction).
    - *Proposed fix:* the whole-book vowelling pass in rule 1.
    - *Done:* vowelling pass on all five topic chapters (rule 1): besides the words in the notes, «ولم يُقتَل»، «قُتِلَ النعمانُ»، «قتلُ النعمانِ… عديَّ»، «حُمِلَ عليهما حَمْلٌ»، «أن يَقبَلَ… ولا يَرْوِيَ»، «يُروى» (×3)، «والمحدِّثين» in Taha Husayn's list, «قَتَلَ عَمْرَو بنَ هند».

25. **p. 41, «صحة الشعر الجاهلي», «حماد الراوية», on «ورجلان من الرواة نالهما، كما يقول الأسد…»:** «كما يقول (الأسد)
    أورد الإسم بشكل مناسب»
    - *Asks:* name the scholar properly rather than with the bare «الأسد».
    - *Current state:* not fixed; line 22 still has «كما يقول الأَسَد». The full name appears only twice in the
      chapter (line 6, and line 53 in «الجواب»).
    - *Proposed fix:* «ناصر الدين الأسد» at his first mention in each section, and «الأسد» after that. **General:**
      rule 5. The exact form is open question 4.
    - *Done:* «كما يقول ناصر الدين الأَسَد» at the head of the Hammad section.

26. **p. 42, «صحة الشعر الجاهلي», «حماد الراوية», foot of the page (the Bilal, ʿUmar ibn Saʿid, al-Mufaddal and
    al-Mahdi reports, «…وكلاهما يضعف الكوفيين»):** «أرجوا إعادة الصياغة بشكل واضح سلسل وتبيين البصري والكوفي وسبب
    الاختلاف»
    - *Asks:* rewrite the section clearly and smoothly, and explain what «Basran» and «Kufan» mean and why the two
      cities were at odds.
    - *Current state:* not fixed; lines 22–26 are the same. The rivalry is named («عصبية بين البصرة والكوفة») but never
      explained.
    - *Proposed fix:* open the section with two or three sentences on the two schools of Iraq in the 2nd century AH
      (philology and riwaya), their rivalry, and who belongs to which (Hammad and al-Mufaddal Kufan; Yunus, Ibn Sallam
      and Khalaf Basran). Then tell each report as a short, numbered episode, with al-Asad's reading after them.
      **General:** rules 2 and 4.
    - *Done:* the section opens with the two schools of Basra and Kufa and their rivalry, from al-Asad (ص433–434), and names who belongs to which; the reports are now numbered (الخبر الأول… الرابع), with al-Asad's reading after them. Site: the same paragraph added.

27. **p. 44, «صحة الشعر الجاهلي», beside the heading «أدوات القدماء»:** «الأدوات لو يتم ترتيبها أولا (كذا وكذا ..إلخ) ثم
    توضيحيها بالمثال كما هو مذكور.. وهي مهمة فتوضيحها مهم أيضا»
    - *Asks:* list the tools first by name, then illustrate each one with its example.
    - *Current state:* partly fixed. «المشاكلة» is now defined («أي موازنة الشعر بكلام من يُنسب إليه»), but the six
      tools are still not named together up front (four in a back-reference sentence, then the fifth and sixth).
    - *Proposed fix:* one sentence naming all six (الإسناد والعرض، السؤال عمن حمل الشعر، اللغة، المشاكلة، الخبرة، ما لا
      يعرفه الجاهلي), then six short paragraphs, each with its example. **General:** rule 8 (list first, then examples).
    - *Done:* one sentence names the six tools, then each of the first four gets its example (the last two already had theirs).

28. **p. 45, «صحة الشعر الجاهلي», above the heading «المحدثون»:** «ما تشكيل المحدثون مرت كثيرا علي من قبل أيضا !!!»
    - *Asks:* vowel «المحدثون» (المُحدَثون, the moderns, not المحدِّثون, the hadith scholars); he has met the problem
      often.
    - *Current state:* not fixed; the heading is still bare (`## المحدثون`, line 37), and the word recurs bare in the
      body.
    - *Proposed fix:* «المُحْدَثون» in the heading and at every ambiguous occurrence across the book. **General:** rule 1.
    - *Done:* «المُحْدَثون» in the heading and at every occurrence in the five chapters (book and site).

29. **p. 45, «صحة الشعر الجاهلي», beside the heading «مرجليوث»:** «وأعيد بأن التشكيل للكلام المُبهم مهم جدا»
    - *Asks:* a general reminder that vowelling ambiguous words is very important.
    - *Current state:* not fixed (general instruction).
    - *Proposed fix:* rule 1.
    - *Done:* rule 1, as 24.

30. **p. 45, «صحة الشعر الجاهلي», «مرجليوث», foot of the page, on «أن هذا الشعر يعرف التوحيد وقصص القرآن ولا يعرف وثنية
    أهله»:** «كلمة يعرف وتشكيلها .. تعبت والله من هذا!!»
    - *Asks:* vowel «يعرف».
    - *Current state:* not fixed; line 41 is still bare.
    - *Proposed fix:* «يَعرِفُ التوحيد… ولا يَعرِفُ وثنية أهله». **General:** rule 1.
    - *Done:* «يَعرِفُ التوحيد… ولا يَعرِفُ وثنية أهله» (book and site).

31. **p. 45, «صحة الشعر الجاهلي», same place:** «هناك فرق بين يَعرف ويُعرّف ...»
    - *Asks:* same point; the unvowelled form can be read as other verbs (يُعرَف، يُعرِّف).
    - *Current state:* not fixed.
    - *Proposed fix:* as note 30. **General:** rule 1. Verbs whose voice or form changes the meaning are the first
      words to check.
    - *Done:* as 30.

32. **p. 46, «صحة الشعر الجاهلي», «مرجليوث», on «وردّ عليه مستشرقون آخرون. فمن حجة لايل…»:** «فمن حجة لايل... من هو ليل؟ ..
    لماذا لم تقل فمان رد عليه ....»
    - *Asks:* say who Lyall is, and introduce him as one of those who replied («فممّن ردّ عليه…»).
    - *Current state:* not fixed; `al-intihal.txt` line 42 now vowels the name («لايِل») but does not introduce him.
    - *Proposed fix:* «وممّن ردّ عليه المستشرق الإنجليزي تشارلز لايِل، محقق «المفضليات» ومترجمها…». Check one date
      first: Lyall died in 1920, before Margoliouth's 1925 article, so see whether Shawqi Dayf (ج1 ص168) presents him
      as answering Margoliouth or as answering the doubt more generally, and word the sentence to match.
      **General:** rule 5.
    - *Done:* checked: al-Asad (ص367–368، ص371 الحاشية) shows Lyall answered Margoliouth's earlier writings (1905, 1916) in the preface to vol. 2 of المفضليات (1918), not the 1925 article; the text now says so and introduces him as the editor of المفضليات. Site: same.

33. **p. 46, «صحة الشعر الجاهلي», «مرجليوث», on «وردّ بروينلش حجة النقوش…»:** «برويلنش! من هو؟»
    - *Asks:* say who Bräunlich is.
    - *Current state:* not fixed; the name is still not introduced (the current spelling is «بروينلِش»).
    - *Proposed fix:* «المستشرق الألماني إريش براونليش» with his death date, from a source. Settle one Arabic spelling
      (Dayf's) and use it everywhere. **General:** rule 5.
    - *Done:* introduced as one of the orientalists Dayf names against Margoliouth; Dayf's spelling «بروينلِش» kept. No approved source gives his full name or dates, so none is added (open).

34. **p. 47, «صحة الشعر الجاهلي», beside the heading «الجواب»:** «هل لمحمود شاكر رد على طه حسن؟ إن كان فلازما ذكره!»
    - *Asks:* if Mahmud Shakir answered Taha Husayn, he must be mentioned.
    - *Current state:* not fixed; Shakir appears only as an editor in the bibliography.
    - *Proposed fix:* yes, he did. He opposed the book from the start and wrote against it later (the preface to
      «المتنبي», «رسالة في الطريق إلى ثقافتنا»). But `docs/sources.md` (gaps, 2) lists his own books as not open, so a
      short paragraph needs a source first. «جمهرة مقالات محمود محمد شاكر» is on Shamela (ش20641,
      `research/islami/B-topics.md`). Open question 5.
    - *Done:* source card `src/content/sources/shakir-maqalat.yaml` and register entry `research/islami/registry-shakir.md` written; a paragraph on Shakir's reply added to «الجواب», quoted from جمهرة مقالاته (ج2 ص1049، 1097–1101). Site: same paragraph in `chapters/1/al-intihal.mdx`.

35. **p. 48, «صحة الشعر الجاهلي», «الجواب», on «ثم يلاحظ أن طه حسين نفسه عاد في كتابه الخامس…»:** «كتابه الخامس ؟ ما هو ؟
    وكلمة يلاحظ تشكيلها؟»
    - *Asks:* say what the «fifth book» is, and vowel «يلاحظ».
    - *Current state:* partly fixed. The book is now named («عاد في الكتاب الخامس من «في الأدب الجاهلي»، وهو في شعراء
      مُضَر», line 50), but «يلاحظ» is still bare.
    - *Proposed fix:* «ثم يُلاحِظُ» (the subject is Shawqi Dayf). **General:** rule 1.
    - *Done:* «ثم يُلاحِظُ ضيف».

36. **p. 49, «صحة الشعر الجاهلي», after «والانتحال لا يقف عند الشعر…»:** «الأمثلة المذكورة لا توضح بشكل دقيق الأسئلة
   الفحصية التي وردت.. ما أقدم مصدر وهل مروية بإسناد إلى راو ثقة ووإلخ فقد ذكرنا أن النص الجاهلي تقف أمامه مجموعة من
   الأسئلة! يرجى كتابة الأمثلة على ما سبق تقريره من أسئلة تحت فقرة الحكم على النص الواحد ليفهم القارئ ويتضح له فساد حجة
   طه حسين وغيره».
    - *Asks:* tie each example to one of the questions listed under «الحكم على النص الواحد», so the reader sees the
      method at work and sees why Taha Husayn's sweeping claim fails.
    - *Current state:* not fixed; lines 55–60 have the same six questions and the same four examples, with no example
      tied to a question.
    - *Proposed fix:* number the questions, then give one example per question and name the question in it. For the
      oldest source and isnad: Lamiyyat al-ʿArab. For a named forger: «إن بالشعب» (Ibn Qutayba and Ibn ʿAbd Rabbih on
      Khalaf). For a rival attribution: «أحار بن عمرو». For something the age could not know: al-Afwah's meteors and
      Labid's verse. For fit with the poet's life: Samawʾal's lamiyya. End with one sentence on why judging text by
      text undoes a sweeping verdict. **General:** rule 8.
    - *Done:* the five questions numbered, then one example per question, each naming its question (Lamiyyat al-ʿArab; «أحار بن عمرو»; «إن بالشعب»; al-Afwah, Labid and the taʾiyya; Samawʾal's lamiyya), and a closing sentence on why judging text by text undoes Taha Husayn's sweeping verdict.

## Summary for the owner

### القواعد العامة التي تقتضيها الملاحظات، وتسري على الكتاب كله

١. **ضبط ما يُلبس.** تُشكَّل كل كلمة تحتمل قراءتين، في كلامنا وفي الاقتباسات والعناوين والأبيات المسوقة نثرًا: الفعل
   المبني للمعلوم والمجهول (يَعرف/يُعرف، يَقبل/يُقبل، يُلاحِظ/يُلاحَظ، يُشكِل)، وما يتغير معناه بحركته (المُحْدَثون/المحدِّثون،
   وِتْرَك/وتَرَك، المُقاتِلة، عامَ وُلِدَ)، والمنصوب الذي قد يُقرأ فاعلًا (فأتى وفدٌ مُرّةَ). وأمثلة الملاحظات ليست للحصر.
   **التعميم:** مراجعة الفصول الأربعة والأربعين في `book/src` كلمة كلمة، تبدأ بقائمة من الكلمات المشتبهة يُبحث عنها في كل فصل، ثم
   قراءة بشرية لما بقي.
٢. **لا اختصار مخلّ في القصص.** تُروى القصة متسلسلة: من فعل، وبمن، وأين، ولماذا، ثم ماذا. ولا يُترك ضمير بلا مرجع
   واضح، ويُذكّر القارئ بما مرّ إذا تكرر الاسم بمعنى آخر (يوما الكُلاب). وتأتي روايتنا أولًا ثم الاقتباس شاهدًا عليها،
   ولا يُقطع الاقتباس في وسط جملتنا. **التعميم:** أيام العرب أولًا، ثم أخبار الشعراء في فصول الأعلام (المهلهل، دريد،
   الصعاليك، وغيرهم)، ثم أخبار النثر والانتحال.
٣. **سوق الأبيات التي يتحدث عنها النص.** إذا ذكرنا تكرارًا أو لازمة أو قصة أبيات أو قصيدة جيدة، سقنا من الأبيات ما يشهد
   به، ونستعمل البياض في آخر الصفحة لذلك. **التعميم:** في كل فصل، كل موضع يصف شعرًا لا نسوقه يُكمَّل ببيت أو أكثر من الموقع.
٤. **كل مصطلح أو قاعدة بمثال، وكل مصطلح مهم يُعرَّف في المتن.** القافية والروي والإقواء، الاستفهام عند عبد القاهر،
   المولّدون، أدوات القدماء. **التعميم:** حصر المصطلحات في كل فصل، والتأكد أن لكل واحد تعريفًا في المتن عند أول وروده
   ومثالًا.
٥. **التعريف بالأعلام.** كل علم يُعرّف به عند أول ذكره في الفصل: من هو وزمنه (لايل، براونليش)، ويُذكر العالم باسمه
   التام عند أول ذكره في كل قسم (ناصر الدين الأسد)، ولا يُغفل صاحب رأي كبير في القضية (محمود شاكر). **التعميم:** قائمة
   بأعلام المحدثين والمستشرقين في الكتاب كله، مع أول موضع لكل منهم.
٦. **الشرح اللغوي يعرّف اللفظ.** شرح الكلمة يعطي معناها في اللغة، لا إعادة صياغتها في سياقها (الواتر). **التعميم:**
   مراجعة حواشي الغريب في كل فصل.
٧. **حذف الحشو.** ما يعيد معنى قيل قبله يُحذف.
٨. **القائمة أولًا ثم الأمثلة.** إذا عددنا أمورًا (أدوات القدماء، أسئلة الحكم على النص) سمّيناها كلها أولًا، ثم أعطينا لكل
   واحد منها مثاله.

### الإصلاحات المطلوبة

لم تُصلح نسخة الكتاب الحالية من الملاحظات الست والثلاثين شيئًا إصلاحًا تامًّا، وأصلحت اثنتين إصلاحًا جزئيًّا: عُرّفت
«المشاكلة» (ملاحظة ٢٧)، وسُمّي «الكتاب الخامس» (ملاحظة ٣٥). فالمطلوب:

- **القبيلة والسوق:** إكمال قصة غارة عبد الله أخي دريد (١)؛ مثال عبد القاهر في الاستفهام (٢)؛ حذف الحشو في فقرة «وفي
  البيت الثامن» (٣)؛ شرح القافية والروي والإقواء على البيت الثامن والحادي والعشرين (٤).
- **أيام العرب:** «فأتى وفدٌ من تغلب مُرّةَ» (٥)؛ «وِتْرَك» (٦)؛ بيتا «من مبلغ الحيين» تامّين مضبوطين مع فطنة الابنة (٧)؛
  معنى البيت السادس عشر وأبيات من اللازمة (٨)؛ بيت أو بيتان من قصيدة جليلة وشرح «الواتر» (٩)؛ ضبط «عامَ وُلِدَ» (١٠)؛
  جملة لبيد (١١)؛ التذكير بيومي الكُلاب (١٢)؛ «المُقاتِلة» (١٣)؛ إعادة سرد وقعة الكُلاب (١٤)؛ أبيات عبد يغوث الاثنا
  عشر (١٥)؛ إعادة سرد ذي قار متسلسلًا (١٦، ١٧).
- **النثر الجاهلي:** قصة أبيات «خليليّ هبّا» (١٨)؛ مدخل سجع الكهان (١٩)؛ خبر سطيح وشق بقائل كل كلام ومخاطَبه (٢٠).
- **صحة الشعر الجاهلي:** «يُشكِل» (٢١)؛ تعريف المولّدين في المتن (٢٢)؛ «يَقبَل» (٢٣)؛ اسم ناصر الدين الأسد (٢٥)؛ إعادة
  صياغة قسم حماد وشرح البصري والكوفي (٢٦)؛ ترتيب الأدوات الست ثم أمثلتها (٢٧)؛ «المُحْدَثون» (٢٨)؛ «يَعرِف» (٣٠، ٣١)؛
  التعريف بلايل وبراونليش (٣٢، ٣٣)؛ رد محمود شاكر (٣٤)؛ «يُلاحِظ» (٣٥)؛ ربط كل مثال بسؤاله في «الحكم على النص الواحد» (٣٦).
- **الكتاب كله:** مراجعة الضبط (٢١، ٢٤، ٢٩)، والقواعد العامة أعلاه في الفصول التي لم تصلها ملاحظات.

### ما يحتاج إلى سؤال

١. **«(والباقي حشو)» (ص٨):** هل المقصود أن فقرة «وفي البيت الثامن جواب السؤال…» كلها حشو إلا جملة «من دونه تُنسى مآثرها،
   ومعه تبقى»، أم كلمات بعينها في تلك الجملة؟
٢. **«وأذكرها كاملة» (ص٢٣):** هل المقصود قصيدة عبد يغوث أم أبيات وعلة؟ وهل تُساق كاملة (عشرون بيتًا)، أم إلى البيت الثاني
   عشر الذي قال الأصمعي إنه لم يسمع بعده شيئًا؟
٣. **حدود الضبط:** هل يكفي ضبط ما يُلبس وحده، أم تُشكَّل الاقتباسات كلها شكلًا تامًّا؟
٤. **اسم الأسد:** هل يكفي «ناصر الدين الأسد» عند أول ذكره في كل قسم، أم يُكتب الاسم التام في كل مرة، أو يُسبق بلقب
   «الدكتور»؟
٥. **محمود شاكر:** كتبه المؤلَّفة ليست في مصادرنا المفتوحة. هل نكتب فقرة قصيرة من «جمهرة مقالاته» المتاحة، أم ننتظر حتى
   تتوفر كتبه؟
٦. **«عام ولد النبي» (ص١٩):** العبارة نص ابن عبد ربه، وهي صحيحة إذا ضُبطت «عامَ وُلِدَ». هل نبقيها مضبوطة، أم نخرجها من
   الاقتباس ونكتب «عام مولد النبي»؟
٧. **المولّدون (ص٤٠):** في الحاشية تعريف بهم من قبل. هل لم يظهر لكم، أم تريدون التعريف في المتن؟
٨. **عدد الصفحات:** أكثر الملاحظات تزيد النص (أبيات، أمثلة، قصص أوفى). هل يُسمح بأن يزيد عدد صفحات الكتاب، أم نحذف من مواضع
   أخرى بقدر ما نزيد؟

## Owner's answers (2026-11-04)

1. **p. 8:** the clause «ومعه تبقى» is padding, because what comes before it already says it. Cut that clause only.
2. **p. 23:** ʿAbd Yaghuth's poem «ألا لا تلوماني» is to be given complete, as the site's text has it. The owner sent a
   scan of its first eleven verses.
3. **Vowels:** no full vowelling of prose. Vowel only a word that can be read two ways when the misreading changes the
   meaning. The owner's examples were samples, not a list.
4. **Mahmud Shakir:** add «جمهرة مقالات الأستاذ محمود محمد شاكر» to the register. His replies matter.
5. **Length:** the book may grow to at most 500 pages. A story told in several versions is told in one version, and
   the others get a short line, e.g. «وقد ورد في كذا برواية أخرى», without their details.
6. **Sources:** add «الروض الأنف», «الاستيعاب» and «ميزان الاعتدال» to the register.

Also decided by the lead under the rules: ناصر الدين الأسد gets his full name at first mention in each chapter;
«عامَ وُلِدَ النبي» stays in the quotation and is vowelled; المولّدون are defined in the main text.

## Second round (2026-11-04), on the revised topics

1. **«البيت والقافية» is too hard.** Read three times and not understood. Explain القافية, الروي and الإقواء simply,
   the way a teacher would, with the fewest terms: the sound that repeats at the end of every verse, the letter the
   poem is named by, and what happens when its vowel changes. No definitions stacked on definitions.
   - *Done:* `al-sahra.txt` «البيت والقافية» rewritten in three short paragraphs: the two halves (صدر، عجز); the sound that comes back at the end of every verse (القافية) and the letter the poem is named by (الرويّ, «دالية»); the vowel that changes in verse 21 (الإقواء). مصراع, the two-sakin definition, مطلق/مقيد and al-Marzuqi's «أسوديّ» are gone; the rival reading kept in one line. Site: `concepts/al-qafiya.md` now opens with the plain sense.
2. **حرب البسوس still gives every version.** Apply the one-version rule.
   - *Done:* `ayyam-al-arab.txt`: Kulayb's killing told once (Ibn ʿAbd Rabbih), the Aghani and Maydani versions in one line; Bujayr told once (al-Maydani), the Aghani in one line; the Hujr version of Qiḍa, Muhalhil's other deaths, and Ibn ʿAbd Rabbih's list of days each one line; the count of the dead cut to its point. Also one version for the Dahis bet, the Jabala advisor, Dhu Qar (Ibn al-Kalbi in one line) and the Qass variants in `al-nathr.txt`.
3. **p. 20, «واختلفوا في قتل لقيط»:** one line is enough. **General:** a dispute of little use to the reader (who killed
   a minor figure, and so on) is summarised in one line; full disputes are kept for questions that matter.
   - *Done:* one sentence: Shurayh b. al-Ahwas, «لا يشك العلماء» (Abu ʿUbayda); al-Mubarrad dropped; the Dakhtanus rajaz given one version with the Naqaid in one line. Same treatment for Waʿla's poem, the Ukaz dates and the etymology of ʿUkaz.
4. **al-Kulab al-Thani:** «فبين» should be «بين».
   - *Done:* the أما… فـ pair rewritten: «الأول «كُلاب رَبِيعة»… والثاني، وهو الذي نرويه هنا، كان بين تميم ومَذْحِج».
5. **p. 23, «وكان العبشمي أهوج»:** wrong. Introduce the young man who captured ʿAbd Yaghuth normally at first mention:
   «أسره فتى من بني … اسمه …».
   - *Done:* «أسره فتى نحيف من بني تَيْم، من الرِّباب، يقال له عِصْمة بن أُبَيْر» (العقد ج6 ص83–85, checked on Shamela), then al-Ahtam's wife, the sale to al-Nuʿman's kin, the tied tongue and the death, in order; the Naqaid version in one line; verse 12 and 13 explanations brought in line. Site: `chapters/1/ayyam-al-arab.mdx`.
6. **The label «المعنى:» is dropped across the book.** The explanation must read as an explanation without it:
   «يقول هنا…»، «وفي البيت الثاني…». (render.py no longer prints the label.)
   - *Done:* every `=` paragraph in the five chapters read; the five that did not read as explanations now open with «يقول…» or «تقول…» (al-Sahra vv. 6, 10; Ayyam: Jalila v. 16, the lazima, al-Aʿsha v. 21).
7. **p. 27, «وفي البيتين صدى لبيتين لامرئ القيس»:** name the two verses, at least their first hemistichs. Never point to
   verses without quoting them.
   - *Done:* both verses of Imru' al-Qays quoted in full (ديوان ص35). Also the seven Muʿallaqat openings now quoted in «مطالعها». Site: `texts/ala-la-talumani.md`.
8. **The hanging of the Muʿallaqat:** give the gist the reader needs, then the disagreements in a few lines, saying the
   matter is conjecture, not certain. No long account.
   - *Done:* «خبر تعليقها» cut from five paragraphs to three: Ibn ʿAbd Rabbih's report and Ibn Rashiq's other reading; al-Nahhas, Shawqi Dayf and Nasir al-Din al-Asad in a few lines; then «فالتعليق ظنّ لا يقين».
9. **The poets of the Muʿallaqat:** names only, with a line saying each is introduced in his own chapter. No
   introductions that the book repeats later.
   - *Done:* «أصحابها» is now the names only, with a line saying each has his own chapter (al-Aʿsha, al-Nabigha and ʿAbid included). Cross-references from the poets' chapters still hold.
10. **«الأسد» alone is an error** (pp. 47 and 55, and wherever else): write «ناصر الدين الأسد» every time.
   - *Done:* every «الأَسَد» in the five chapters, text and footnotes, is «ناصر الدين الأَسَد» (38 in `al-intihal.txt`); «ضيف» beside him made «شوقي ضيف».
11. **The judgement of a single text:** the examples are good; put each example through its questions as a dialogue
    with the reader («فما أقدم مصدر رواه؟ …»). Replace «ولكل سؤال مثال» with something like «ولنضرب أمثلة يتضح بها ذلك».
   - *Done:* «ولكل سؤال منها مثال» replaced by «ولنعرض على هذه الأسئلة خمسة نصوص مشهورة…»; each text now goes through its questions as questions and answers («فما أقدم مصدر يرويها؟ … وهل يرويها هذا الخبر للشنفرى بإسناد؟ لا…»).

**Owner, 2026-11-04 (applies to every note):** the wordings in his notes are examples, not text to copy. Write each
fix in the best wording you can. Paragraphs must connect smoothly: each one follows from the one before.

## Part B: faces

The general rules and the second round applied to the fifteen `book/src/group-*.txt`. Pages are each chapter built
alone, before → after (in the book the faces run on, so the real saving is the ~4% of text cut, about 9 KB of 261 KB).
`fn-sources-last.py` changed nothing in any chapter; all fifteen render and build.

- **No «المعنى:» label.** Every `=` paragraph (66) now reads as an explanation on its own, naming the speaker and,
  where it helps, the verse («يرى دُوَيْد قبره يُحفر…»، «يسخر طَرِيف ممن يتفرّسه…»، «ثم يقول في الخامس…»), in the
  third person instead of a bare first-person paraphrase. Two `=` lines that explained no verse were rewritten
  (hukama: the gloss on «صول» moved into the story; muammarun: verse 6 of al-Rabiʿ ibn Dabuʿ now gets its meaning
  before the Sibawayh point). Where our paraphrase only repeated the critic quoted after it, ours was cut (ritha,
  Aʿsha Bahila v. 25; wahida, Suwayd vv. 67 and 108; ritha, al-Khirniq).
- **One version per story.** The main version is told, and each other one gets a single sentence in its own wording,
  with its citation and no details: Bayhas (al-ʿAskari), Sinan's disappearance, Lujaym's verse, Abu Akhzam's
  proverb (amthal); ʿAbd Yaghuth's ransom, ʿAmr ibn Umama's killer (asra); ʿUfayra (al-Tabari), Malik ibn Zayd Manat, al-ʿAnbar's bucket, Ibn
  Mudad's verses (awail); Damra (al-Mufaddal), Umama's suitor (hukama); Zuhayr ibn Janab's death, ʿAbd al-Masih
  (Sayf), ʿAmr ibn Qamiʾa (muammarun); al-Fand's nickname, al-Harith ibn Zalim's end, ʿAmir ibn al-Tufayl's wound,
  Kaʿb's horse, Rayhana (Ishaq's version kept, as al-Baghdadi prefers it), Hani's speech (fursan); Qays ibn
  al-Hudadiyya's death, Abu al-Tamahan's release (saalik); both Muraqqishes, al-Munakhkhal's end, Ibn al-ʿAjlan's
  death, Khuzayma (ushshaq); Dakhtanus and «الصيف ضيعت اللبن», al-Muntashir's captive (ritha); Zayd ibn ʿAmr's death,
  Malik ibn al-ʿAjlan (hunafa); Abu Duʾad's neighbour (khayl); the Samawʾal siege, ʿIrar, Hajib's king (karam).
- **Disputes of little use cut to one line:** al-Khirniq's kinship to Tarafa and her husband's name, the size of
  Kisra's army against Iyad, Khidash's era, the attributions of al-Harith ibn Waʿla's verses, Yazid ibn al-Khadhdhaq's
  poem, Ghaylan's answer, Abu Hanbal's proverb, ʿAmr ibn Qamiʾa's verses (Zuhayr), Musafir's verse, Shimr and the
  king he killed.
- **No repetition of what the book now gives in full.** ʿAbd Yaghuth (asra): Part A gives the whole poem in «أيام
  العرب», so verses 3 and 10 and their meaning are dropped here; the section refers back by the first hemistich and
  keeps what is new, now told in order: Ruʾba's evening with the emir and «هذه إسلامية كلها» (العقد ج6 ص87; the
  Ayyam chapter no longer has it, so the old «ومرّ في أيام العرب» was wrong). Jalila (ritha): verses 8–9 and their
  meaning are in «أيام العرب» since note 9, so they are dropped here and referred to.
- **Verses quoted, not pointed to:** ʿAbd Qays's verse 8 («واترك محل السوء لا تحلل به», site
  `verses/a-jubaylu/008.yaml`); al-Kalhaba's sixth («أمرتكم أمري بمنعرج اللوى», as in the Durayd chapter);
  Khidash's «منصفة» («فعانقنا الكماة وعانقونا»); al-Musayyab's camel verse behind «استنوق الجمل» (Ibn Qutayba ج1 ص181,
  site `stories/istanwaqa-al-jamal.md`). Cut instead: Ibn Barri's verses of Aʿsur (unquoted, and pointing ahead to
  the muammarun chapter) and Abu Qurduda's «other verses» on al-Mundhir's two companions (unquoted, and a link no
  source makes). The Muraqqish/Muhalhil link now names the shared hemistich and cites العمدة ج1 ص308.
- **Terms explained simply:** العَروض (the end of the first half-line, Ibn Qutayba on al-Rabiʿ's verse), القطع
  (al-Khirniq), «كأنْ» (ʿIlbaʾ), the necessity behind «مئتين».
- **People at first mention:** Hudhayfa ibn Badr (Qays ibn Zuhayr), al-Makshuh, Salaʾa (Aʿsha Bahila's captive),
  Rabiʿa as the subject of «فخرّ ميتًا».
- **Vowels** where a misreading changes the meaning: «قُتِلَ» (×3), «يُعرَف», «حُمِلَ/حُمِلَت», «سُمِّي/سُمِّيَت»,
  «يُسَمّى» (×2), «نُسِبَت», «يُقتَل», «يُروى», «يَعرِف» (×2), «جُعِلَ», «تُعتِق», «رمى القومُ فرسَه», «يُسِرّ».
- **«ناصر الدين الأسد»:** the faces already use the full name (one place, hira).
- **Pages, before → after:** awail 4→4, hukama 7→7, muammarun 4→4, fursan 12→12, asra 4→3, saalik 3→3,
  ushshaq 5→5, ritha 5→5, hira 5→5, hunafa 5→5, hudhayl 4→4, wahida 5→5, amthal 4→4, khayl 3→3, karam 3→3.
- **Open.** The site's face pages (`src/content/people/*.md`) were not changed: most of these faults are in the book's
  wording, not in site facts. Al-Afwah's meteor poem is still named, not quoted, here and in «صحة الشعر الجاهلي»: no
  approved source in the repo gives its verse. ʿAmr ibn Umama's «حتى قتل وقال» (al-Marzubani) is left bare, as the
  reading is not certain.

## Part B: figures

The 14 figures' chapters (FIGURES in `book/tools/build-all.sh`), under the general rules and the second round. In all
of them: every `=` paragraph now opens as an explanation («يقول لابنه:»، «يسأل نفسه:»، «يفخر بثأره:»…); a story told in
several versions keeps one, and the others get one line in our own wording; disputes of little use (variant readings
of a word or verse, minor attributions, names) cut to a line; padding conclusions («فالروايات تتفق على جوهره…») cut;
ambiguous words vowelled (e.g. «نُسِب»، «عُرِف»، «قُتِل»، «فقَتَلَ الغلامَ»، «تَرْوى»، «تُسمّى»، «حُمِلَ عليهما حَمْلٌ»،
«المُحْدَثين»); «الأسد» alone → «ناصر الدين الأسد» (al-Shanfara ×3, Taʾabbata Sharran ×2). New quotations come from the
site's verse files or the source page, cited.

- **أوس بن حجر:** al-Hira incitement in Ibn Rashiq's version, Khizana in one clause; the Halima and Fadala poems now
  quoted by their opening (site `laamruka-ma-mallat`, `ya-aynu-la-budda`); the «three foreign words» verse quoted
  (Ibn Qutayba ج1 ص202); the «أودى» verse quoted; the meteor verse quoted (al-Hayawan ج6 ص461, site); the rain-poem
  attribution and «إذا أنت لم تعرض» disputes shortened. 7 → 7 pp.
- **المهلهل:** name dispute in two sentences; nickname quotes trimmed; the «أنكحها» attribution in one line; his death
  told here in Abu al-Faraj's one version (ʿAmr ibn Malik, the oath, the bad water), Ibn Qutayba's in a line, and the
  slaves' riddle referred to «أيام العرب» (which now tells only that); Imruʾ al-Qays's «كما بكى ابن خذام» quoted whole;
  «لام الاستغاثة» explained on «يا لَبَكْرٍ». 7 → 7.
- **أمية:** the Ibn Judʿan gift told in al-Zubayr's version with the two verses quoted («عطاؤك زين…», site
  `ataauka-zaynun`), Ibn al-Kalbi in a line; reasons for refusing Islam and death reports in a line each; the rooster
  and dove verses quoted (al-Hayawan ج4 ص355); «غذوتك» and «من لم يمت عبطة» attributions shortened; closing summary cut
  to what is not said before. 8 → 7.
- **عمرو بن كلثوم:** the Bakr–Taghlib hearing in Abu ʿAmr's version, the variants in one sentence, verse 18 quoted; the
  killing of ʿAmr ibn Hind trimmed and verse 45 quoted; his captivity and death in Abu al-Faraj's version, Ibn
  Qutayba's in a line; «سخينا» in one line; السناد explained simply. 19 → 18.
- **الحارث بن حلزة:** «حلزة» in one line; the curtain in Ibn al-Kalbi's version, the four others in one sentence;
  the improvisation variant in a line; the iqwaʾ of verse 37 explained as a teacher would (the rawi shown on verses
  1–2, then «مَاءِ السَّمَاءِ»), the dispute shortened. 17 → 16.
- **عبيد بن الأبرص:** dream story without the commentary; the plea verses' other setting in a line; Yawm al-Buʾs in
  Ibn Qutayba's version, the king and proverbs in a line, Maydani's other origin cut; the meter (مخلع البسيط, «رمل»)
  explained simply; minor reading notes (verses 4, 7, 20, 45) cut; التدوير defined; Imruʾ al-Qays's eagle verse quoted;
  Lyall introduced (as in «صحة الشعر الجاهلي»); the «لا تبكني» attribution shortened. 12 → 11.
- **علقمة:** Shaʾs in Ibn Qutayba's version, al-Mufaddal and Abu ʿUbayda in a line each; the Ghassanid king in one
  clause; the Medina incident now quotes the opening hemistich; verse 26 and the Umm Jundab variants in a line; the
  attribution of «ذهبت من الهجران» shortened. 7 → 7.
- **عدي بن زيد:** al-Nuʿman's accession, the cause of the prison and the killer in one version each; Ibn Marina
  introduced plainly; the Hind story and the sermon story trimmed; verse 21 dispute in a line; the zina verses now
  quoted by a hemistich (Ibn Qutayba ج1 ص226). 8 → 7.
- **بشر بن أبي خازم:** Aws ibn Haritha story in Ibn Qutayba's version, the two others in one sentence; the death-poem
  dispute shortened; the iqwaʾ explained on «جُذَامُ» / «الشَّآمِي», who warned him in a line; riwaya notes cut. 7 → 6.
- **دريد بن الصمة:** his escape at al-Liwa in Abu ʿUbayda's version, Ibn Qutayba's in a line; ʿAmra's elegy now quoted
  (Sira ج2 ص454); the killer's name and «أعاذل إنما أفنى شبابي» in a line each. 6 → 5.
- **الشنفرى:** name dispute in one sentence; the oath in Abu Hisham's version, the other two in a line; Haram ibn Jabir
  introduced; his death in one version, the hundredth-man legend in a line; two side points in the Lamiyya dispute
  cut; the Bajila raid reference now matches the one version kept in Taʾabbata Sharran. 8 → 7.
- **تأبط شرًّا:** his father's name in a line; the nickname in one version (the vipers), the others in a line; the Abu
  Kabir story in one version, the opposite one in a line; the Bajila raid in Abu Baraka's version, al-Mufaddal's in a
  line; the ghoul and «إن بالشعب» attributions shortened. 7 → 7.
- **عروة بن الورد:** the companions of the kanif and Salma each in one version, others in a line; the closing
  attributions shortened. 7 → 7.
- **حاتم:** the boy and the riders, the night of the horse and the Mawiyya suitors each in one version; the «أيا
  ابنة عبد الله» and «أريني جوادًا» attributions shortened. 7 → 7.

Total for the figures: 127 → 119 pages (each chapter built alone). No site files changed. Open: the mother's verses
that urged Durayd to revenge are named but not quoted, because neither the site nor Ibn Qutayba (ج2 ص740) gives them.

## Part B: formative poets

The general rules and the second round applied to the eight poets' chapters (`imru-al-qais`, `tarafa`, `zuhayr`,
`al-nabigha`, `al-asha`, `antara`, `labid`, `al-khansa`). `fn-sources-last.py` changed nothing; all eight render and
build. Pages, each chapter built alone, before → after: Imruʾ al-Qays 22 → 22, Tarafa 20 → 20, Zuhayr 19 → 18,
al-Nabigha 19 → 19, al-Aʿsha 19 → 19, ʿAntara 24 → 24, Labid 25 → 25, al-Khansa 16 → 15 (164 → 162). No site files
changed.

- **No «المعنى:» label.** Every `=` paragraph that began with a bare paraphrase now opens as an explanation, in a few
  words and in the third person («يقول لصاحبه: لا تبكِ…»، «يقول عن ملوك غسّان: صنعوا بي…»، «ثم يقول في البيت الحادي
  والأربعين إنه حمل فقتل…»، «تسأل: أقذًى ألمّ بعينكِ…»): about 60 paragraphs, among them all the single verses from
  the other poems.
- **One version per story.** The main version is told; each other gets one sentence in its own wording, with its
  citation and without its details. Imruʾ al-Qays: his father's death (the version Dayf prefers kept, Ibn Qutayba's
  «اليوم خمر» version in one line with Dayf's reasons, which the ʿAbid chapter refers back to), his expulsion.
  Tarafa: his death. Zuhayr: the two chiefs who paid the blood money, his regret over the hija of Banu ʿUlaym, the
  poem that won back Yasar, ʿUmar's «شاعر الشعراء». al-Nabigha: the cause of his flight (al-Mutajarrida kept), the
  poem slipped to the king, the king's illness, the iqwaʾ story, ʿUmar and the Ghatafan delegation, the tent at
  ʿUkaz. al-Aʿsha: the nickname, Kisra and «لص», al-Muhallaq, his death, the forged verse. ʿAntara: «كرّ وأنت حرّ»
  (and its retelling under verse 70 cut to a back-reference), his death, the first poem, al-Furuq. Labid: al-Rabiʿ,
  his Islam, the Kufa reply, his death date and age, ʿUthman ibn Mazʿun. al-Khansa: Muʿawiya's raid, Sakhr's wife and
  death, the sidar, ʿUmar, the siniyya. The «فالروايات تتفق… وتختلف…» sentences that summed up the dropped versions
  went with them.
- **Disputes of little use cut to one line:** who Shaddad was to ʿAntara, who killed Muʿawiya and Hashim, the subject
  of «بنى» in Labid's verse 83, the variant of al-Aʿsha's verse 26 (al-Sirafi, Mabraman, Ibn al-Mustawfi), whom «يا
  شاة ما قنص» means, al-Nabigha's nickname.
- **Verses quoted where the text points to them:** Imruʾ al-Qays «كأني لم أركب جوادا» with its pair, the second verse
  of «أرانا موضعين», «أبعد الحارث الملك ابن عمرو»; Zuhayr's two verses given to Khawwat and to ʿUmayr ibn al-Sammaʾ,
  al-Zawzani's added wisdom verses; al-Nabigha's verse 16 of the ʿayniyya, the mimiyya, the verse given to
  al-Hutayʾa, the forged nasib before the ʿUqur poem, the illness poem, «أتيتك عاريا»; al-Aʿsha «قد بتّ رائدها»
  and «وقبلك ساعيت»; al-Khansa's two verses outside Thaʿlab's recension and verses 5 and 26 of «ألا ما لعينك».
- **Technical matters said simply:** الجر بالمجاورة, الالتفات (defined at first use), the Hijazi and Tamimi exception
  in «إلا أواريَّ», تقديم المحدَّث عنه («نحن… ندعو»), the «رُبّ» clause in al-Aʿsha's 33–35, the noun كاف in «كالطعن»,
  «الفصل بين الصلة والموصول», الخرم, التتميم, the ترصيع pattern shown on «حمّال ألويةٍ هبّاط أوديةٍ شهّاد أنديةٍ»,
  جموع القلة in Hassan's «الجفنات».
- **People introduced at first mention:** al-Haytham ibn ʿAdi, ʿUmar ibn Shabba, Ibn Daʾb, Abu al-Yaqzan (akhbaris);
  Yunus ibn Habib and Ruʾba; Khalid ibn Kulthum; al-Mundhir ibn Maʾ al-Samaʾ; ʿAmr ibn Qamiʾa; ʿAbd ʿAmr ibn Bishr
  («أخته زوجةَ…», and «مازحَ الملكُ عبدَ عمرو»); Abu Jaʿfar Ahmad ibn ʿUbayd in Tarafa; al-Tirimmah; Saʿid ibn al-ʿAs;
  al-Shaʿbi and al-Akhtal; al-Harith ibn Abi Shamir; Ishaq al-Mawsili; Mahmud al-Warraq; Louis Cheikho (d. 1927);
  al-Baghdadi of the Khizana; Qays ibn Maʿdikarib; ʿAlqama ibn ʿUlatha; al-Mansur; Abu Baraʾ; al-Aghlab al-ʿIjli;
  Ibn Sida; al-Tusi; Ibn Hajar; al-Waqidi.
- **Vowels:** «فظلم أخوالُه أمَّه»، «يَقبَلُ منه»، «يُسمّي كُبَرَ قصائده»، «وُضِع لشدة الحرب»، «فيَقبَلُ قولَ»، «نُحِل»،
  «زُيِّفت أخباره»، «وقَتَلَ دُرَيْدَ بنَ حَرْمَلة»، «أَسْرَ كلام»، «يُقبِل على نفسه».
- **Padding cut:** al-Khansa's closing summary of her standing reduced to its conclusion; the restating sentences
  after the dropped versions.
- **Open:** Durayd's siniyya that al-Khansa answered is named but not quoted (no verse file); the verses al-Shaʿbi
  recited for al-Nabigha before ʿAbd al-Malik are not identified; the three verses of Imruʾ al-Qays in Ibn Sallam's
  «ينعى على نفسه» are not named in the sources at hand, so the sentence now says only that he cited verse 26; al-Aʿsha's
  verses 39–40 against ʿAlqama stay unquoted, since they name the sexual organs.
