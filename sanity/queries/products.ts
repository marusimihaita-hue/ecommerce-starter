// PAGINATED FILTER QUERIES (safe, nu afectează exporturile existente)
export const FILTER_PRODUCTS_BY_NAME_PAGINATED = (start: number, end: number) =>
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(name asc) ${FILTERED_PRODUCT_PROJECTION}[${start}...${end}]`;

export const FILTER_PRODUCTS_BY_PRICE_ASC_PAGINATED = (
  start: number,
  end: number,
) =>
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(price asc) ${FILTERED_PRODUCT_PROJECTION}[${start}...${end}]`;

export const FILTER_PRODUCTS_BY_PRICE_DESC_PAGINATED = (
  start: number,
  end: number,
) =>
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(price desc) ${FILTERED_PRODUCT_PROJECTION}[${start}...${end}]`;

export const FILTER_PRODUCTS_BY_RELEVANCE_PAGINATED = (
  start: number,
  end: number,
) =>
  `*[${PRODUCT_FILTER_CONDITIONS}] | ${RELEVANCE_SCORE} | order(_score desc, name asc) ${FILTERED_PRODUCT_PROJECTION}[${start}...${end}]`;

import { defineQuery } from "next-sanity";
import { LOW_STOCK_THRESHOLD } from "../../lib/constants/stock";

// ============================================
// Shared Query Fragments (DRY)
// ============================================

/** Linia de produs: filtrăm după `productType` (întotdeauna pe document); `category->kind` e fallback pentru conținut vechi fără aliniere. */
const CATEGORY_LINE_MATCH = `($categorySlug == "" || productType == $categorySlug || category->kind == $categorySlug)`;

/**
 * Parfumuri: unisex = doar unisex; femei = femei + unisex; bărbați = bărbați + unisex.
 */
const PERFUME_GENDER_MATCH = `(
  ($gender == "unisex" && gender == "unisex") ||
  ($gender == "women" && (gender == "women" || gender == "unisex")) ||
  ($gender == "men" && (gender == "men" || gender == "unisex"))
)`;

/** Common filter conditions for product filtering */
const PRODUCT_FILTER_CONDITIONS = `
  _type == "product"
  && ${CATEGORY_LINE_MATCH}
  && ($olfactiveFamily == "" || ((productType == "perfumes" || productType == "homeSpray" || productType == "carPerfume") && (olfactiveFamily == $olfactiveFamily || $olfactiveFamily in olfactiveFamily)))
  && ($concentration == "" || (productType == "perfumes" && concentration == $concentration))
  && ($minPrice == 0 || price >= $minPrice)
  && ($maxPrice == 0 || price <= $maxPrice)
  && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*")
  && ($inStock == false || stock > 0)
  && ($gender == "" || (productType == "perfumes" && ${PERFUME_GENDER_MATCH}))
  && ($giftFor == "" || (productType == "giftsets" && giftFor == $giftFor))
  && ($volume == "" || (productType == "perfumes" && volume == $volume))
  && ($diffuserType == "" || (productType == "homeSpray" && diffuserType == $diffuserType))
  && ($merchandisingFilter == "" || ($merchandisingFilter == "onSale" && onSale == true) || ($merchandisingFilter == "popular" && popular == true) || ($merchandisingFilter == "newArrival" && newArrival == true))
`;

/** Shared fields for product cards (grid + homepage rows) */
const PRODUCT_CARD_LIST_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[0...4]{
    _key,
    asset->{
      _id,
      url
    }
  },
  category->{
    _id,
    kind,
    "slug": kind,
    "title": select(
      kind == "perfumes" => "Parfumuri",
      kind == "giftsets" => "Seturi cadou",
      kind == "homeSpray" => "Parfumuri de cameră",
      kind == "carPerfume" => "Parfumuri de mașină",
      "Categorie"
    )
  },
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
`;

/** Projection for filtered product lists (includes multiple images for hover) */
const FILTERED_PRODUCT_PROJECTION = `{${PRODUCT_CARD_LIST_FIELDS}
}`;

/** Scoring for relevance-based search */
const RELEVANCE_SCORE = `score(
  boost(name match $searchQuery + "*", 3),
  boost(description match $searchQuery + "*", 1)
)`;

/**
 * Products flagged on sale (homepage „Oferte”) — primele 5; restul pe /catalog/oferte
 */
export const PRODUCTS_ON_SALE_HOME_QUERY = defineQuery(`*[
  _type == "product"
  && onSale == true
  && stock > 0
] | order(name asc)[0...5] {${PRODUCT_CARD_LIST_FIELDS}
}`);

