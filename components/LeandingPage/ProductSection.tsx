"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductFilters } from "@/components/LeandingPage/ProductFilters";
import { ProductGrid } from "@/components/LeandingPage/ProductGrid";
import { Button } from "@/components/ui/button";
import type {
  CatalogFilterProfile,
  CatalogLockedPreset,
} from "@/lib/catalog/types";
import type {
  ALL_CATEGORIES_QUERYResult,
  FILTER_PRODUCTS_BY_NAME_QUERYResult,
} from "@/sanity.types";

interface ProductSectionProps {
  categories: ALL_CATEGORIES_QUERYResult;
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
  /** When paginated server-side, total matching products (not just current page). */
  totalCount?: number;
  filterProfile?: CatalogFilterProfile;
  lockedFilters?: CatalogLockedPreset;
  searchQuery: string;
  categorySlug: string;
  olfactiveFamily: string;
  concentration: string;
  gender: string;
  giftFor: string;
  volume: string;
  diffuserType: string;
  sort: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
}

export function ProductSection({
  categories,
  products,
  totalCount,
  filterProfile = "all",
  lockedFilters,
  searchQuery,
  categorySlug,
  olfactiveFamily,
  concentration,
  gender,
  giftFor,
  volume,
  diffuserType,
  sort,
  minPrice,
  maxPrice,
  inStock,
}: ProductSectionProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const displayCount = totalCount ?? products.length;

  // Show filters by default on desktop, hide on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setFiltersOpen(true);
      } else {
        setFiltersOpen(false);
      }
    };
    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{displayCount}</span>{" "}
          {displayCount === 1 ? "produs găsit" : "produse găsite"}
          {searchQuery && (
            <span>
              {" "}
              pentru{" "}
              <span className="font-medium text-foreground">
                &quot;{searchQuery}&quot;
              </span>
            </span>
          )}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="shrink-0 gap-2 shadow-sm"
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
          aria-label={
            filtersOpen ? "Ascunde panoul de filtre" : "Afișează panoul de filtre"
          }
        >
          {filtersOpen ? (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span className="hidden sm:inline">Ascunde filtrele</span>
              <span className="sm:hidden">Ascunde</span>
            </>
          ) : (
            <>
              <PanelLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Afișează filtrele</span>
              <span className="sm:hidden">Filtre</span>
            </>
          )}
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside
          id="catalog-filters"
          className={`shrink-0 transition-all duration-300 ease-in-out ${
            filtersOpen
              ? "w-full lg:w-72 lg:sticky lg:top-20 lg:self-start lg:opacity-100"
              : "hidden lg:hidden"
          }`}
        >
          <ProductFilters
            categories={categories}
            filterProfile={filterProfile}
            lockedFilters={lockedFilters}
            initialFilters={{
              q: searchQuery,
              category: categorySlug,
              olfactiveFamily,
              concentration,
              gender,
              giftFor,
              volume,
              diffuserType,
              sort,
              minPrice,
              maxPrice,
              inStock,
            }}
          />
        </aside>

        {/* Product Grid - expands to full width when filters hidden */}
        <main className="min-w-0 flex-1 transition-all duration-300">
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
