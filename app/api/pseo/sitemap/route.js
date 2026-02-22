// app/api/pseo/sitemap/route.js — Dynamic XML sitemap for pSEO pages
// Returns a valid sitemap.xml with all generated pSEO URLs.
// Link this from your main sitemap or robots.txt.

import { getAllRoutes } from "@/libs/pseo-generator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://solidwrite.com";

export async function GET() {
  const routes = getAllRoutes();
  const today = new Date().toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}/${route.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.playbook === "comparisons" ? "0.9" : route.playbook === "glossary" ? "0.6" : "0.8"}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}