const fs = require('fs');
const path = require('path');

// Import Sanity client (using require since this is a Node script)
const groq = require('groq');
const sanityClient = require('@sanity/client');

const baseUrl = process.env.HOST_URL || process.env.SITE_URL || 'https://dylanyoung.dev';

// Create Sanity client (matching the client.ts configuration)
const client = sanityClient({
  projectId: process.env.projectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lanua4su',
  dataset: process.env.dataset || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: 'v2021-10-21',
});

async function fetchPosts() {
  try {
    // Fetch ALL posts for the RSS feed (no limit)
    const posts = await client.fetch(
      groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}}`
    );
    console.log(`✓ Fetched ${posts.length} posts for RSS feed`);
    return posts;
  } catch (error) {
    console.error('Error fetching posts for RSS:', error);
    return [];
  }
}

function generateRSSFeed(posts = []) {
  const rssItems = posts.map((post) => {
    const postUrl = `${baseUrl}/insights/${post.slug.current}`;
    const pubDate = post.publishedAt 
      ? new Date(post.publishedAt).toUTCString()
      : new Date().toUTCString();
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.categories && post.categories.length > 0 
        ? post.categories.map((cat) => `<category><![CDATA[${cat.title}]]></category>`).join('\n      ')
        : ''
      }
      ${post.landscapeImageUrl || post.mainImageUrl
        ? `<enclosure url="${post.landscapeImageUrl || post.mainImageUrl}" type="image/jpeg" />`
        : ''
      }
      <author>dylan@dylanyoung.dev (Dylan Young)</author>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Dylan Young - Sitecore Developer &amp; Technical Influencer</title>
    <link>${baseUrl}</link>
    <description>The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer. Blog posts about Sitecore, AI/ML, .Net, Python, React, and TypeScript.</description>
    <language>en-US</language>
    <managingEditor>dylan@dylanyoung.dev (Dylan Young)</managingEditor>
    <webMaster>dylan@dylanyoung.dev (Dylan Young)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/images/dylan.jpg</url>
      <title>Dylan Young</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  const outputPath = path.join(__dirname, '../public/feed.xml');
  fs.writeFileSync(outputPath, rss, 'utf8');
  console.log('✓ Generated RSS feed at /feed.xml');
}

// Export for use in build scripts
if (require.main === module) {
  // Fetch posts and generate RSS feed
  fetchPosts()
    .then((posts) => {
      generateRSSFeed(posts);
    })
    .catch((error) => {
      console.error('Error generating RSS feed:', error);
      process.exit(1);
    });
}

module.exports = { generateRSSFeed, fetchPosts };

