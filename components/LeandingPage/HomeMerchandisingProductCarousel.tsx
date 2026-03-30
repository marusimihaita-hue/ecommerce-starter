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
        // false: pe telefon un slide = un produs + swipe care se ancorează; pe desktop rămâne derulare snap pe slide
        dragFree: false,
      }}
      className="relative w-full"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="mb-10 basis-full pl-3 sm:basis-[calc(50%-1rem)] sm:pl-4 md:basis-[calc(33.33%-1rem)] lg:basis-[calc(25%-1rem)] xl:basis-[calc(20%-1rem)]"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        aria-label="Produse anterioare"
        className="flex top-1/2 left-0 z-10 size-9 -translate-y-1/2 border-border bg-background/95 text-foreground shadow-md backdrop-blur-sm max-sm:left-0.5 max-sm:size-8"
      />
      <CarouselNext
        aria-label="Produse următoare"
        className="flex top-1/2 right-0 z-10 size-9 -translate-y-1/2 border-border bg-background/95 text-foreground shadow-md backdrop-blur-sm max-sm:right-0.5 max-sm:size-8"
      />
    </Carousel>
  );
}
