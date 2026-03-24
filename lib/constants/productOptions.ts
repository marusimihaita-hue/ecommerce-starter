/**
 * Product schema option lists — shared by Sanity schema and admin UI.
 */

export const PRODUCT_TYPE_SANITY_LIST = [
  { title: "Parfum", value: "perfume" },
  { title: "Casă", value: "home" },
  { title: "Cadou", value: "gift" },
] as const;

/** URL / filter segment → display label (categories & product types share these keys). */
export const CATEGORY_KIND_LABELS: Record<
  (typeof PRODUCT_TYPE_SANITY_LIST)[number]["value"],
  string
> = {
  perfume: "Parfum",
  home: "Casă",
  gift: "Cadou",
};

export const GENDER_SANITY_LIST = [
  { title: "Femei", value: "women" },
  { title: "Bărbați", value: "men" },
  { title: "Unisex", value: "unisex" },
] as const;

export const HOME_SUBTYPE_SANITY_LIST = [
  { title: "Produse de curățenie", value: "cleaningProducts" },
  { title: "Parfum de casă", value: "homeFragrance" },
] as const;

export const CLEANING_DESTINATION_SANITY_LIST = [
  { title: "Baie", value: "bathroom" },
  { title: "Bucătărie", value: "kitchen" },
  { title: "Living", value: "livingRoom" },
  { title: "Geamuri", value: "windows" },
  { title: "Universal", value: "universal" },
  { title: "Rufe", value: "laundry" },
  { title: "Podele", value: "floors" },
  { title: "Mobilier", value: "furniture" },
] as const;

export const DIFFUSER_TYPE_SANITY_LIST = [
  { title: "Spray", value: "spray" },
  { title: "Difuzor cu bețe", value: "reedDiffuser" },
  { title: "Lumânare", value: "candle" },
] as const;

export const PRODUCT_TYPES = PRODUCT_TYPE_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));

export const GENDERS = GENDER_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));

export const HOME_SUBTYPES = HOME_SUBTYPE_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));

export const CLEANING_DESTINATIONS = CLEANING_DESTINATION_SANITY_LIST.map(
  (x) => ({ value: x.value, label: x.title }),
);

export const DIFFUSER_TYPES = DIFFUSER_TYPE_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));
