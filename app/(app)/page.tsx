import { Suspense } from "react";
import { CategoryTiles } from "@/components/LeandingPage/CategoryTitles";
import { FeaturedCarousel } from "@/components/LeandingPage/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/LeandingPage/FeaturedCarouselSkeleton";
import { ProductSection } from "@/components/LeandingPage/ProductSection";
import { PaginationControls } from "@/components/PaginationControls";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_PAGINATED,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_PAGINATED,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_PAGINATED,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_PAGINATED,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
  getAllProductsQuery,
} from "@/sanity/queries/products";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  // Mutăm aici ca să fie disponibile peste tot
  const currentPage = Number(params.page) || 1;
  const productsPerPage = 12;

  const searchQuery = Array.isArray(params.q) ? params.q[0] : (params.q ?? "");
  const categorySlug = Array.isArray(params.category)
    ? params.category[0]
    : (params.category ?? "");
  const scentFamily = Array.isArray(params.scentFamily)
    ? params.scentFamily[0]
    : (params.scentFamily ?? "");
  const concentration = Array.isArray(params.concentration)
    ? params.concentration[0]
    : (params.concentration ?? "");
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  // Pentru UI slider, maxPrice default trebuie să fie 5000 (altfel e considerat "activ").
  const maxPriceForUI = maxPrice === 0 ? 5000 : maxPrice;
  const sort = Array.isArray(params.sort)
    ? params.sort[0]
    : (params.sort ?? "name");
  const inStockValue = Array.isArray(params.inStock)
    ? params.inStock[0]
    : params.inStock;
  const inStock = inStockValue === "true";

  // Fetch products paginated (inclusiv cu filtre/sortare)
  let products = [];
  const hasFilters =
    !!searchQuery ||
    !!categorySlug ||
    !!scentFamily ||
    !!concentration ||
    minPrice > 0 ||
    maxPrice > 0 ||
    inStock;
  const start = (currentPage - 1) * productsPerPage;
  const end = currentPage * productsPerPage;
  if (!hasFilters && sort === "name") {
    // Fără filtre, fără sortare specială: folosește paginare corectă
    const result = await sanityFetch({
      query: getAllProductsQuery(currentPage, productsPerPage),
    });
    products = result.data;
  } else {
    // Cu filtre sau sortare: paginare reală cu GROQ
    let query: string;
    switch (sort) {
      case "price_asc":
        query = FILTER_PRODUCTS_BY_PRICE_ASC_PAGINATED(start, end);
        break;
      case "price_desc":
        query = FILTER_PRODUCTS_BY_PRICE_DESC_PAGINATED(start, end);
        break;
      case "relevance":
        query = FILTER_PRODUCTS_BY_RELEVANCE_PAGINATED(start, end);
        break;
      default:
        query = FILTER_PRODUCTS_BY_NAME_PAGINATED(start, end);
    }
    const result = await sanityFetch({
      query,
      params: {
        searchQuery,
        categorySlug,
        scentFamily,
        concentration,
        minPrice,
        maxPrice,
        inStock,
      },
    });
    products = result.data;
  }

  // Fetch categories for filter sidebar
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Fetch featured products for carousel
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });

  // fetch total produse (toate, pentru paginare fără filtre)
  const { data: allProducts } = await sanityFetch({
    query: '*[_type == "product"]{_id}',
  });

  // Calculează totalProducts și totalPages dinamic, în funcție de filtrare
  const totalProducts = hasFilters ? products.length : allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));
  // Obiect paginare
  const pagination = {
    currentPage,
    totalPages,
    prev: currentPage > 1 ? currentPage - 1 : undefined,
    next: currentPage < totalPages ? currentPage + 1 : undefined,
    pages: Array.from({ length: totalPages }, (_, i) => i + 1),
  };

  return (
    <div>
      {/* Featured Products Carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel products={featuredProducts} />
      </Suspense>
      {/* Page Banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Produse din categoria:{" "}
            {categorySlug ? categorySlug : "toate produsele"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Descoperă selecția noastră variată de produse pentru tine și casa ta
          </p>
        </div>

        {/* Category Tiles - Full width */}
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 mt-6">
          <CategoryTiles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
          categorySlug={categorySlug}
          scentFamily={scentFamily}
          concentration={concentration}
          sort={sort}
          minPrice={minPrice}
          maxPrice={maxPriceForUI}
          inStock={inStock}
        />
        {/* Pagination Controls */}
        <div className="pt-25 pb-5">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            getPageHref={(page: number) => {
              // Dacă există o singură pagină, nu genera link (disable)
              if (
                pagination.totalPages <= 1 ||
                page < 1 ||
                page > pagination.totalPages
              )
                return undefined;
              const paramsObj = { ...params, page };
              const entries = Object.entries(paramsObj)
                .filter(([, v]) => v !== undefined && String(v) !== "")
                .map(([k, v]) => [k, String(v)]);
              const search = new URLSearchParams(entries as [string, string][]);
              return `?${search.toString()}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
