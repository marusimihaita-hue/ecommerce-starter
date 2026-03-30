/**
 * Product schema option lists — shared by Sanity schema and admin UI.
 */

export const PRODUCT_TYPE_SANITY_LIST = [
  { title: "Parfumuri", value: "perfumes" },
  { title: "Seturi cadou", value: "giftsets" },
  { title: "Parfumuri de cameră", value: "homeSpray" },
  { title: "Parfumuri de mașină", value: "carPerfume" },
] as const;

/** URL / filter segment → display label (categories & product types share these keys). */
export const CATEGORY_KIND_LABELS: Record<
  (typeof PRODUCT_TYPE_SANITY_LIST)[number]["value"],
  string
> = {
  perfumes: "Parfumuri",
  giftsets: "Seturi cadou",
  homeSpray: "Parfumuri de cameră",
  carPerfume: "Parfumuri de mașină",
};

export const GENDER_SANITY_LIST = [
  { title: "Femei", value: "women" },
  { title: "Bărbați", value: "men" },
  { title: "Unisex", value: "unisex" },
] as const;

/** Pentru giftsets: destinatari (el / ea / unisex). */
export const GIFT_FOR_SANITY_LIST = [
  { title: "El", value: "him" },
  { title: "Ea", value: "her" },
  { title: "Unisex", value: "unisex" },
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

export const GIFT_FOR_OPTIONS = GIFT_FOR_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));

export const DIFFUSER_TYPES = DIFFUSER_TYPE_SANITY_LIST.map((x) => ({
  value: x.value,
  label: x.title,
}));
