import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
// import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/StockBadge";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;
  const formatLabel = (value: string) =>
    value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <div className="flex flex-col">
      {/* Category */}
      {product.category && (
        <Link
          href={`/?category=${product.category.slug}`}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          {product.category.title}
        </Link>
      )}

      {/* Title */}
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {formatPrice(product.price)}
      </p>

      {/* Description */}
      {product.description && (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
      )}

      {/* Stock & Add to Cart */}
      <div className="mt-6 flex flex-col gap-3">
        <StockBadge productId={product._id} stock={product.stock ?? 0} />
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={imageUrl ?? undefined}
          stock={product.stock ?? 0}
        />
        {/*   <AskAISimilarButton productName={product.name ?? "this product"} /> */}
      </div>

      {/* Metadata */}
      <div className="mt-6 space-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {product.volumeMl && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Volum</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.volumeMl} ml
            </span>
          </div>
        )}
        {product.concentration && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Concentrație
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatLabel(product.concentration)}
            </span>
          </div>
        )}
        {product.scentFamily && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Familie olfactivă
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatLabel(product.scentFamily)}
            </span>
          </div>
        )}
        {product.topNotes && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Note de vârf
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.topNotes}
            </span>
          </div>
        )}
        {product.middleNotes && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Note de mijloc
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.middleNotes}
            </span>
          </div>
        )}
        {product.baseNotes && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Note de bază
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.baseNotes}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
