"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { FEATURED_BANNERS } from "@/lib/landing/featured-banners";

export function FeaturedCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const navButtonClass =
    "top-1/2 z-10 h-10 w-10 -translate-y-1/2 border-0 bg-primary/85 text-primary-foreground shadow-none backdrop-blur-[2px] hover:bg-primary hover:text-primary-foreground disabled:opacity-30 sm:h-11 sm:w-11";

  return (
    <div className="relative w-full bg-background px-3 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4 md:px-6 lg:px-8">
      <div className="relative mx-auto max-w-screen-2xl">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {FEATURED_BANNERS.map((banner, index) => (
              <CarouselItem key={banner.id} className="pl-0">
                <Link
                  href={banner.href}
                  className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  aria-label={`${banner.imageAlt} — ${banner.headline}`}
                >
                  <div className="relative min-h-[150px] w-full overflow-hidden  shadow-lg aspect-20/9 sm:aspect-8/3 lg:aspect-28/9">
                    <Image
                      src={banner.imageSrc}
                      alt={banner.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1536px) 90vw, 1280px"
                      priority={index === 0}
                    />
                    <div
                      className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent"
                      aria-hidden
                    />
                    <p className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 text-center text-xs font-bold uppercase tracking-[0.12em] text-white sm:pb-6 sm:text-sm md:text-base lg:text-lg">
                      {banner.headline}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className={cn("left-2 sm:left-4", navButtonClass)}
            aria-label="Slide anterioară"
          />
          <CarouselNext
            className={cn("right-2 sm:right-4", navButtonClass)}
            aria-label="Slide următoare"
          />
        </Carousel>

        {count > 1 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  "pointer-events-auto h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
                  current === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/45 hover:bg-white/70",
                )}
                aria-label={`Salt la slide-ul ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
