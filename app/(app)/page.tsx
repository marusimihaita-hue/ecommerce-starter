import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FeaturedCarousel } from "@/components/LeandingPage/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/LeandingPage/FeaturedCarouselSkeleton";
import { HomeMerchandisingSection } from "@/components/LeandingPage/HomeMerchandisingSection";
import { HomeOffersSection } from "@/components/LeandingPage/HomeOffersSection";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PRODUCTS_GIFT_SETS_HOME_QUERY,
  PRODUCTS_NEW_ARRIVAL_HOME_QUERY,
  PRODUCTS_ON_SALE_HOME_QUERY,
  PRODUCTS_POPULAR_HOME_QUERY,
} from "@/sanity/queries/products";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CATEGORY_KIND_SLUGS = new Set([
  "perfumes",
  "giftsets",
  "homeSpray",
  "carPerfume",
]);

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const categorySlug = Array.isArray(params.category)
    ? params.category[0]
    : (params.category ?? "");

  if (categorySlug && CATEGORY_KIND_SLUGS.has(categorySlug)) {
    redirect(`/catalog/${categorySlug}`);
  }

  const [
    { data: onSaleProducts },
    { data: popularProducts },
    { data: newProducts },
    { data: giftSetProducts },
  ] = await Promise.all([
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

      <HomeOffersSection products={onSaleProducts} />

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
        id="seturi-cadou"
        title="Seturi cadou"
        products={giftSetProducts}
      />
    </div>
  );
}
