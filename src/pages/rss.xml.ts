import type { APIRoute } from "astro";
import { getEmDashCollection, getSiteSettings } from "emdash";

import { SITE_DESC, SITE_NAME, newsTitle, ptText } from "../lib/site";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = site ?? new URL(url.origin);
	const settings = await getSiteSettings();
	const siteTitle = SITE_NAME;
	const siteTagline = settings?.tagline || SITE_DESC;

	// Blog posts and news, newest first, at their old ahirimcebimde.com URLs.
	const [{ entries: posts }, { entries: news }] = await Promise.all([
		getEmDashCollection("posts", { orderBy: { published_at: "desc" }, limit: 20 }),
		getEmDashCollection("haberler", { orderBy: { published_at: "desc" }, limit: 20 }),
	]);
	const all = [
		...posts.map((p) => ({ path: `/blog/${p.id}/`, data: p.data as any, summary: p.data.excerpt })),
		...news.map((n) => ({ path: `/haberler/${n.id}/`, data: { ...(n.data as any), title: newsTitle(n.data) }, summary: ptText((n.data as any).icerik) })),
	]
		.filter((e) => e.data.publishedAt)
		.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
		.slice(0, 30);

	const items = all
		.map((post) => {
			const pubDate = post.data.publishedAt.toUTCString();

			const postUrl = new URL(post.path, siteUrl).href;
			const title = escapeXml(post.data.title || "Başlıksız");
			const description = escapeXml(String(post.summary || "").slice(0, 300));

			return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
		})
		.filter(Boolean)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteTagline)}</description>
	<link>${siteUrl.href}</link>
	<atom:link href="${new URL("/rss.xml", siteUrl).href}" rel="self" type="application/rss+xml"/>
    <language>tr-tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};

const XML_ESCAPE_PATTERNS = [
	[/&/g, "&amp;"],
	[/</g, "&lt;"],
	[/>/g, "&gt;"],
	[/"/g, "&quot;"],
	[/'/g, "&apos;"],
] as const;

function escapeXml(str: string): string {
	let result = str;
	for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
		result = result.replace(pattern, replacement);
	}
	return result;
}
