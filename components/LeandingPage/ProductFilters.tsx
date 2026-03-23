"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  CONCENTRATIONS,
  SCENT_FAMILIES,
  SORT_OPTIONS,
} from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
  initialFilters: {
    q: string;
    category: string;
    scentFamily: string;
    concentration: string;
    sort: string;
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
  };
}

export function ProductFilters({
  categories,
  initialFilters,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Important: first client render must match SSR to avoid Radix hydration mismatch.
  // So we render based on `initialFilters` (from server), and only sync after mount.
  const [filters, setFilters] = useState(() => ({
    q: initialFilters.q,
    category: initialFilters.category,
    scentFamily: initialFilters.scentFamily,
    concentration: initialFilters.concentration,
    sort: initialFilters.sort,
    minPrice: initialFilters.minPrice,
    maxPrice: initialFilters.maxPrice,
    inStock: initialFilters.inStock,
  }));

  useEffect(() => {
    setFilters({
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
      scentFamily: searchParams.get("scentFamily") ?? "",
      concentration: searchParams.get("concentration") ?? "",
      sort: searchParams.get("sort") ?? "name",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 5000,
      inStock: searchParams.get("inStock") === "true",
    });
  }, [searchParams]);

  // Local state for price range (for smooth slider dragging)
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    initialFilters.minPrice,
    initialFilters.maxPrice,
  ]);

  // Keep slider in sync when filters are updated from URL
  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  // Check which filters are active
  const currentSearch = filters.q;
  const currentCategory = filters.category;
  const currentScentFamily = filters.scentFamily;
  const currentConcentration = filters.concentration;
  const currentSort = filters.sort;
  const currentInStock = filters.inStock;

  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isScentFamilyActive = !!currentScentFamily;
  const isConcentrationActive = !!currentConcentration;
  const isPriceActive = filters.minPrice > 0 || filters.maxPrice < 5000;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    isScentFamilyActive ||
    isConcentrationActive ||
    isPriceActive ||
    isInStockActive;

  // Count active filters
  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isScentFamilyActive,
    isConcentrationActive,
    isPriceActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      updateParams({ minPrice: null, maxPrice: null });
    } else {
      updateParams({ [key]: null });
    }
  };

  // Helper for filter label with active indicator
  const FilterLabel = ({
    children,
    isActive,
    filterKey,
  }: {
    children: React.ReactNode;
    isActive: boolean;
    filterKey: string;
  }) => (
    <div className="mb-2 flex items-center justify-between">
      <span
        className={`block text-sm font-medium ${
          isActive
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        {children}
        {isActive && (
          <Badge className="ml-2 h-5 bg-amber-500 px-1.5 text-xs text-white hover:bg-amber-500">
            Activ
          </Badge>
        )}
      </span>
      {isActive && (
        <button
          type="button"
          onClick={() => clearSingleFilter(filterKey)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label={`Clear ${filterKey} filter`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Clear Filters - Show at top when active */}
      {hasActiveFilters && (
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filter" : "filters"} applied
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleClearFilters}
            className="w-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <X className="mr-2 h-4 w-4" />
            Șterge toate filtrele
          </Button>
        </div>
      )}

      {/* Search */}
      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q">
          Căutare
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search perfumes..."
            defaultValue={currentSearch}
            className={`flex-1 ${
              isSearchActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }`}
          />
          <Button type="submit" size="sm">
            Caută
          </Button>
        </form>
      </div>

      {/* Category */}
      <div>
        <FilterLabel isActive={isCategoryActive} filterKey="category">
          Categorie
        </FilterLabel>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParams({ category: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isCategoryActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate categoriile</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scent Family */}
      <div>
        <FilterLabel isActive={isScentFamilyActive} filterKey="scentFamily">
          Familie olfactivă
        </FilterLabel>
        <Select
          value={currentScentFamily || "all"}
          onValueChange={(value) =>
            updateParams({ scentFamily: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isScentFamilyActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }
          >
            <SelectValue placeholder="All Scent Families" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate familiile olfactive</SelectItem>
            {SCENT_FAMILIES.map((family) => (
              <SelectItem key={family.value} value={family.value}>
                {family.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Concentration */}
      <div>
        <FilterLabel isActive={isConcentrationActive} filterKey="concentration">
          Concentrație
        </FilterLabel>
        <Select
          value={currentConcentration || "all"}
          onValueChange={(value) =>
            updateParams({ concentration: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isConcentrationActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }
          >
            <SelectValue placeholder="All Concentrations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate concentrațiile</SelectItem>
            {CONCENTRATIONS.map((concentration) => (
              <SelectItem key={concentration.value} value={concentration.value}>
                {concentration.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <FilterLabel isActive={isPriceActive} filterKey="price">
          Interval preț: {priceRange[0]} - {priceRange[1]}RON
        </FilterLabel>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={([min, max]) =>
            updateParams({
              minPrice: min > 0 ? min : null,
              maxPrice: max < 5000 ? max : null,
            })
          }
          className={`mt-4 ${isPriceActive ? "[&_[role=slider]]:border-amber-500 [&_[role=slider]]:ring-amber-500" : ""}`}
        />
      </div>

      {/* In Stock Only */}
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-5 w-5 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800"
          />
          <span
            className={`text-sm font-medium ${
              isInStockActive
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Doar produse în stoc
            {isInStockActive && (
              <Badge className="ml-2 h-5 bg-amber-500 px-1.5 text-xs text-white hover:bg-amber-500">
                Activ
              </Badge>
            )}
          </span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Sortează după
        </span>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
