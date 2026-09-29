import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://arabic-literature.aljabalyyasser.workers.dev',
  trailingSlash: 'always',
  integrations: [mdx()],
  devToolbar: { enabled: false },
  // صارت المحطات فصولًا في بنية العصور والأعلام (2026-09-29)، فتُحال روابطها القديمة إلى مواضعها الجديدة.
  redirects: {
    '/path/0-1': '/path/0/kayfa-taqra/',
    '/path/0-2': '/path/0/kharitat-al-rihla/',
    '/path/1-1': '/path/1/al-sahra/',
    '/path/1-2': '/path/1/ayyam-al-arab/',
    '/path/1-3': '/path/1/al-muallaqat/',
    '/path/1-4': '/people/imru-al-qais/hayatuhu/',
    '/path/1-5': '/people/imru-al-qais/al-muallaqa-1/',
    '/path/1-6': '/people/imru-al-qais/al-muallaqa-2/',
    '/path/1-7': '/people/tarafa/hayatuhu/',
    '/path/1-8': '/people/tarafa/al-muallaqa-1/',
    '/path/1-9': '/people/tarafa/al-muallaqa-2/',
  },
});
