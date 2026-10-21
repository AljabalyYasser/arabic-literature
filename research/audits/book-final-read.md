# Final reading: points for the owner

Each reader logs here, under its part, what needs the owner's decision. Clear errors are fixed in place, not logged here.

## Part 1: introduction, topics, Imruʾ al-Qays, Tarafa

## Part 2: Zuhayr to al-Khansa

1. **Our own reading in al-Nabigha** (البائية, the paragraph after verse 7). Ibn Rashiq says that arguing one's case
   before kings is a mistake, yet he ranks this poem, which argues its case, among the best apologies. The book settles
   the contradiction with «ولعل ذلك لأن النابِغة لم يقدّم حجته وحدها، بل وضعها بين قسم قبلها ومدح وتضرّع بعدها…».
   No source says this. The site's page labels it «وهذه قراءتنا», but the book leaves the label out, against the rule
   of no impressions of our own. The owner should choose one of three options:
   - keep it and label it as our reading;
   - state the contradiction without settling it;
   - cut the sentence.
2. **Rhetorical definitions quoted in full more than once.**
   - ʿAbd al-Qahir's definition of kināya («…ولكن يجيء إلى معنى هو تاليه وردفه في الوجود») appears four times:
     - Ayyam al-Arab;
     - Zuhayr, «قد جعل المبتغون الخير في هرم»;
     - al-Nabigha, «كليني لهمّ»;
     - al-Khansa, «طويل النجاد», which is ʿAbd al-Qahir's own example.
   - His phrase for tamthīl, «محصّلاً بضرب من التأوّل», appears twice: in Zuhayr (the mill, verse 31) and in al-Nabigha
     (the girl and the doves, verse 27).
   - Ibn Rashiq's «وأولى ما تكرر فيه الكلام باب الرثاء» appears in Ayyam al-Arab and again in al-Khansa.

   Each quote gives the critic's point for its own hinge verse, so I left them all in place. The owner should decide
   between two options:
   - define each device once, at its first use, and only name it after that;
   - keep every verse's point complete on its own, so that a chapter can be read alone.
3. **Two verse glosses have no source.** In both places the site's text gives no source either:
   - al-Nabigha, «أتاني أبيت اللعن», verse 7: «اصطنعتهم: أحسنت إليهم».
   - al-Aʿsha, «بانت سعاد», verse 2: «نكرت: أنكرت. والصلع: ذهاب شعر مقدّم الرأس».

   The rule asks for glosses taken from the commentators. The owner should decide whether a gloss this plain can stand
   without a source, or whether a source must be found (most likely the Lisan) and added to both the site and the book.
   Two other glosses in al-Aʿsha («ما بكاء الكبير», verses 2 and 37) also had no source in the book, but the site's
   verse files cite the Lisan for them, so I added those sources.

## Part 3: the fourteen figures

## Part 4: the faces and the bibliography

1. **Two cited books are missing from the bibliography.** `thabt.py` leaves out:
   - al-Baghdadi's «خزانة الأدب», cited as «البَغْداديّ، خزانة الأدب» in 26 chapters, about 180 times;
   - al-Amidi's «المؤتلف والمختلف», cited in fursan, asra, khayl and amthal.

   The cause is in `keys()`. When an author has two cards (al-Baghdadi has `khizana` and `baghdadi-mughni`; al-Amidi has
   `amidi` and `muwazana`), his name stops working as a key. The footnotes then cite a two-word short title, but
   the script only tries the full title and its first three words. A one-line fix, after
   `if single.get(a) == 1: ks.add(a)`:

   ```
   else: ks.add(a + '، ' + ' '.join(t.split()[:2]))
   ```

   It tries «البغدادي، خزانة الأدب،» and «الآمدي، المؤتلف والمختلف،». I tested it on a copy in the scratchpad: it
   adds exactly these two entries and nothing else. Al-Hamawi's «خزانة الأدب» and Shawqi Dayf's «الأدب العربي المعاصر» stay
   out, though a bare two-word key would have pulled them in. I did not change the script or `thabt.txt`.
2. **Bibliography entries with no edition**, because their cards have no publisher or edition:
   - «المعمّرون والوصايا»;
   - «الموشّح»;
   - «أسواق العرب».

   «جمهرة أشعار العرب» gives a publisher only. Two cards also print a working note in the entry:
   - Tufayl: «(من صفحة العنوان وظهرها)»;
   - ʿAlqama: «(السنة والمطبعة من بيانات المصوّرة، وليستا في صفحة العنوان)».

   The owner should decide whether to complete these cards or print the entries as they are.
3. **al-Tabrizi's «شرح ديوان الحماسة».**
   - The card, and so the bibliography, says «جزء واحد», yet the footnotes across the book cite ج1 and ج2. The Shamela
     copy the card links to has two parts.
   - karam (السموأل, the end of the لامية paragraph) cites «التِّبْرِيزِيّ، شرح ديوان الحماسة، نشرة فرايتاغ، ص51، ص54».
     The bibliography does not list the Freytag edition.

   The owner should decide whether to correct the card's edition and give the Freytag edition its own card, or to
   name Freytag in the existing card.
4. **Verse numbers clash between two chapters for Sakhr's «أرى أم صخر».** al-Khansa (Part 2) numbers «أهمّ بأمر الحزم» as
   verse 3. asra numbers «فأيّ امرئ ساوى بأمّ حليلة» as verse 3, following al-Asmaʿi and the site's verse files, where
   «أهمّ» is verse 4. One of the two should change. I left both as they are, because the al-Khansa chapter belongs to Part 2.
5. **Glosses with no source** (Part 2, item 3, is the same question). Nineteen verse footnotes in Part 4 give plain
   glosses with no source, and the site's verse files give none either:
   - hukama: Qus v1, al-Adbat v4, Zabban v3;
   - fursan: al-Find v8, Qays ibn Zuhayr v4, Ibn al-Itnaba v4;
   - ritha: Jalila v9, Dakhtanus v5;
   - hira: Laqit v6, al-Mutalammis v11–13, Abu Qurduda v1–2;
   - hunafa: Zayd ibn ʿAmr v1–2, Qays ibn al-Khatim v2, Malik ibn al-ʿAjlan v1;
   - karam: al-Samawʾal v1.

   I added a source only where the site's verse file has one: Ibn Qutayba, for «العاقر» in ʿAmir ibn al-Tufayl's v8.
6. **ʿAbd al-Qahir's kināya phrase** (Part 2, item 2). awail uses it once more, in a short form, for ʿUfayra's
   «تمشي في الدماء»: «تاليه وردفه في الوجود». It goes the way the owner decides for item 2.
7. **Two Abu ʿAmrs in hukama** (ذو الإصبع). The report on the end of ʿAdwan and the waṣiyya are «عن أبي عمرو». The
   next sentence names «أبي عمرو بن العلاء» in full. A reader will take the first to be Ibn al-ʿAlaʾ too, but he may be
   Abu ʿAmr al-Shaybani. The Aghani text (vol. 3, p. 103) does not say which in the OCR I could read, and the site's
   page leaves it open. I left it as it is.
