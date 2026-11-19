import type { APIRoute } from 'astro';
import data from '../data/tools.json';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://goodfinds.tech';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/explore`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/compare`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/collections`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/submit`, priority: '0.6', changefreq: 'monthly' },
    { url: `${baseUrl}/saved`, priority: '0.5', changefreq: 'monthly' },
  ];

  const collectionPages = data.collections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const toolPages = data.tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.id}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticPages, ...collectionPages, ...toolPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
