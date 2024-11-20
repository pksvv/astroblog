import rss from '@astrojs/rss';

export async function GET() {
  const postImportResult = import.meta.glob('./blog/*.{md,mdx}', { eager: true });

  // Transform the imported posts into an array
  const posts = Object.values(postImportResult);

  // Filter and sort the posts
  const sortedPosts = posts
    .filter((post) => post.frontmatter && !post.url?.includes('index')) // Ensure valid frontmatter and exclude index
    .sort(
      (a, b) =>
        new Date(b.frontmatter.pubDate).getTime() -
        new Date(a.frontmatter.pubDate).getTime()
    );

  // Generate the RSS feed
  return rss({
    title: 'Your Blog',
    description: 'A Medium-style blog built with Astro',
    site: import.meta.env.SITE,
    items: sortedPosts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.pubDate,
      link: post.url,
    })),
    customData: `<language>en-us</language>`,
  });
}
