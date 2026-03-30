export type CatalogFilterProfile =
  | "all"
  | "perfumes"
  | "giftsets"
  | "homeSpray"
  | "carPerfume";

/** Homepage-style listings (Oferte / Populare / Noutăți), locked by route. */
export type CatalogMerchandisingFilter = "onSale" | "popular" | "newArrival";

/** Values fixed by the route; URL cannot override them. */
export type CatalogLockedPreset = {
  categorySlug?: string;
  gender?: string;
  giftFor?: string;
  merchandisingFilter?: CatalogMerchandisingFilter;
};

export type ResolvedCatalogRoute = {
  title: string;
  profile: CatalogFilterProfile;
  preset: CatalogLockedPreset;
};
