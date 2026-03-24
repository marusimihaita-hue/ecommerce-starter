import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarouselSkeleton() {
  return (
    <div className="relative w-full bg-zinc-950 px-3 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4 md:px-6 lg:px-8">
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="relative min-h-[150px] w-full overflow-hidden rounded-xl shadow-lg aspect-20/9 sm:aspect-8/3 lg:aspect-28/9">
          <Skeleton className="h-full w-full rounded-xl bg-zinc-800" />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6">
          <Skeleton className="h-2 w-6 rounded-full bg-zinc-600" />
          <Skeleton className="h-2 w-2 rounded-full bg-zinc-600" />
          <Skeleton className="h-2 w-2 rounded-full bg-zinc-600" />
        </div>
      </div>
    </div>
  );
}
