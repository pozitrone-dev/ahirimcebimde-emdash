import { getEmDashCollection } from "emdash";

/**
 * Sitemap for a collection whose public URLs end with a slash (blog and
 * news, same as the old ahirimcebimde.com). EmDash's built-in
 * /sitemap-{collection}.xml drops the trailing slash, which would point
 * Google at a redirect, so these two collections are served from here.
 */
export async function slashedSitemap(
	collection: "posts" | "haberler",
	prefix: string,
	origin: string,
) {
	const { entries } = await getEmDashCollection(collection, {
		orderBy: { published_at: "desc" },
		limit: 1000,
	});
	const urls = entries
		.map((e) => {
			const d = e.data as any;
			if (d.seo?.noIndex) return null;
			const lastmod = (d.updatedAt ?? d.publishedAt) as Date | undefined;
			return `  <url>
    <loc>${origin}${prefix}${encodeURI(e.id)}/</loc>${lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}
  </url>`;
		})
		.filter(Boolean)
		.join("\n");
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
		{
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600",
			},
		},
	);
}
