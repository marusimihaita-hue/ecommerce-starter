import { HomeMerchandisingProductCarousel } from "@/components/LeandingPage/HomeMerchandisingProductCarousel";
import type { PRODUCTS_ON_SALE_HOME_QUERYResult } from "@/sanity.types";

type RowProduct = PRODUCTS_ON_SALE_HOME_QUERYResult[number];

interface HomeMerchandisingSectionProps {
  id?: string;
  title: string;
  products: RowProduct[];
}

/**
 * Titlu + rând orizontal de carduri (Oferte, Populare, Noi, Seturi cadou).
 * Toate query-urile homepage folosesc aceeași proiecție ca acest tip.
 */
export function HomeMerchandisingSection({
  id,
  title,
  products,
}: HomeMerchandisingSectionProps) {
  if (products.length === 0) return null;

  return (
    <section
      id={id}
      className="w-full scroll-mt-20 border-border bg-background pt-10 pb-2"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border pb-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h2>
          <div
            className="mt-2 h-0.5 w-10 rounded-full bg-primary"
            aria-hidden
          />
        </div>
        <div className="mt-6 pb-2 pt-1">
          <HomeMerchandisingProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
