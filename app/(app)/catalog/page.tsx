import { ProductSection } from "@/components/LeandingPage/ProductSection";
import { PaginationControls } from "@/components/PaginationControls";
import {
  buildCatalogQueryString,
  fetchCatalogListing,
} from "@/lib/catalog/fetch-catalog-listing";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const {
    categories,
    products,
    total,
    totalPages,
    pageNum,
    parsed,
  } = await fetchCatalogListing({ searchParams: params });

  const {
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
  } = parsed;

  const baseQuery: Record<string, string> = {};
  if (q) baseQuery.q = q;
  if (categorySlug) baseQuery.category = categorySlug;
  if (olfactiveFamily) baseQuery.olfactiveFamily = olfactiveFamily;
  if (concentration) baseQuery.concentration = concentration;
  if (gender) baseQuery.gender = gender;
  if (giftFor) baseQuery.giftFor = giftFor;
  if (volume) baseQuery.volume = volume;
  if (diffuserType) baseQuery.diffuserType = diffuserType;
  if (sort && sort !== "name") baseQuery.sort = sort;
  if (minPrice > 0) baseQuery.minPrice = String(minPrice);
  if (maxPrice > 0 && maxPrice < 5000) baseQuery.maxPrice = String(maxPrice);
  if (inStock) baseQuery.inStock = "true";

  const buildHref = (page: number): string | undefined => {
    if (page < 1 || page > totalPages) return undefined;
    const qs = buildCatalogQueryString(baseQuery, page);
    return qs ? `/catalog?${qs}` : "/catalog";
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="scroll-mt-24 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        Catalog
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Toate categoriile într-un singur loc — filtrează după tip, preț sau
        disponibilitate.
      </p>
      <div className="mt-6 sm:mt-8">
        <ProductSection
          categories={categories}
          products={products}
          totalCount={total}
          filterProfile="all"
          searchQuery={q}
          categorySlug={categorySlug}
          olfactiveFamily={olfactiveFamily}
          concentration={concentration}
          gender={gender}
          giftFor={giftFor}
          volume={volume}
          diffuserType={diffuserType}
          sort={sort}
          minPrice={minPrice}
          maxPrice={displayMaxPrice}
          inStock={inStock}
        />
      </div>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <PaginationControls
            currentPage={pageNum}
            totalPages={totalPages}
            getPageHref={buildHref}
          />
        </div>
      )}
    </div>
  );
}
