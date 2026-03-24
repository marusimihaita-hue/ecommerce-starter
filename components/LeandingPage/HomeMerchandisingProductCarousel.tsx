"use client";

import { ProductCard } from "@/components/LeandingPage/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { PRODUCTS_ON_SALE_HOME_QUERYResult } from "@/sanity.types";

type RowProduct = PRODUCTS_ON_SALE_HOME_QUERYResult[number];

interface HomeMerchandisingProductCarouselProps {
  products: RowProduct[];
}

export function HomeMerchandisingProductCarousel({
  products,
}: HomeMerchandisingProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
      }}
      className="relative w-full px-2 sm:px-10 "
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="basis-[75%] pl-3 sm:basis-[calc(50%-1rem)] sm:pl-4 md:basis-[calc(33.33%-1rem)] lg:basis-[calc(25%-1rem)] xl:basis-[calc(20%-1rem)] mb-10"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        aria-label="Produse anterioare"
        className="hidden sm:flex top-1/2 left-0 z-10 size-9 -translate-y-1/2 border-zinc-200 bg-white/95 shadow-md backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/95"
      />
      <CarouselNext
        aria-label="Produse următoare"
        className="hidden sm:flex top-1/2 right-0 z-10 size-9 -translate-y-1/2 border-zinc-200 bg-white/95 shadow-md backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/95"
      />
    </Carousel>
  );
}
