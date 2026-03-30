// ============================================
// Product Attribute Constants
// Shared between frontend filters and Sanity schema
// ============================================

/** Multiselect values — labels are Romanian (Studio + filtre). */
export const OLFACTORY_FAMILIES = [
  { value: "citric", label: "Citric" },
  { value: "condimentat", label: "Condimentat" },
  { value: "dulce", label: "Dulce" },
  { value: "floral", label: "Floral" },
  { value: "fresh", label: "Fresh" },
  { value: "lemnos", label: "Lemnos" },
  { value: "oriental", label: "Oriental" },
  { value: "acvatic", label: "Acvatic" },
  { value: "aromatic", label: "Aromatic" },
  { value: "balsamic", label: "Balsamic" },
  { value: "chypre", label: "Chypre" },
  { value: "fougere", label: "Fougère" },
  { value: "fructat", label: "Fructat" },
  { value: "gurmand", label: "Gurmand" },
  { value: "moscat", label: "Moscat" },
  { value: "pielarie", label: "Pielărie" },
  { value: "pudrat", label: "Pudrat" },
  { value: "rasinos", label: "Rășinos" },
  { value: "vanilat", label: "Vanilat" },
] as const;

/** Concentrații — etichete în română. */
export const CONCENTRATIONS = [
  { value: "parfum", label: "Parfum" },
  { value: "apa-de-parfum", label: "Apă de parfum" },
  { value: "apa-de-toaleta", label: "Apă de toaletă" },
  { value: "apa-de-colonie", label: "Apă de colonie" },
  { value: "extrait-de-parfum", label: "Extrait de parfum" },
  { value: "elixir", label: "Elixir" },
  { value: "apa-proaspata", label: "Apă proaspătă (eau fraîche)" },
  { value: "parfum-solid", label: "Parfum solid" },
  { value: "ulei-parfumat", label: "Ulei parfumat" },
  { value: "parfum-intens", label: "Parfum intens" },
] as const;

/** Opțiuni pentru filtrul de volum (string, ca în Studio). */
export const VOLUME_STRING_OPTIONS = [
  { value: "30ml", label: "30 ml" },
  { value: "50ml", label: "50 ml" },
  { value: "75ml", label: "75 ml" },
  { value: "90ml", label: "90 ml" },
  { value: "100ml", label: "100 ml" },
  { value: "125ml", label: "125 ml" },
  { value: "200ml", label: "200 ml" },
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
] as const;

export type OlfactoryFamilyValue = (typeof OLFACTORY_FAMILIES)[number]["value"];
export type ConcentrationValue = (typeof CONCENTRATIONS)[number]["value"];
export type VolumeStringValue = (typeof VOLUME_STRING_OPTIONS)[number]["value"];
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const OLFACTORY_FAMILIES_SANITY_LIST = OLFACTORY_FAMILIES.map(
  ({ value, label }) => ({
    title: label,
    value,
  }),
);

export const CONCENTRATIONS_SANITY_LIST = CONCENTRATIONS.map(
  ({ value, label }) => ({
    title: label,
    value,
  }),
);

export const OLFACTORY_LABEL_BY_VALUE = Object.fromEntries(
  OLFACTORY_FAMILIES.map((f) => [f.value, f.label]),
) as Record<OlfactoryFamilyValue, string>;

export const CONCENTRATION_LABEL_BY_VALUE = Object.fromEntries(
  CONCENTRATIONS.map((c) => [c.value, c.label]),
) as Record<ConcentrationValue, string>;

export const OLFACTORY_FAMILY_VALUES = OLFACTORY_FAMILIES.map((f) => f.value) as [
  OlfactoryFamilyValue,
  ...OlfactoryFamilyValue[],
];

export const CONCENTRATION_VALUES = CONCENTRATIONS.map((c) => c.value) as [
  ConcentrationValue,
  ...ConcentrationValue[],
];

/** @deprecated Folosiți OLFACTORY_FAMILIES — alias pentru compatibilitate. */
export const SCENT_FAMILIES = OLFACTORY_FAMILIES;

/** @deprecated */
export type ScentFamilyValue = OlfactoryFamilyValue;

/** @deprecated */
export const SCENT_FAMILIES_SANITY_LIST = OLFACTORY_FAMILIES_SANITY_LIST;

/** @deprecated */
export const SCENT_FAMILY_VALUES = OLFACTORY_FAMILY_VALUES;
