import { notFound } from "next/navigation";
import { ProductSection } from "@/components/LeandingPage/ProductSection";
import { PaginationControls } from "@/components/PaginationControls";
import {
  buildCatalogQueryString,
  fetchCatalogListing,
} from "@/lib/catalog/fetch-catalog-listing";
import {
  resolveCatalogSlug,
  STATIC_CATALOG_SLUGS,
} from "@/lib/catalog/routes";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return STATIC_CATALOG_SLUGS.map((slug) => ({ slug }));
}

export default async function CatalogCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const { data: categories } = await sanityFetch({ query: ALL_CATEGORIES_QUERY });
  const resolved = resolveCatalogSlug(slug, categories ?? []);

  if (!resolved) {
    notFound();
  }

  const {
    categories: cats,
    products,
    total,
    totalPages,
    pageNum,
    parsed,
  } = await fetchCatalogListing({
    searchParams: sp,
    preset: resolved.preset,
    categories: categories ?? [],
  });

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

  const basePath = `/catalog/${slug}`;
  const baseQuery: Record<string, string> = {};
  if (q) baseQuery.q = q;
  if (olfactiveFamily) baseQuery.olfactiveFamily = olfactiveFamily;
  if (concentration) baseQuery.concentration = concentration;
  if (volume > 0) baseQuery.volume = String(volume);
  if (destination) baseQuery.destination = destination;
  if (diffuserType) baseQuery.diffuserType = diffuserType;
  if (sort && sort !== "name") baseQuery.sort = sort;
  if (minPrice > 0) baseQuery.minPrice = String(minPrice);
  if (maxPrice > 0 && maxPrice < 5000) baseQuery.maxPrice = String(maxPrice);
  if (inStock) baseQuery.inStock = "true";

  if (resolved.preset.categorySlug === undefined && categorySlug) {
    baseQuery.category = categorySlug;
  }
  if (resolved.preset.gender === undefined && gender) {
    baseQuery.gender = gender;
  }
  if (resolved.preset.homeSubtype === undefined && homeSubtype) {
    baseQuery.homeSubtype = homeSubtype;
  }

  const buildHref = (page: number): string | undefined => {
    if (page < 1 || page > totalPages) return undefined;
    const qs = buildCatalogQueryString(baseQuery, page);
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {resolved.title}
      </h1>
      <div className="mt-8">
        <ProductSection
          categories={cats}
          products={products}
          totalCount={total}
          filterProfile={resolved.profile}
          lockedFilters={resolved.preset}
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
