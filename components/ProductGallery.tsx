"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

type ProductImages = NonNullable<
  NonNullable<PRODUCT_BY_SLUG_QUERYResult>["images"]
>;

interface ProductGalleryProps {
  images: ProductImages | null;
  productName: string | null;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <span className="text-zinc-400">Nicio imagine disponibilă</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {selectedImage?.asset?.url ? (
          <Image
            src={selectedImage.asset.url}
            alt={productName ?? "Product image"}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            Fără imagine
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <button
              key={image._key}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Imaginea ${index + 1}`}
              aria-pressed={selectedIndex === index}
              className={cn(
                "relative aspect-square w-[4.5rem] shrink-0 overflow-hidden rounded-md bg-zinc-100 transition-all sm:w-20 dark:bg-zinc-800",
                selectedIndex === index
                  ? "ring-2 ring-zinc-900 dark:ring-zinc-100"
                  : "hover:opacity-75",
              )}
            >
              {image.asset?.url ? (
                <Image
                  src={image.asset.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                  Indisponibil
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
