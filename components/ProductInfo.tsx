import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
// import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/StockBadge";
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

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;
  const pt = product.productType;

  return (
    <div className="flex flex-col">
      {product.category && (
        <Link
          href={`/catalog/${product.category.slug}`}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          {product.category.title}
        </Link>
      )}

      {product.brand && (
        <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {product.brand}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {product.name}
      </h1>

      {pt && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {productTypeLabel[pt] ?? pt}
        </p>
      )}

      <p className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {formatPrice(product.price)}
      </p>

      {product.description && (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <StockBadge productId={product._id} stock={product.stock ?? 0} />
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={imageUrl ?? undefined}
          stock={product.stock ?? 0}
        />
      </div>

      <div className="mt-6 space-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {pt === "perfume" && product.gender && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Gen</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatLabel(product.gender)}
            </span>
          </div>
        )}
        {product.volume != null && product.volume > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Volum</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.volume} ml
            </span>
          </div>
        )}
        {pt === "perfume" && product.concentration && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Concentrație
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatLabel(product.concentration)}
            </span>
          </div>
        )}
        {pt === "perfume" && product.olfactiveFamily && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Familie olfactivă
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatLabel(product.olfactiveFamily)}
            </span>
          </div>
        )}
        {pt === "home" &&
          product.homeSubtype === "cleaningProducts" &&
          product.destination && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Destinație
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {formatLabel(product.destination)}
              </span>
            </div>
          )}
        {pt === "home" &&
          product.homeSubtype === "homeFragrance" &&
          product.diffuserType && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Tip</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {formatLabel(product.diffuserType)}
              </span>
            </div>
          )}
        {pt === "home" &&
          product.homeSubtype === "homeFragrance" &&
          product.scent && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Parfum</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {product.scent}
              </span>
            </div>
          )}
        {(pt === "gift" ||
          (pt === "home" && product.homeSubtype === "cleaningProducts")) &&
          product.packagingInfo && (
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                Ambalaj / informații
              </span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {product.packagingInfo}
              </span>
            </div>
          )}
        {pt === "gift" && product.setContains && product.setContains.length > 0 && (
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Conținut set
            </span>
            <ul className="list-inside list-disc font-medium text-zinc-900 dark:text-zinc-100">
              {product.setContains.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {pt === "gift" && product.recommendedOccasion && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Ocazie</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.recommendedOccasion}
            </span>
          </div>
        )}
        {pt === "perfume" && product.topNotes && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Note de vârf
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.topNotes}
            </span>
          </div>
        )}
        {pt === "perfume" && product.middleNotes && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              Note de mijloc
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {product.middleNotes}
            </span>
          </div>
        )}
        {pt === "perfume" && product.baseNotes && (
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
