import { getProductSpecRows } from "@/lib/product/spec-rows";
import { cn } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

interface ProductDetailsSectionProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

const panelClass =
  "mt-6 rounded-lg border-2 border-foreground bg-card p-6 shadow-md sm:p-8 md:p-10 dark:bg-card/80";

export function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  const desc = product.description?.trim() ?? "";
  const hasDesc = desc.length > 0;
  const rows = getProductSpecRows(product);

  if (!hasDesc && rows.length === 0) return null;

  return (
    <section
      aria-labelledby="product-descriere-heading"
      className="mt-10 border-t border-border pt-10 lg:mt-14 lg:pt-12"
    >
      <h2
        id="product-descriere-heading"
        className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]"
      >
        Descriere
      </h2>

      <div className={cn(panelClass)}>
        <div className="max-w-3xl space-y-8">
          {product.name ? (
            <h3 className="text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
              {product.name}
            </h3>
          ) : null}

          {hasDesc ? (
            <p className="text-[15px] leading-[1.7] text-muted-foreground whitespace-pre-line">
              {desc}
            </p>
          ) : null}

          {rows.length > 0 ? (
            <div className={cn(hasDesc && "border-t border-border/80 pt-8")}>
              <SpecsDl rows={rows} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SpecsDl({ rows }: { rows: ReturnType<typeof getProductSpecRows> }) {
  return (
    <dl className="space-y-5 divide-y divide-border/60">
      {rows.map(({ key, label, value }) => (
        <div key={key} className="pt-5 first:pt-0">
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {label}
          </dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-foreground text-pretty">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