/**
 * Popular products (homepage „Populare”)
 */
export const PRODUCTS_POPULAR_HOME_QUERY = defineQuery(`*[
  _type == "product"
  && popular == true
  && stock > 0
] | order(name asc) {${PRODUCT_CARD_LIST_FIELDS}
}`);

/**
 * New arrivals (homepage „Noi”)
 */
export const PRODUCTS_NEW_ARRIVAL_HOME_QUERY = defineQuery(`*[
  _type == "product"
  && newArrival == true
  && stock > 0
] | order(name asc) {${PRODUCT_CARD_LIST_FIELDS}
}`);

/**
 * Gift sets / gift line (homepage „Seturi cadou”)
 */
export const PRODUCTS_GIFT_SETS_HOME_QUERY = defineQuery(`*[
  _type == "product"
  && (productType == "giftsets" || gift == true)
  && stock > 0
] | order(name asc) {${PRODUCT_CARD_LIST_FIELDS}
}`);

// ============================================
// All Products Query
// ============================================

/**
 * Get all products with category expanded
 * Used on landing page
 */
export const ALL_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  brand,
  description,
  price,
  "images": images[]{
    _key,
    asset->{
      _id,
      url
    },
    hotspot
  },
  category->{
    _id,
    kind,
    "slug": kind,
    "title": select(
      kind == "perfumes" => "Parfumuri",
      kind == "giftsets" => "Seturi cadou",
      kind == "homeSpray" => "Parfumuri de cameră",
      kind == "carPerfume" => "Parfumuri de mașină",
      "Categorie"
    )
  },
  productType,
  gender,
  volume,
  concentration,
  olfactiveFamily,
  topNotes,
  middleNotes,
  baseNotes,
  giftFor,
  packagingInfo,
  diffuserType,
  scent,
  setContains,
  recommendedOccasion,
  stock,
  onSale,
  popular,
  newArrival,
  gift
}`);

/**
 * Get products by category slug
 */
export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[
  _type == "product"
  && (productType == $categorySlug || category->kind == $categorySlug)
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset->{
      _id,
      url
    },
    hotspot
  },
  category->{
    _id,
    kind,
    "slug": kind,
    "title": select(
      kind == "perfumes" => "Parfumuri",
      kind == "giftsets" => "Seturi cadou",
      kind == "homeSpray" => "Parfumuri de cameră",
      kind == "carPerfume" => "Parfumuri de mașină",
      "Categorie"
    )
  },
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
}`);

/**
 * Get single product by slug
 * Used on product detail page
 */
export const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[
  _type == "product"
  && slug.current == $slug
][0] {
  _id,
  name,
  "slug": slug.current,
  brand,
  description,
  price,
  "images": images[]{
    _key,
    asset->{
      _id,
      url
    },
    hotspot
  },
  category->{
    _id,
    kind,
    "slug": kind,
    "title": select(
      kind == "perfumes" => "Parfumuri",
      kind == "giftsets" => "Seturi cadou",
      kind == "homeSpray" => "Parfumuri de cameră",
      kind == "carPerfume" => "Parfumuri de mașină",
      "Categorie"
    )
  },
  productType,
  gender,
  volume,
  concentration,
  olfactiveFamily,
  topNotes,
  middleNotes,
  baseNotes,
  giftFor,
  packagingInfo,
  diffuserType,
  scent,
  setContains,
  recommendedOccasion,
  stock,
  onSale,
  popular,
  newArrival,
  gift,
  tiktokReviewUrl
}`);

// ============================================
// Search & Filter Queries (Server-Side)
// Uses GROQ score() for relevance ranking
// ============================================

/**
 * Search products with relevance scoring
 * Uses score() + boost() for better ranking
 * Orders by relevance score descending
 */
export const SEARCH_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && (
    name match $searchQuery + "*"
    || description match $searchQuery + "*"
  )
] | score(
  boost(name match $searchQuery + "*", 3),
  boost(description match $searchQuery + "*", 1)
) | order(_score desc) {
  _id,
  _score,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset->{
      _id,
      url
    },
    hotspot
  },
  category->{
    _id,
    kind,
    "slug": kind,
    "title": select(
      kind == "perfumes" => "Parfumuri",
      kind == "giftsets" => "Seturi cadou",
      kind == "homeSpray" => "Parfumuri de cameră",
      kind == "carPerfume" => "Parfumuri de mașină",
      "Categorie"
    )
  },
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
}`);

