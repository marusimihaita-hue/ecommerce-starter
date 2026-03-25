"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StockBadge } from "@/components/StockBadge";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images ?? [];
  const mainImageUrl = images[0]?.asset?.url;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const hasMultipleImages = images.length > 1;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border-0 bg-card p-0 text-card-foreground shadow-sm ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-linear-to-br from-muted to-background",
            hasMultipleImages ? "aspect-square" : "aspect-4/5",
          )}
        >
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={product.name ?? "Product image"}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg
                className="h-16 w-16 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {isOutOfStock && (
            <Badge
              variant="destructive"
              className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium shadow-lg"
            >
              Stoc epuizat
            </Badge>
          )}
          {product.category && (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
              {product.category.title}
            </span>
          )}
        </div>
      </Link>

      {/* Thumbnail strip - only show if multiple images */}
      {/*  {hasMultipleImages && (
        <div className="flex gap-2 border-t border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
          {images.map((image, index) => (
            <button
              key={image._key ?? index}
              type="button"
              className={cn(
                "relative h-14 flex-1 overflow-hidden rounded-lg transition-all duration-200",
                hoveredImageIndex === index
                  ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-white dark:ring-offset-zinc-900"
                  : "opacity-50 hover:opacity-100",
              )}
              onMouseEnter={() => setHoveredImageIndex(index)}
              onMouseLeave={() => setHoveredImageIndex(null)}
            >
              {image.asset?.url && (
                <Image
                  src={image.asset.url}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              )}
            </button>
          ))}
        </div>
      )} */}

      <CardContent className="flex grow flex-col justify-between gap-2 pb-5">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        {/*    <div className="flex flex-wrap items-center gap-2">
          {product.concentration && (
            <Badge
              variant="secondary"
              className="rounded-full bg-zinc-100 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {formatLabel(product.concentration)}
            </Badge>
          )}
          {product.volumeMl && (
            <Badge
              variant="outline"
              className="rounded-full text-xs font-medium"
            >
              {product.volumeMl} ml
            </Badge>
          )}
          {product.scentFamily && (
            <span className="text-xs capitalize text-zinc-500 dark:text-zinc-400">
              {formatLabel(product.scentFamily)}
            </span>
          )}
        </div>
       */}
        <div className="flex items-baseline justify-between gap-2 m-1">
          <p className="text-xl font-bold tracking-tight text-foreground">
            {formatPrice(product.price)}
          </p>
          <StockBadge productId={product._id} stock={stock} />
        </div>
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={mainImageUrl ?? undefined}
          stock={stock}
          className="mt-1 rounded-sm"
        />
      </CardContent>
    </Card>
  );
}
