import { defineQuery } from "next-sanity";

/** Shared: label + URL segment (identical to productType values). */
const CATEGORY_LABELS = `
  "slug": kind,
  "title": select(
    kind == "perfume" => "Parfum",
    kind == "home" => "Casă",
    kind == "gift" => "Cadou",
    "Categorie"
  )
`;

/**
 * Get all categories (exactly: perfume, home, gift — one document per kind).
 * Used on navigation and filters
 */
export const ALL_CATEGORIES_QUERY = defineQuery(`*[
  _type == "category"
] | order(kind asc) {
  _id,
  kind,
  ${CATEGORY_LABELS},
  "image": image{
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);

/**
 * Get category by URL segment ($slug is kind: perfume | home | gift)
 */
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`*[
  _type == "category"
  && kind == $slug
][0] {
  _id,
  kind,
  ${CATEGORY_LABELS},
  "image": image{
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);
