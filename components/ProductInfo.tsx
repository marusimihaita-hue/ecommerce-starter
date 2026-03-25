import Link from "next/link";
import { CreditCard, Package, ShieldCheck } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StockBadge } from "@/components/StockBadge";
import { FREE_SHIPPING_THRESHOLD_RON } from "@/lib/constants/shipping";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

const formatLabel = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const productTypeLabel: Record<string, string> = {
  perfume: "Parfum",
  home: "Casă",
  gift: "Cadou",
};

const dtClass = "text-sm text-muted-foreground sm:max-w-[11rem] sm:shrink-0";
const ddClass = "text-sm font-medium text-foreground min-w-0 text-pretty";

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;
  const pt = product.productType;

  return (
    <div className="flex min-w-0 flex-col">
      {(product.category || product.brand) && (
        <nav
          aria-label="Navigare produs"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground"
        >
          {product.category?.slug && product.category.title && (
            <Link
              href={`/catalog/${product.category.slug}`}
              className="transition-colors hover:text-primary hover:underline"
            >
              {product.category.title}
            </Link>
          )}
          {product.category && product.brand ? (
            <span aria-hidden className="text-border">
              /
            </span>
          ) : null}
          {product.brand ? (
            <span className="font-medium text-foreground">{product.brand}</span>
          ) : null}
        </nav>
      )}

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {product.name}
      </h1>

      {pt && (
        <p className="mt-1 text-sm text-muted-foreground">
          {productTypeLabel[pt] ?? pt}
        </p>
      )}

      <p className="mt-5 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        {formatPrice(product.price)}
      </p>

      {product.description && (
        <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <StockBadge productId={product._id} stock={product.stock ?? 0} />
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={imageUrl ?? undefined}
          stock={product.stock ?? 0}
          showQuantityBeforeAdd
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-border bg-accent/60 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          Plată securizată (Stripe)
        </span>
        <span className="flex items-center gap-2">
          <Package className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          Transport gratuit de la {FREE_SHIPPING_THRESHOLD_RON} lei
        </span>
        <span className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          Carduri acceptate la plată
        </span>
      </div>

      <dl className="mt-8 grid gap-x-6 gap-y-4 border-t border-border pt-8 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-start">
        {pt === "perfume" && product.gender && (
          <>
            <dt className={dtClass}>Gen</dt>
            <dd className={ddClass}>{formatLabel(product.gender)}</dd>
          </>
        )}
        {product.volume != null && product.volume > 0 && (
          <>
            <dt className={dtClass}>Volum</dt>
            <dd className={ddClass}>{product.volume} ml</dd>
          </>
        )}
        {pt === "perfume" && product.concentration && (
          <>
            <dt className={dtClass}>Concentrație</dt>
            <dd className={ddClass}>{formatLabel(product.concentration)}</dd>
          </>
        )}
        {pt === "perfume" && product.olfactiveFamily && (
          <>
            <dt className={dtClass}>Familie olfactivă</dt>
            <dd className={ddClass}>{formatLabel(product.olfactiveFamily)}</dd>
          </>
        )}
        {pt === "home" &&
          product.homeSubtype === "cleaningProducts" &&
          product.destination && (
            <>
              <dt className={dtClass}>Destinație</dt>
              <dd className={ddClass}>{formatLabel(product.destination)}</dd>
            </>
          )}
        {pt === "home" &&
          product.homeSubtype === "homeFragrance" &&
          product.diffuserType && (
            <>
              <dt className={dtClass}>Tip</dt>
              <dd className={ddClass}>{formatLabel(product.diffuserType)}</dd>
            </>
          )}
        {pt === "home" &&
          product.homeSubtype === "homeFragrance" &&
          product.scent && (
            <>
              <dt className={dtClass}>Parfum</dt>
              <dd className={ddClass}>{product.scent}</dd>
            </>
          )}
        {(pt === "gift" ||
          (pt === "home" && product.homeSubtype === "cleaningProducts")) &&
          product.packagingInfo && (
            <>
              <dt className={dtClass}>Ambalaj / informații</dt>
              <dd className={ddClass}>{product.packagingInfo}</dd>
            </>
          )}
        {pt === "gift" &&
          product.setContains &&
          product.setContains.length > 0 && (
            <>
              <dt className={dtClass}>Conținut set</dt>
              <dd className={ddClass}>
                <ul className="list-inside list-disc space-y-1">
                  {product.setContains.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        {pt === "gift" && product.recommendedOccasion && (
          <>
            <dt className={dtClass}>Ocazie</dt>
            <dd className={ddClass}>{product.recommendedOccasion}</dd>
          </>
        )}
        {pt === "perfume" && product.topNotes && (
          <>
            <dt className={dtClass}>Note de vârf</dt>
            <dd className={ddClass}>{product.topNotes}</dd>
          </>
        )}
        {pt === "perfume" && product.middleNotes && (
          <>
            <dt className={dtClass}>Note de mijloc</dt>
            <dd className={ddClass}>{product.middleNotes}</dd>
          </>
        )}
        {pt === "perfume" && product.baseNotes && (
          <>
            <dt className={dtClass}>Note de bază</dt>
            <dd className={ddClass}>{product.baseNotes}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
