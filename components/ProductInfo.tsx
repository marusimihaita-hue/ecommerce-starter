import { CreditCard, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import TiktokIcon from "@/components/ui/tiktok";
import { StockBadge } from "@/components/StockBadge";
import { CATEGORY_KIND_LABELS } from "@/lib/constants/productOptions";
import { FREE_SHIPPING_THRESHOLD_RON } from "@/lib/constants/shipping";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;
  const pt = product.productType;
  const typeTitle =
    (pt && CATEGORY_KIND_LABELS[pt as keyof typeof CATEGORY_KIND_LABELS]) ?? pt;

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

      {typeTitle && (
        <p className="mt-1 text-sm text-muted-foreground">{typeTitle}</p>
      )}

      <p className="mt-5 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        {formatPrice(product.price)}
      </p>

      {product.tiktokReviewUrl ? (
        <a
          href={product.tiktokReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Deschide review-ul pe TikTok într-un tab nou"
          className="group mt-4 inline-flex max-w-full items-center gap-2  py-2.5 text-sm "
        >
          {/*    <ExternalLink
            className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary"
            aria-hidden
          /> */}
          <span className="inline-flex items-center gap-1.5 leading-none text-muted-foreground text-lg">
            Vezi review pe
            <span className="inline-flex shrink-0 text-red-800" aria-hidden>
              <TiktokIcon size={40} color="currentColor" />
            </span>
          </span>
        </a>
      ) : null}

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
    </div>
  );
}
