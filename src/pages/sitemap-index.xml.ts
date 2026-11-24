import type { APIRoute } from "astro";

// The old ahirimcebimde.com sitemap address, still registered in Search
// Console. EmDash serves the sitemap at /sitemap.xml.
export const GET: APIRoute = ({ redirect }) => redirect("/sitemap.xml", 301);
