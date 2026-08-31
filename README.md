# الشعر والأدب العربي — V1

نسخة أولى ثابتة بالكامل من مرجع شخصي تفاعلي للشعر والأدب العربي، مبنية بنفس فلسفة مشروع `arab-genealogy`: واجهة واحدة، مستويان للقراءة، بيانات منظمة منفصلة، Accordion، دليل بحث محلي، ومنهج واضح للتحقيق والخلاف.

## التقنيات

- HTML
- CSS
- JavaScript خام
- ملفات بيانات JavaScript منظمة
- GitHub Pages

لا Backend، لا قاعدة بيانات، لا CMS، ولا Framework.

## هيكل المشروع

```text
arabic-literature-v1/
├── .nojekyll
├── README.md
├── index.html
└── assets/
    ├── styles.css
    ├── app.js
    └── data/
        ├── eras.js
        ├── poets.js
        ├── poems.js
        ├── verses.js
        ├── sources.js
        └── terms.js
```

## نموذج العلاقات

- العصر يحتوي مراجع `poetIds` و`featuredPoemIds`.
- الشاعر يحمل `eraId` و`poemIds`.
- القصيدة تحمل `poetId` و`verseIds` و`sourceIds`.
- البيت يحمل `poemId` وتحليلاته و`sourceIds`.
- لا تتكرر البيانات الأساسية للشاعر أو القصيدة بين الأقسام.

## تشغيل محلي

يمكن فتح `index.html` مباشرة لأن البيانات محملة كملفات JavaScript محلية، أو تشغيل أي خادم Static بسيط أثناء التطوير.

## ملاحظة علمية

المحتوى الموجود حاليًا Fixture لاختبار البنية والتفاعل. لا يعد اعتمادًا نهائيًا للنصوص أو الشروح أو الإحالات العلمية.

**Prepared and Designed By : Yasser Ahmed**
