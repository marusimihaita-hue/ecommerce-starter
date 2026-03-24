export type CatalogFilterProfile = "all" | "perfume" | "home" | "gift";

/** Values fixed by the route; URL cannot override them. */
export type CatalogLockedPreset = {
  categorySlug?: string;
  gender?: string;
  homeSubtype?: string;
};

export type ResolvedCatalogRoute = {
  title: string;
  profile: CatalogFilterProfile;
  preset: CatalogLockedPreset;
};
