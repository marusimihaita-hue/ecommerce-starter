import { ProductGallerySkeleton } from "@/components/ProductGallerySkeleton";
import { ProductInfoSkeleton } from "@/components/ProductInfoSkeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallerySkeleton />
          <ProductInfoSkeleton />
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-10 dark:border-zinc-800 lg:mt-14 lg:pt-12">
          <div className="h-8 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-6 rounded-lg border-2 border-zinc-900 bg-white p-6 shadow-md dark:border-zinc-100 dark:bg-zinc-900 sm:p-8">
            <div className="h-7 w-3/4 max-w-md rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
            <div className="mt-8 space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-700">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-full max-w-md rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-full max-w-md rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
