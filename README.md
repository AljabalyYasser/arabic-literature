# الشعر والأدب العربي

رحلة في تاريخ الأدب العربي وشعره، من الجاهلية إلى أيامنا، عصرًا بعد عصر: خريطة العصر أولًا، ثم أعلامه على ثلاث درجات، ثم نصوصه تُقرأ بيتًا بيتًا، ثم ما يبقى منها في المحفوظات. وكل معلومة معها مصدرها.

- **الوثيقة الحاكمة للمشروع:** [docs/foundation.md](docs/foundation.md)
- **دليل كتابة المحتوى:** [docs/content-guide.md](docs/content-guide.md)
- **نظام الأعلام:** [docs/alam.md](docs/alam.md)، وخريطة العصر الجاهلي: [docs/jahili-map.md](docs/jahili-map.md)

## التقنية

- [Astro](https://astro.build) يبني صفحة HTML ثابتة لكل عصر وقضية وعلَم ومرحلة ونص وبيت.
- المحتوى ملفات Markdown وMDX وYAML في `src/content/`، ويُتحقق من بنيتها ومراجعها عند كل بناء.
- [Pagefind](https://pagefind.app) للبحث، بلا خادم.
- النشر على Cloudflare Workers (أصول ثابتة) من فرع `main`، عبر GitHub Actions (`.github/workflows/deploy.yml`).

## التشغيل

```sh
npm install
npm run dev       # معاينة محلية
npm run build     # بناء الموقع وفهرس البحث في dist/
npm run preview   # تشغيل النسخة المبنية عبر Wrangler
```

## النشر

عند كل دفع إلى `main` يعمل `.github/workflows/deploy.yml` على GitHub Actions:

1. يثبّت الحزم ويبني الموقع (`npm ci` ثم `npm run build`).
2. يرفعه إلى Cloudflare بـ`npx wrangler deploy`.
3. يتحقق من أن الصفحات المنشورة تطابق المبنية حرفًا، فإن لم تتطابق فشل النشر.

ويحتاج سرًّا واحدًا في إعدادات المستودع: `CLOUDFLARE_API_TOKEN`، وهو رمز Cloudflare بقالب «Edit Cloudflare Workers». ويمكن تشغيله يدويًا من تبويب Actions (Run workflow).

ولا نعتمد على خدمة البناء في Cloudflare (Workers Builds): تعطّلت صباح 3 أكتوبر 2026 فتأخر نشر ثلاثة دمجات، وسجلاتها لا تُقرأ إلا من لوحة Cloudflare. ومجلد النشر وخيارات الروابط محددة في `wrangler.jsonc`.
