import type { APIRoute } from "astro";
import { slashedSitemap } from "../lib/sitemap";

export const GET: APIRoute = ({ site, url }) =>
	slashedSitemap("haberler", "/haberler/", (site ?? url).origin);
