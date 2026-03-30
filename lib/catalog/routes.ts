import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import type {
  CatalogFilterProfile,
  CatalogLockedPreset,
  ResolvedCatalogRoute,
} from "./types";

const PROFILE_BY_KIND: Record<string, CatalogFilterProfile> = {
  perfumes: "perfumes",
  giftsets: "giftsets",
  homeSpray: "homeSpray",
  carPerfume: "carPerfume",
};

const NAV_ROUTES: Record<
  string,
  { title: string; profile: CatalogFilterProfile; preset: CatalogLockedPreset }
> = {
  /** Slug-uri = productType / kind (folosite în Header, linkuri tehnice) — nu depind de documentele category din Sanity. */
  perfumes: {
    title: "Parfumuri",
    profile: "perfumes",
    preset: { categorySlug: "perfumes" },
  },
  giftsets: {
    title: "Seturi cadou",
    profile: "giftsets",
    preset: { categorySlug: "giftsets" },
  },
  homeSpray: {
    title: "Parfumuri de cameră",
    profile: "homeSpray",
    preset: { categorySlug: "homeSpray" },
  },
  carPerfume: {
    title: "Parfumuri de mașină",
    profile: "carPerfume",
    preset: { categorySlug: "carPerfume" },
  },
  "parfumuri-barbati": {
    title: "Parfumuri bărbați",
    profile: "perfumes",
    preset: { categorySlug: "perfumes", gender: "men" },
  },
  "parfumuri-femei": {
    title: "Parfumuri femei",
    profile: "perfumes",
    preset: { categorySlug: "perfumes", gender: "women" },
  },
  unisex: {
    title: "Unisex",
    profile: "perfumes",
    preset: { categorySlug: "perfumes", gender: "unisex" },
  },
  "seturi-cadou": {
    title: "Seturi cadou",
    profile: "giftsets",
    preset: { categorySlug: "giftsets" },
  },
  "parfumuri-camera": {
    title: "Parfumuri de cameră",
    profile: "homeSpray",
    preset: { categorySlug: "homeSpray" },
  },
  "parfumuri-masina": {
    title: "Parfumuri de mașină",
    profile: "carPerfume",
    preset: { categorySlug: "carPerfume" },
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

/** Rute statice pentru /catalog/[slug]; fără duplicate când slug-urile tehnice sunt și în NAV_ROUTES. */
export const STATIC_CATALOG_SLUGS = [
  ...new Set([
    "perfumes",
    "giftsets",
    "homeSpray",
    "carPerfume",
    ...Object.keys(NAV_ROUTES),
  ]),
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
