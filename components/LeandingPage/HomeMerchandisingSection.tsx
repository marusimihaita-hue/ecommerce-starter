import { ProductCard } from "@/components/LeandingPage/ProductCard";
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
      className="w-full scroll-mt-20 border-b border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          {title}
        </h2>
        <div
          className="mt-6 flex gap-6 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-x" }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[min(100%,280px)] shrink-0 sm:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
