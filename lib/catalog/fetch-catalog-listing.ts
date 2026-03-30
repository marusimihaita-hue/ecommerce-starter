import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FILTER_PRODUCTS_BY_NAME_PAGINATED,
  FILTER_PRODUCTS_BY_PRICE_ASC_PAGINATED,
  FILTER_PRODUCTS_BY_PRICE_DESC_PAGINATED,
  FILTER_PRODUCTS_BY_RELEVANCE_PAGINATED,
  FILTERED_PRODUCTS_COUNT_QUERY,
} from "@/sanity/queries/products";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import type { CatalogLockedPreset } from "./types";

const DEFAULT_PAGE_SIZE = 12;

export function firstParam(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export function pickSortQuery(
  sort: string,
  searchQuery: string,
  start: number,
  end: number,
): string {
  const useRelevance = sort === "relevance" && searchQuery.trim() !== "";
  if (useRelevance) {
    return FILTER_PRODUCTS_BY_RELEVANCE_PAGINATED(start, end);
  }
  if (sort === "price_asc") {
    return FILTER_PRODUCTS_BY_PRICE_ASC_PAGINATED(start, end);
  }
  if (sort === "price_desc") {
    return FILTER_PRODUCTS_BY_PRICE_DESC_PAGINATED(start, end);
  }
  return FILTER_PRODUCTS_BY_NAME_PAGINATED(start, end);
}

export async function fetchCatalogListing({
  searchParams,
  preset = {},
  pageSize = DEFAULT_PAGE_SIZE,
  categories: categoriesPreloaded,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  preset?: CatalogLockedPreset;
  pageSize?: number;
  categories?: ALL_CATEGORIES_QUERYResult;
}) {
  const q = firstParam(searchParams.q);
  const categorySlug =
    preset.categorySlug !== undefined
      ? preset.categorySlug
      : firstParam(searchParams.category);
  const olfactiveFamily =
    firstParam(searchParams.olfactiveFamily) ||
    firstParam(searchParams.scentFamily);
  const concentration = firstParam(searchParams.concentration);
  const gender =
    preset.gender !== undefined
      ? preset.gender
      : firstParam(searchParams.gender);
  const giftFor =
    preset.giftFor !== undefined
      ? preset.giftFor
      : firstParam(searchParams.giftFor);
  const sortRaw = firstParam(searchParams.sort) || "name";
  const sort = sortRaw === "relevance" && !q.trim() ? "name" : sortRaw;
  const minPrice = Number(firstParam(searchParams.minPrice)) || 0;
  const maxPriceRaw = Number(firstParam(searchParams.maxPrice));
  const maxPrice = Number.isFinite(maxPriceRaw) ? maxPriceRaw : 0;
  const inStock = firstParam(searchParams.inStock) === "true";
  const pageNum = Math.max(1, Number(firstParam(searchParams.page)) || 1);
  const volume = firstParam(searchParams.volume);
  const diffuserType = firstParam(searchParams.diffuserType);
  const merchandisingFilter =
    preset.merchandisingFilter !== undefined ? preset.merchandisingFilter : "";

  const filterParams = {
    categorySlug,
    olfactiveFamily,
    concentration,
    minPrice,
    maxPrice,
    searchQuery: q,
    inStock,
    gender,
    giftFor,
    volume,
    diffuserType,
    merchandisingFilter,
  };

  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  const categoriesFetch = categoriesPreloaded
    ? Promise.resolve({ data: categoriesPreloaded })
    : sanityFetch({ query: ALL_CATEGORIES_QUERY });

  const [{ data: categories }, { data: totalRaw }, { data: products }] =
    await Promise.all([
      categoriesFetch,
      sanityFetch({
        query: FILTERED_PRODUCTS_COUNT_QUERY,
        params: filterParams,
      }),
      sanityFetch({
        query: pickSortQuery(sort, q, start, end),
        params: filterParams,
      }),
    ]);

  const total = typeof totalRaw === "number" ? totalRaw : 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const displayMaxPrice = maxPrice === 0 ? 5000 : maxPrice;

  return {
    categories: categories ?? [],
    products: products ?? [],
    total,
    totalPages,
    pageNum,
    pageSize,
    parsed: {
      q,
      categorySlug,
      olfactiveFamily,
      concentration,
      gender,
      giftFor,
      sort,
      minPrice,
      maxPrice,
      inStock,
      volume,
      diffuserType,
      displayMaxPrice,
    },
  };
}

export function buildCatalogQueryString(
  base: Record<string, string>,
  page: number,
): string {
  const sp = new URLSearchParams(base);
  if (page > 1) sp.set("page", String(page));
  return sp.toString();
}
