export type CatalogFilterProfile = "all" | "perfume" | "home" | "gift";

/** Homepage-style listings (Oferte / Populare / Noutăți), locked by route. */
export type CatalogMerchandisingFilter = "onSale" | "popular" | "newArrival";

/** Values fixed by the route; URL cannot override them. */
export type CatalogLockedPreset = {
  categorySlug?: string;
  gender?: string;
  homeSubtype?: string;
  merchandisingFilter?: CatalogMerchandisingFilter;
};

export type ResolvedCatalogRoute = {
  title: string;
  profile: CatalogFilterProfile;
  preset: CatalogLockedPreset;
};
