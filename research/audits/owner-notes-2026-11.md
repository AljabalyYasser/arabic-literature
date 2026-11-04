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
2. **حرب البسوس still gives every version.** Apply the one-version rule.
3. **p. 20, «واختلفوا في قتل لقيط»:** one line is enough. **General:** a dispute of little use to the reader (who killed
   a minor figure, and so on) is summarised in one line; full disputes are kept for questions that matter.
4. **al-Kulab al-Thani:** «فبين» should be «بين».
5. **p. 23, «وكان العبشمي أهوج»:** wrong. Introduce the young man who captured ʿAbd Yaghuth normally at first mention:
   «أسره فتى من بني … اسمه …».
6. **The label «المعنى:» is dropped across the book.** The explanation must read as an explanation without it:
   «يقول هنا…»، «وفي البيت الثاني…». (render.py no longer prints the label.)
7. **p. 27, «وفي البيتين صدى لبيتين لامرئ القيس»:** name the two verses, at least their first hemistichs. Never point to
   verses without quoting them.
8. **The hanging of the Muʿallaqat:** give the gist the reader needs, then the disagreements in a few lines, saying the
   matter is conjecture, not certain. No long account.
9. **The poets of the Muʿallaqat:** names only, with a line saying each is introduced in his own chapter. No
   introductions that the book repeats later.
10. **«الأسد» alone is an error** (pp. 47 and 55, and wherever else): write «ناصر الدين الأسد» every time.
11. **The judgement of a single text:** the examples are good; put each example through its questions as a dialogue
    with the reader («فما أقدم مصدر رواه؟ …»). Replace «ولكل سؤال مثال» with something like «ولنضرب أمثلة يتضح بها ذلك».
