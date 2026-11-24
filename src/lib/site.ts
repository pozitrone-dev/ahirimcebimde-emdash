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
					{ label: "Blog", url: "/posts" },
					{ label: "Rehber yazıları", url: "/posts#rehber" },
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
	{ label: "Blog", url: "/posts" },
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
			{ label: "Blog", url: "/posts" },
			{ label: "Rehber yazıları", url: "/posts#rehber" },
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
	{ label: "Gizlilik", url: "/pages/gizlilik" },
	{ label: "KVKK haklarınız", url: "/pages/gizlilik#haklariniz" },
	{ label: "Kullanım koşulları", url: "/pages/kullanim-kosullari" },
	{ label: "Çerezler", url: "/pages/cerezler" },
	{ label: "Hesap silme", url: "/pages/hesap-sil" },
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
