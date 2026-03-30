import { Skeleton } from "@/components/ui/skeleton";

export function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Title */}
      <Skeleton className="h-9 w-3/4" />

      {/* Price */}
      <Skeleton className="h-8 w-28" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Stock Badge */}
      <Skeleton className="h-6 w-20" />

      {/* Add to Cart Button */}
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
