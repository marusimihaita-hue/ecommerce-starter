// ============================================
// Product Attribute Constants
// Shared between frontend filters and Sanity schema
// ============================================

export const SCENT_FAMILIES = [
  { value: "floral", label: "Floral" },
  { value: "woody", label: "Woody" },
  { value: "oriental", label: "Oriental" },
  { value: "fresh", label: "Fresh" },
  { value: "citrus", label: "Citrus" },
  { value: "amber", label: "Amber" },
  { value: "aromatic", label: "Aromatic" },
] as const;

export const CONCENTRATIONS = [
  { value: "eau-de-cologne", label: "Eau de Cologne" },
  { value: "eau-de-toilette", label: "Eau de Toilette" },
  { value: "eau-de-parfum", label: "Eau de Parfum" },
  { value: "parfum", label: "Parfum" },
  { value: "elixir", label: "Elixir" },
] as const;

export const VOLUME_ML_OPTIONS = [
  { value: 30, label: "30 ml" },
  { value: 50, label: "50 ml" },
  { value: 75, label: "75 ml" },
  { value: 90, label: "90 ml" },
  { value: 100, label: "100 ml" },
  { value: 125, label: "125 ml" },
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
] as const;

// Type exports
export type ScentFamilyValue = (typeof SCENT_FAMILIES)[number]["value"];
export type ConcentrationValue = (typeof CONCENTRATIONS)[number]["value"];
export type VolumeMlValue = (typeof VOLUME_ML_OPTIONS)[number]["value"];
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ============================================
// Sanity Schema Format Exports
// Format compatible with Sanity's options.list
// ============================================

/** Scent families formatted for Sanity schema options.list */
export const SCENT_FAMILIES_SANITY_LIST = SCENT_FAMILIES.map(
  ({ value, label }) => ({
    title: label,
    value,
  }),
);

/** Concentrations formatted for Sanity schema options.list */
export const CONCENTRATIONS_SANITY_LIST = CONCENTRATIONS.map(
  ({ value, label }) => ({
    title: label,
    value,
  }),
);

/** Scent family values array for zod enums or validation */
export const SCENT_FAMILY_VALUES = SCENT_FAMILIES.map((f) => f.value) as [
  ScentFamilyValue,
  ...ScentFamilyValue[],
];

/** Concentration values array for zod enums or validation */
export const CONCENTRATION_VALUES = CONCENTRATIONS.map((c) => c.value) as [
  ConcentrationValue,
  ...ConcentrationValue[],
];
