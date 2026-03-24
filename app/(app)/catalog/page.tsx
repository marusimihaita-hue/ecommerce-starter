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
    homeSubtype,
    sort,
    minPrice,
    maxPrice,
    inStock,
    volume,
    destination,
    diffuserType,
    displayMaxPrice,
  } = parsed;

  const baseQuery: Record<string, string> = {};
  if (q) baseQuery.q = q;
  if (categorySlug) baseQuery.category = categorySlug;
  if (olfactiveFamily) baseQuery.olfactiveFamily = olfactiveFamily;
  if (concentration) baseQuery.concentration = concentration;
  if (gender) baseQuery.gender = gender;
  if (homeSubtype) baseQuery.homeSubtype = homeSubtype;
  if (volume > 0) baseQuery.volume = String(volume);
  if (destination) baseQuery.destination = destination;
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Catalog
      </h1>
      <div className="mt-8">
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
          homeSubtype={homeSubtype}
          volume={volume}
          destination={destination}
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
