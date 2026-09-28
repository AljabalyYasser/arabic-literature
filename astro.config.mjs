import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://arabic-literature.aljabalyyasser.workers.dev',
  trailingSlash: 'always',
  integrations: [mdx()],
  devToolbar: { enabled: false },
});