/**
 * Filter products - ordered by name (A-Z)
 * Returns up to 4 images for hover preview in product cards
 */
export const FILTER_PRODUCTS_BY_NAME_QUERY = defineQuery(
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(name asc) ${FILTERED_PRODUCT_PROJECTION}`,
);

/**
 * Filter products - ordered by price ascending
 * Returns up to 4 images for hover preview in product cards
 */
export const FILTER_PRODUCTS_BY_PRICE_ASC_QUERY = defineQuery(
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(price asc) ${FILTERED_PRODUCT_PROJECTION}`,
);

/**
 * Filter products - ordered by price descending
 * Returns up to 4 images for hover preview in product cards
 */
export const FILTER_PRODUCTS_BY_PRICE_DESC_QUERY = defineQuery(
  `*[${PRODUCT_FILTER_CONDITIONS}] | order(price desc) ${FILTERED_PRODUCT_PROJECTION}`,
);

/**
 * Filter products - ordered by relevance (when searching)
 * Uses score() for search term matching
 * Returns up to 4 images for hover preview in product cards
 */
export const FILTER_PRODUCTS_BY_RELEVANCE_QUERY = defineQuery(
  `*[${PRODUCT_FILTER_CONDITIONS}] | ${RELEVANCE_SCORE} | order(_score desc, name asc) ${FILTERED_PRODUCT_PROJECTION}`,
);

/** Count products matching the same filters as FILTER_PRODUCTS_* (for pagination). */
export const FILTERED_PRODUCTS_COUNT_QUERY = defineQuery(
  `count(*[${PRODUCT_FILTER_CONDITIONS}])`,
);

/**
 * Get products by IDs (for cart/checkout)
 */
export const PRODUCTS_BY_IDS_QUERY = defineQuery(`*[
  _type == "product"
  && _id in $ids
] {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset->{
      _id,
      url
    },
    hotspot
  },
  stock
}`);

/**
 * Get low stock products (admin)
 * Uses LOW_STOCK_THRESHOLD constant for consistency
 */
export const LOW_STOCK_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && stock > 0
  && stock <= ${LOW_STOCK_THRESHOLD}
] | order(stock asc) {
  _id,
  name,
  "slug": slug.current,
  stock,
  "image": images[0]{
    asset->{
      _id,
      url
    }
  }
}`);

/**
 * Get out of stock products (admin)
 */
export const OUT_OF_STOCK_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && stock == 0
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  "image": images[0]{
    asset->{
      _id,
      url
    }
  }
}`);
// ============================================
//Pagination

export const getAllProductsQuery = (page: number, limit: number) => `
  *[_type == "product"] | order(name asc)[${(page - 1) * limit}...${page * limit}]{
    _id,
    name,
    description,
    price,
    "slug": slug.current,
    "images": images[]{
      _key,
      asset->{
        _id,
        url
      },
      hotspot
    },
    category->{
      _id,
      kind,
      "slug": kind,
      "title": select(
        kind == "perfumes" => "Parfumuri",
        kind == "giftsets" => "Seturi cadou",
        kind == "homeSpray" => "Parfumuri de cameră",
        kind == "carPerfume" => "Parfumuri de mașină",
        "Categorie"
      )
    },
    brand,
    productType,
    gender,
    volume,
    concentration,
    olfactiveFamily,
    topNotes,
    middleNotes,
    baseNotes,
    giftFor,
    packagingInfo,
    diffuserType,
    scent,
    setContains,
    recommendedOccasion,
    stock,
    onSale,
    popular,
    newArrival,
    gift
  }
`;

// ============================================
// Homepage Section Queries
// ============================================

/**
 * Get products on sale for homepage (first 4)
 */
export const HOME_OFFER_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && onSale == true
  && stock > 0
] | order(name asc)[0...4] {
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[0...2]{
    _key,
    asset->{
      _id,
      url
    }
  },
  brand,
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
}`);

/**
 * Get popular products for homepage (first 4)
 */
export const HOME_POPULAR_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && popular == true
  && stock > 0
] | order(name asc)[0...4] {
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[0...2]{
    _key,
    asset->{
      _id,
      url
    }
  },
  brand,
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
}`);

/**
 * Get gift set products for homepage (first 4)
 */
export const HOME_GIFT_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && gift == true
  && stock > 0
] | order(name asc)[0...4] {
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[0...2]{
    _key,
    asset->{
      _id,
      url
    }
  },
  brand,
  productType,
  volume,
  concentration,
  olfactiveFamily,
  stock
}`);
