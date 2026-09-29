# الشعر والأدب العربي

رحلة في تاريخ الأدب العربي وشعره، من الجاهلية إلى أيامنا، عصرًا بعد عصر: خريطة العصر أولًا، ثم أعلامه على ثلاث درجات، ثم نصوصه تُقرأ بيتًا بيتًا، ثم ما يبقى منها في المحفوظات. وكل معلومة معها مصدرها.

- **الوثيقة الحاكمة للمشروع:** [docs/foundation.md](docs/foundation.md)
- **دليل كتابة المحتوى:** [docs/content-guide.md](docs/content-guide.md)
- **نظام الأعلام:** [docs/alam.md](docs/alam.md)، وخريطة العصر الجاهلي: [docs/jahili-map.md](docs/jahili-map.md)

## التقنية

- [Astro](https://astro.build) يبني صفحة HTML ثابتة لكل عصر وقضية وعلَم ومرحلة ونص وبيت.
- المحتوى ملفات Markdown وMDX وYAML في `src/content/`، ويُتحقق من بنيتها ومراجعها عند كل بناء.
- [Pagefind](https://pagefind.app) للبحث، بلا خادم.
- النشر على Cloudflare Workers (أصول ثابتة) من فرع `main`.

## التشغيل

```sh
npm install
npm run dev       # معاينة محلية
npm run build     # بناء الموقع وفهرس البحث في dist/
npm run preview   # تشغيل النسخة المبنية عبر Wrangler
```

## إعدادات Cloudflare

| الإعداد | القيمة |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |

مجلد النشر وخيارات الروابط محددة في `wrangler.jsonc`.
