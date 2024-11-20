import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pksvv.github.io/astroblog', // Update with your GitHub Pages URL
  base: '/astroblog/', // Add this line for GitHub Pages deployment
  integrations: [
    mdx(), 
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
});
