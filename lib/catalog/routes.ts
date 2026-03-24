import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import type {
  CatalogFilterProfile,
  CatalogLockedPreset,
  ResolvedCatalogRoute,
} from "./types";

const PROFILE_BY_KIND: Record<string, CatalogFilterProfile> = {
  perfume: "perfume",
  home: "home",
  gift: "gift",
};

const NAV_ROUTES: Record<
  string,
  { title: string; profile: CatalogFilterProfile; preset: CatalogLockedPreset }
> = {
  "parfumuri-barbati": {
    title: "Parfumuri bărbați",
    profile: "perfume",
    preset: { categorySlug: "perfume", gender: "men" },
  },
  "parfumuri-femei": {
    title: "Parfumuri femei",
    profile: "perfume",
    preset: { categorySlug: "perfume", gender: "women" },
  },
  unisex: {
    title: "Unisex",
    profile: "perfume",
    preset: { categorySlug: "perfume", gender: "unisex" },
  },
  "seturi-cadou": {
    title: "Seturi cadou",
    profile: "gift",
    preset: { categorySlug: "gift" },
  },
  "casa-ingrijire": {
    title: "Casă & Îngrijire",
    profile: "home",
    preset: { categorySlug: "home" },
  },
  "parfumuri-camera": {
    title: "Parfumuri cameră",
    profile: "home",
    preset: { categorySlug: "home", homeSubtype: "homeFragrance" },
  },
  oferte: {
    title: "Oferte",
    profile: "all",
    preset: { merchandisingFilter: "onSale" },
  },
  populare: {
    title: "Populare",
    profile: "all",
    preset: { merchandisingFilter: "popular" },
  },
  noutati: {
    title: "Noutăți",
    profile: "all",
    preset: { merchandisingFilter: "newArrival" },
  },
};

export const STATIC_CATALOG_SLUGS = [
  "perfume",
  "home",
  "gift",
  ...Object.keys(NAV_ROUTES),
];

export function resolveCatalogSlug(
  slug: string,
  categories: ALL_CATEGORIES_QUERYResult | null | undefined,
): ResolvedCatalogRoute | null {
  const nav = NAV_ROUTES[slug];
  if (nav) {
    return {
      title: nav.title,
      profile: nav.profile,
      preset: { ...nav.preset },
    };
  }

  const cat = categories?.find((c) => c.slug === slug);
  if (cat?.kind) {
    const profile = PROFILE_BY_KIND[cat.kind];
    if (!profile) return null;
    return {
      title: cat.title ?? cat.slug ?? slug,
      profile,
      preset: { categorySlug: cat.kind },
    };
  }

  return null;
}
