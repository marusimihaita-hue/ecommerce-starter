"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductFilters } from "@/components/LeandingPage/ProductFilters";
import { ProductGrid } from "@/components/LeandingPage/ProductGrid";
import { Button } from "@/components/ui/button";
import type {
  ALL_CATEGORIES_QUERYResult,
  FILTER_PRODUCTS_BY_NAME_QUERYResult,
} from "@/sanity.types";

interface ProductSectionProps {
  categories: ALL_CATEGORIES_QUERYResult;
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
  searchQuery: string;
  categorySlug: string;
  scentFamily: string;
  concentration: string;
  sort: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
}

export function ProductSection({
  categories,
  products,
  searchQuery,
  categorySlug,
  scentFamily,
  concentration,
  sort,
  minPrice,
  maxPrice,
  inStock,
}: ProductSectionProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

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
      {/* Header with results count and filter toggle */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {products.length} {products.length === 1 ? "produs" : "produse"}{" "}
          găsite
          {searchQuery && (
            <span>
              {" "}
              for &quot;<span className="font-medium">{searchQuery}</span>&quot;
            </span>
          )}
        </p>

        {/* Filter toggle button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 border-zinc-300 bg-white shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label={filtersOpen ? "Hide filters" : "Show filters"}
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
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters - completely hidden when collapsed on desktop */}
        <aside
          className={`shrink-0 transition-all duration-300 ease-in-out ${
            filtersOpen ? "w-full lg:w-72 lg:opacity-100" : "hidden lg:hidden"
          }`}
        >
          <ProductFilters
            categories={categories}
            initialFilters={{
              q: searchQuery,
              category: categorySlug,
              scentFamily,
              concentration,
              sort,
              minPrice,
              maxPrice,
              inStock,
            }}
          />
        </aside>

        {/* Product Grid - expands to full width when filters hidden */}
        <main className="flex-1 transition-all duration-300">
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
