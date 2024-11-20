import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET({ site }) {
  // Define static routes for your project
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/blog', changefreq: 'weekly', priority: 0.9 },
    { url: '/blog/first-post', changefreq: 'monthly', priority: 0.7 },
    { url: '/resume', changefreq: 'yearly', priority: 0.7 },
  ];

  // Initialize SitemapStream
  const smStream = new SitemapStream({ hostname: site });

  // Add pages to the sitemap
  for (const page of pages) {
    smStream.write(page);
  }

  // Finalize the stream and return the sitemap
  smStream.end();
  const sitemap = await streamToPromise(smStream);

  return new Response(sitemap.toString(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
