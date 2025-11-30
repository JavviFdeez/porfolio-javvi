import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.javvi.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
});
