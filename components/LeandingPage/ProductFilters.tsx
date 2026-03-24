"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import type {
  CatalogFilterProfile,
  CatalogLockedPreset,
} from "@/lib/catalog/types";
import {
  CONCENTRATIONS,
  SCENT_FAMILIES,
  SORT_OPTIONS,
  VOLUME_ML_OPTIONS,
} from "@/lib/constants/filters";
import {
  CLEANING_DESTINATIONS,
  DIFFUSER_TYPES,
  GENDERS,
  HOME_SUBTYPES,
} from "@/lib/constants/productOptions";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
  filterProfile: CatalogFilterProfile;
  lockedFilters?: CatalogLockedPreset;
  initialFilters: {
    q: string;
    category: string;
    olfactiveFamily: string;
    concentration: string;
    gender: string;
    homeSubtype: string;
    volume: number;
    destination: string;
    diffuserType: string;
    sort: string;
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
  };
}

export function ProductFilters({
  categories,
  filterProfile,
  lockedFilters,
  initialFilters,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    q: initialFilters.q,
    category: initialFilters.category,
    olfactiveFamily: initialFilters.olfactiveFamily,
    concentration: initialFilters.concentration,
    gender: initialFilters.gender,
    homeSubtype: initialFilters.homeSubtype,
    volume: initialFilters.volume,
    destination: initialFilters.destination,
    diffuserType: initialFilters.diffuserType,
    sort: initialFilters.sort,
    minPrice: initialFilters.minPrice,
    maxPrice: initialFilters.maxPrice,
    inStock: initialFilters.inStock,
  }));

  useEffect(() => {
    setFilters({
      q: searchParams.get("q") ?? "",
      category:
        lockedFilters?.categorySlug ?? searchParams.get("category") ?? "",
      olfactiveFamily:
        searchParams.get("olfactiveFamily") ??
        searchParams.get("scentFamily") ??
        "",
      concentration: searchParams.get("concentration") ?? "",
      gender: lockedFilters?.gender ?? searchParams.get("gender") ?? "",
      homeSubtype:
        lockedFilters?.homeSubtype ?? searchParams.get("homeSubtype") ?? "",
      volume: Number(searchParams.get("volume")) || 0,
      destination: searchParams.get("destination") ?? "",
      diffuserType: searchParams.get("diffuserType") ?? "",
      sort: searchParams.get("sort") ?? "name",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 5000,
      inStock: searchParams.get("inStock") === "true",
    });
  }, [searchParams, lockedFilters]);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    initialFilters.minPrice,
    initialFilters.maxPrice,
  ]);

  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  const showCategoryFilter =
    filterProfile === "all" && lockedFilters?.categorySlug === undefined;

  const showPerfumeFilters = useMemo(
    () =>
      filterProfile === "perfume" ||
      (filterProfile === "all" &&
        (filters.category === "" || filters.category === "perfume")),
    [filterProfile, filters.category],
  );

  const showHomeFilters = useMemo(
    () =>
      filterProfile === "home" ||
      (filterProfile === "all" && filters.category === "home"),
    [filterProfile, filters.category],
  );

  const showGenderFilter =
    showPerfumeFilters && lockedFilters?.gender === undefined;

  const showHomeSubtypeFilter =
    showHomeFilters && lockedFilters?.homeSubtype === undefined;

  const showDestinationFilter =
    showHomeFilters && filters.homeSubtype === "cleaningProducts";

  const showDiffuserFilter =
    showHomeFilters && filters.homeSubtype === "homeFragrance";

  const showVolumeFilter =
    filterProfile === "perfume" ||
    (filterProfile === "all" &&
      (filters.category === "" || filters.category === "perfume")) ||
    showDiffuserFilter;

  const currentSearch = filters.q;
  const currentCategory = filters.category;
  const currentOlfactiveFamily = filters.olfactiveFamily;
  const currentConcentration = filters.concentration;
  const currentGender = filters.gender;
  const currentHomeSubtype = filters.homeSubtype;
  const currentSort = filters.sort;
  const currentInStock = filters.inStock;

  const isSearchActive = !!currentSearch;
  const isCategoryActive =
    showCategoryFilter && !!currentCategory && currentCategory !== "";
  const isOlfactiveFamilyActive = !!currentOlfactiveFamily;
  const isConcentrationActive = !!currentConcentration;
  const isGenderActive = !!currentGender;
  const isHomeSubtypeActive = !!currentHomeSubtype;
  const isDestinationActive = !!filters.destination;
  const isDiffuserActive = !!filters.diffuserType;
  const isVolumeActive = filters.volume > 0;
  const isPriceActive = filters.minPrice > 0 || filters.maxPrice < 5000;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    (showPerfumeFilters && isOlfactiveFamilyActive) ||
    (showPerfumeFilters && isConcentrationActive) ||
    (showGenderFilter && isGenderActive) ||
    (showHomeSubtypeFilter && isHomeSubtypeActive) ||
    (showDestinationFilter && isDestinationActive) ||
    (showDiffuserFilter && isDiffuserActive) ||
    (showVolumeFilter && isVolumeActive) ||
    isPriceActive ||
    isInStockActive;

  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    showPerfumeFilters && isOlfactiveFamilyActive,
    showPerfumeFilters && isConcentrationActive,
    showGenderFilter && isGenderActive,
    showHomeSubtypeFilter && isHomeSubtypeActive,
    showDestinationFilter && isDestinationActive,
    showDiffuserFilter && isDiffuserActive,
    showVolumeFilter && isVolumeActive,
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

      params.delete("page");

      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, searchParams, pathname],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      updateParams({ minPrice: null, maxPrice: null });
    } else if (key === "volume") {
      updateParams({ volume: null });
    } else {
      updateParams({ [key]: null });
    }
  };

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
      {hasActiveFilters && (
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filtru activ" : "filtre active"}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleClearFilters}
            className="w-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <X className="mr-2 h-4 w-4" />
            Șterge filtrele opționale
          </Button>
        </div>
      )}

      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q">
          Căutare
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Caută produse..."
            defaultValue={currentSearch}
            key={currentSearch}
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

      {showCategoryFilter && (
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
              <SelectValue placeholder="Toate categoriile" />
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
      )}

      {showGenderFilter && (
        <div>
          <FilterLabel isActive={isGenderActive} filterKey="gender">
            Gen
          </FilterLabel>
          <Select
            value={currentGender || "all"}
            onValueChange={(value) =>
              updateParams({ gender: value === "all" ? null : value })
            }
          >
            <SelectTrigger
              className={
                isGenderActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="Toate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate genurile</SelectItem>
              {GENDERS.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showPerfumeFilters && (
        <>
          <div>
            <FilterLabel
              isActive={isOlfactiveFamilyActive}
              filterKey="olfactiveFamily"
            >
              Familie olfactivă
            </FilterLabel>
            <Select
              value={currentOlfactiveFamily || "all"}
              onValueChange={(value) =>
                updateParams({
                  olfactiveFamily: value === "all" ? null : value,
                })
              }
            >
              <SelectTrigger
                className={
                  isOlfactiveFamilyActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="Toate familiile" />
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

          <div>
            <FilterLabel
              isActive={isConcentrationActive}
              filterKey="concentration"
            >
              Concentrație
            </FilterLabel>
            <Select
              value={currentConcentration || "all"}
              onValueChange={(value) =>
                updateParams({
                  concentration: value === "all" ? null : value,
                })
              }
            >
              <SelectTrigger
                className={
                  isConcentrationActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="Toate concentrațiile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate concentrațiile</SelectItem>
                {CONCENTRATIONS.map((concentration) => (
                  <SelectItem
                    key={concentration.value}
                    value={concentration.value}
                  >
                    {concentration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {showHomeSubtypeFilter && (
        <div>
          <FilterLabel isActive={isHomeSubtypeActive} filterKey="homeSubtype">
            Tip produs casă
          </FilterLabel>
          <Select
            value={currentHomeSubtype || "all"}
            onValueChange={(value) =>
              updateParams({
                homeSubtype: value === "all" ? null : value,
                destination: null,
                diffuserType: null,
              })
            }
          >
            <SelectTrigger
              className={
                isHomeSubtypeActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="Toate tipurile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate tipurile</SelectItem>
              {HOME_SUBTYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showDestinationFilter && (
        <div>
          <FilterLabel isActive={isDestinationActive} filterKey="destination">
            Zonă curățenie
          </FilterLabel>
          <Select
            value={filters.destination || "all"}
            onValueChange={(value) =>
              updateParams({ destination: value === "all" ? null : value })
            }
          >
            <SelectTrigger
              className={
                isDestinationActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="Toate zonele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate zonele</SelectItem>
              {CLEANING_DESTINATIONS.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showDiffuserFilter && (
        <div>
          <FilterLabel isActive={isDiffuserActive} filterKey="diffuserType">
            Tip difuzor
          </FilterLabel>
          <Select
            value={filters.diffuserType || "all"}
            onValueChange={(value) =>
              updateParams({ diffuserType: value === "all" ? null : value })
            }
          >
            <SelectTrigger
              className={
                isDiffuserActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="Toate tipurile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate tipurile</SelectItem>
              {DIFFUSER_TYPES.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showVolumeFilter && (
        <div>
          <FilterLabel isActive={isVolumeActive} filterKey="volume">
            Volum (ml)
          </FilterLabel>
          <Select
            value={filters.volume > 0 ? String(filters.volume) : "all"}
            onValueChange={(value) =>
              updateParams({
                volume: value === "all" ? null : Number(value),
              })
            }
          >
            <SelectTrigger
              className={
                isVolumeActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="Toate volumele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate volumele</SelectItem>
              {VOLUME_ML_OPTIONS.map((v) => (
                <SelectItem key={v.value} value={String(v.value)}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <FilterLabel isActive={isPriceActive} filterKey="price">
          Interval preț: {priceRange[0]} - {priceRange[1]} RON
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
