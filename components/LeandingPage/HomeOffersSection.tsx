import Link from "next/link";
import { ProductCard } from "@/components/LeandingPage/ProductCard";
import { Button } from "@/components/ui/button";
import type { PRODUCTS_ON_SALE_HOME_QUERYResult } from "@/sanity.types";

type OfferProduct = PRODUCTS_ON_SALE_HOME_QUERYResult[number];

interface HomeOffersSectionProps {
  products: OfferProduct[];
}

/**
 * Oferte pe homepage: grid (max 5), chenar + padding, CTA către catalogul de oferte.
 */
export function HomeOffersSection({ products }: HomeOffersSectionProps) {
  if (products.length === 0) return null;

  const display = products.slice(0, 5);

  return (
    <section
      id="oferte"
      className="w-full scroll-mt-20 border-border bg-background pt-10 pb-2"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-background p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Oferte
              </h2>
              <div
                className="mt-2 h-0.5 w-10 rounded-full bg-primary"
                aria-hidden
              />
            </div>
            <Button
              asChild
              variant="outline"
              size="default"
              className="w-full sm:w-auto"
            >
              <Link href="/catalog/oferte">Vezi toate produsele</Link>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {display.map((product) => (
              <div key={product._id} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
