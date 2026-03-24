import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CategoryTiles } from "@/components/LeandingPage/CategoryTitles";
import { FeaturedCarousel } from "@/components/LeandingPage/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/LeandingPage/FeaturedCarouselSkeleton";
import { HomeMerchandisingSection } from "@/components/LeandingPage/HomeMerchandisingSection";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  PRODUCTS_GIFT_SETS_HOME_QUERY,
  PRODUCTS_NEW_ARRIVAL_HOME_QUERY,
  PRODUCTS_ON_SALE_HOME_QUERY,
  PRODUCTS_POPULAR_HOME_QUERY,
} from "@/sanity/queries/products";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CATEGORY_KIND_SLUGS = new Set(["perfume", "home", "gift"]);

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const categorySlug = Array.isArray(params.category)
    ? params.category[0]
    : (params.category ?? "");

  if (categorySlug && CATEGORY_KIND_SLUGS.has(categorySlug)) {
    redirect(`/catalog/${categorySlug}`);
  }

  const [
    { data: categories },
    { data: onSaleProducts },
    { data: popularProducts },
    { data: newProducts },
    { data: giftSetProducts },
  ] = await Promise.all([
    sanityFetch({ query: ALL_CATEGORIES_QUERY }),
    sanityFetch({ query: PRODUCTS_ON_SALE_HOME_QUERY }),
    sanityFetch({ query: PRODUCTS_POPULAR_HOME_QUERY }),
    sanityFetch({ query: PRODUCTS_NEW_ARRIVAL_HOME_QUERY }),
    sanityFetch({ query: PRODUCTS_GIFT_SETS_HOME_QUERY }),
  ]);

  return (
    <div>
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel />
      </Suspense>

      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Categorii
            </h1>
          </div>

          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 mt-6">
            <CategoryTiles categories={categories} />
          </div>
        </div>
      </div>

      <HomeMerchandisingSection
        id="oferte"
        title="Oferte"
        products={onSaleProducts}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
        <img
          src="/Ultra-Wide-Angle-Panoramas-1.jpg"
          alt="Panoramic view"
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      </div>
      <HomeMerchandisingSection
        id="populare"
        title="Populare"
        products={popularProducts}
      />

      <HomeMerchandisingSection
        id="noutati"
        title="Noutăți"
        products={newProducts}
      />
      <HomeMerchandisingSection
        title="Seturi cadou"
        products={giftSetProducts}
      />
    </div>
  );
}
