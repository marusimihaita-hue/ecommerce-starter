"use client";

import { Suspense } from "react";
import {
  useDocument,
  useEditDocument,
  type DocumentHandle,
} from "@sanity/sdk-react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FeaturedToggleProps extends DocumentHandle {}

function FeaturedToggleContent(handle: FeaturedToggleProps) {
  const { data: featuredOnHome } = useDocument({
    ...handle,
    path: "featuredOnHome",
  });
  const editFeaturedOnHome = useEditDocument({
    ...handle,
    path: "featuredOnHome",
  });

  const isFeatured = featuredOnHome as boolean;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editFeaturedOnHome(!isFeatured)}
      title={isFeatured ? "Remove from featured" : "Add to featured"}
    >
      <Star
        className={cn(
          "h-4 w-4 transition-colors",
          isFeatured
            ? "fill-amber-400 text-amber-400"
            : "text-zinc-300 dark:text-zinc-600",
        )}
      />
    </Button>
  );
}

function FeaturedToggleSkeleton() {
  return <Skeleton className="h-8 w-8" />;
}

export function FeaturedToggle(props: FeaturedToggleProps) {
  return (
    <Suspense fallback={<FeaturedToggleSkeleton />}>
      <FeaturedToggleContent {...props} />
    </Suspense>
  );
}
