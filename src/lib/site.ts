/**
 * Ahırım Cebimde theme constants and fallback navigation.
 *
 * Menus are managed in the EmDash admin (Menus): "primary" (header),
 * "footer" (footer columns) and "legal" (bottom row). When a menu is
 * missing or empty, the fallbacks below are used so the site never renders
 * without navigation.
 */
import type { MenuItem } from "emdash";

export const LOGIN = "https://giris.ahirimcebimde.com/giris";
export const APPSTORE = "https://apps.apple.com/app/id6779227305";
export const PLAY =
	"https://play.google.com/store/apps/details?id=com.pozitrone.farmos";
export const EMAIL = "pozitrone@icloud.com";
export const DEFAULT_INSTAGRAM = "https://www.instagram.com/ahirimcebimde/";
export const DEFAULT_FACEBOOK = "https://www.facebook.com/1402309502960736";
export const SITE_NAME = "Ahırım Cebimde";
export const SITE_DESC =
	"Süt ve besi çiftlikleri için sürü yönetimi uygulaması. Hayvan, süt, üreme, sağlık, yem ve gelir-gider kayıtları tek yerde.";

type Item = { label: string; url: string; children?: Item[] };

let n = 0;
function toMenu(items: Item[]): MenuItem[] {
	return items.map((i) => ({
		id: `fallback-${n++}`,
		label: i.label,
		url: i.url,
		children: toMenu(i.children ?? []),
	}));
}

export const FALLBACK_PRIMARY = toMenu([
	{ label: "Özellikler", url: "/#ozellikler" },
	{
		label: "Keşfet",
		url: "#",
		children: [
			{
				label: "Sürü",
				url: "#",
				children: [
					{ label: "Hayvan kayıtları", url: "/#ozellikler" },
					{ label: "Üreme", url: "/#ureme" },
					{ label: "Süt", url: "/#sut" },
				],
			},
			{
				label: "İşletme",
				url: "#",
				children: [
					{ label: "Besleme ve besi", url: "/#besleme" },
					{ label: "Gelir / Gider", url: "/#finans" },
					{ label: "Veteriner Hekime Sor", url: "/#veteriner" },
				],
			},
			{
				label: "Kaynaklar",
				url: "#",
				children: [
					{ label: "Blog", url: "/blog/" },
					{ label: "Rehber yazıları", url: "/blog/#rehber" },
					{ label: "Haberler", url: "/haberler/" },
					{ label: "Sık sorulan sorular", url: "/sss" },
					{ label: "Yardım ve destek", url: "/destek" },
				],
			},
			{
				label: "Ahırım Cebimde",
				url: "#",
				children: [
					{ label: "Hakkımızda", url: "/hakkimizda" },
					{ label: "İletişim", url: "/iletisim" },
					{ label: "App Store", url: APPSTORE },
					{ label: "Google Play", url: PLAY },
				],
			},
		],
	},
	{ label: "Veteriner", url: "/#veteriner" },
	{ label: "Blog", url: "/blog/" },
	{ label: "Haberler", url: "/haberler/" },
]);

export const FALLBACK_FOOTER = toMenu([
	{
		label: "Uygulama",
		url: "#",
		children: [
			{ label: "Sürü", url: "/#ozellikler" },
			{ label: "Süt", url: "/#sut" },
			{ label: "Üreme", url: "/#ureme" },
			{ label: "Besleme ve besi", url: "/#besleme" },
			{ label: "Gelir / Gider", url: "/#finans" },
		],
	},
	{
		label: "Kaynaklar",
		url: "#",
		children: [
			{ label: "Blog", url: "/blog/" },
			{ label: "Rehber yazıları", url: "/blog/#rehber" },
			{ label: "Haberler", url: "/haberler/" },
			{ label: "Sık sorulan sorular", url: "/sss" },
			{ label: "Yardım ve destek", url: "/destek" },
			{ label: "Veteriner Hekime Sor", url: "/#veteriner" },
		],
	},
	{
		label: "Ahırım Cebimde",
		url: "#",
		children: [
			{ label: "Hakkımızda", url: "/hakkimizda" },
			{ label: "İletişim", url: "/iletisim" },
		],
	},
	{
		label: "Başlayın",
		url: "#",
		children: [
			{ label: "Kaydolun", url: LOGIN },
			{ label: "Giriş yap", url: LOGIN },
			{ label: "İndir", url: "/#indir" },
		],
	},
]);

export const FALLBACK_LEGAL = toMenu([
	{ label: "Gizlilik", url: "/gizlilik" },
	{ label: "KVKK haklarınız", url: "/gizlilik#haklariniz" },
	{ label: "Kullanım koşulları", url: "/kullanim-kosullari" },
	{ label: "Çerezler", url: "/cerezler" },
	{ label: "Hesap silme", url: "/hesap-sil" },
]);

export function pick(items: MenuItem[] | undefined, fallback: MenuItem[]) {
	return items && items.length > 0 ? items : fallback;
}

/** Category slug → tile colour and label used by blog rows and post heroes. */
export const CATEGORY_STYLE: Record<string, { bg: string; label: string }> = {
	yenilikler: { bg: "#fbe4f8", label: "Yenilikler" },
	ureme: { bg: "#fad0f6", label: "Rehber · Üreme" },
	besleme: { bg: "#ffe98a", label: "Rehber · Besleme" },
	besi: { bg: "#d4f2a8", label: "Rehber · Besi" },
	finans: { bg: "#ffd9b3", label: "Rehber · Finans" },
	sut: { bg: "#ffd9b3", label: "Rehber · Süt" },
	saglik: { bg: "#d4f2a8", label: "Rehber · Sağlık" },
};

/** Screens bundled with the theme (public/assets/ekranlar). */
export const SCREENS = [
	"pano",
	"kayit",
	"suru",
	"hayvan",
	"ureme",
	"sut",
	"saglik",
	"besleme",
	"besi",
	"gelir-gider",
] as const;

export function formatPostDate(d: Date | string | null | undefined) {
	if (!d) return "";
	const date = typeof d === "string" ? new Date(d) : d;
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${y}/${m}/${day}`;
}

/** The page entry rendered at "/". */
export const HOME_SLUG = "anasayfa";

/**
 * Old ahirimcebimde.com addresses that no longer have their own page.
 * Kept as 301 redirects so links from search results still land somewhere
 * useful. Blog and news keep their exact old URLs and are not listed here.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
	"hesap-silme": "/hesap-sil",
	fiyatlar: "/",
	ozellikler: "/#ozellikler",
};

/** Redirect target when a blog or news URL is missing its trailing slash. */
export function needsSlash(url: URL) {
	return url.pathname.endsWith("/") ? null : `${url.pathname}/${url.search}`;
}

export const blogUrl = (slug: string) => `/blog/${slug}/`;
export const newsUrl = (slug: string) => `/haberler/${slug}/`;
export const categoryUrl = (slug: string) => `/blog/kategori/${slug}/`;

/** "24 Eki 2026" style dates, as on the old site. */
export function formatTrDate(d: Date | string) {
	return new Date(d).toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Europe/Istanbul",
	});
}

/** News entries use "baslik" for the title (fields created in the admin). */
export const newsTitle = (d: any): string => d?.baslik ?? d?.title ?? "";

/** Plain text of a Portable Text value, for summaries and meta descriptions. */
export function ptText(value: unknown): string {
	if (typeof value === "string") return value;
	if (!Array.isArray(value)) return "";
	return value
		.filter((b: any) => b?._type === "block")
		.map((b: any) => (b.children ?? []).map((c: any) => c.text ?? "").join(""))
		.join("\n\n")
		.trim();
}
