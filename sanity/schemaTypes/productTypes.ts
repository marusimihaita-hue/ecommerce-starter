import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CONCENTRATIONS_SANITY_LIST,
  SCENT_FAMILIES_SANITY_LIST,
} from "@/lib/constants/filters";
import {
  CLEANING_DESTINATION_SANITY_LIST,
  DIFFUSER_TYPE_SANITY_LIST,
  GENDER_SANITY_LIST,
  HOME_SUBTYPE_SANITY_LIST,
  PRODUCT_TYPE_SANITY_LIST,
} from "@/lib/constants/productOptions";

type ProductLike = {
  productType?: string;
  homeSubtype?: string;
};

const isPerfume = (doc: ProductLike | undefined) =>
  doc?.productType === "perfume";

const isHome = (doc: ProductLike | undefined) => doc?.productType === "home";

const isCleaning = (doc: ProductLike | undefined) =>
  doc?.productType === "home" && doc?.homeSubtype === "cleaningProducts";

const isHomeFragrance = (doc: ProductLike | undefined) =>
  doc?.productType === "home" && doc?.homeSubtype === "homeFragrance";

const isGift = (doc: ProductLike | undefined) => doc?.productType === "gift";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "type", title: "Product type" },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
    { name: "merchandising", title: "Merchandising" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "details",
      validation: (rule) => [rule.required().error("Product name is required")],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "brand",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "price",
      type: "number",
      group: "details",
      description: "Product price (e.g., 399.99)",
      validation: (rule) => [
        rule.required().error("Price is required"),
        rule.positive().error("Price must be a positive number"),
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      group: "details",
      rows: 4,
      description: "Product description",
      validation: (rule) => [rule.required().error("Description is required")],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
    }),
    defineField({
      name: "productType",
      title: "Product type",
      type: "string",
      group: "type",
      options: {
        list: [...PRODUCT_TYPE_SANITY_LIST],
        layout: "radio",
      },
      initialValue: "perfume",
      validation: (rule) => [rule.required().error("Select a product type")],
    }),

    // --- Perfume ---
    defineField({
      name: "gender",
      type: "string",
      group: "type",
      options: {
        list: [...GENDER_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isPerfume(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isPerfume(doc) && !value) {
            return "Gender is required for perfume products";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "volume",
      title: "Volume (ml)",
      type: "number",
      group: "type",
      description: "Size in milliliters (perfume, cleaning, or home fragrance)",
      hidden: ({ document }) => {
        const doc = document as ProductLike | undefined;
        return !(isPerfume(doc) || isCleaning(doc) || isHomeFragrance(doc));
      },
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          const needsVolume =
            isPerfume(doc) || isCleaning(doc) || isHomeFragrance(doc);
          if (needsVolume && (value === undefined || value === null)) {
            return "Volume is required";
          }
          if (value !== undefined && value !== null) {
            const n = Number(value);
            if (Number.isNaN(n) || n <= 0) return "Volume must be positive";
            if (!Number.isInteger(n)) return "Volume must be a whole number";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "concentration",
      type: "string",
      group: "type",
      options: {
        list: CONCENTRATIONS_SANITY_LIST,
        layout: "radio",
      },
      hidden: ({ document }) => !isPerfume(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isPerfume(doc) && !value) {
            return "Concentration is required for perfume products";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "olfactiveFamily",
      title: "Olfactive family",
      type: "string",
      group: "type",
      options: {
        list: SCENT_FAMILIES_SANITY_LIST,
        layout: "radio",
      },
      hidden: ({ document }) => !isPerfume(document as ProductLike),
    }),
    defineField({
      name: "topNotes",
      title: "Top notes",
      type: "string",
      group: "type",
      description: "Example: Citrus, Oud, Bergamot",
      hidden: ({ document }) => !isPerfume(document as ProductLike),
    }),
    defineField({
      name: "middleNotes",
      title: "Middle notes",
      type: "string",
      group: "type",
      description: "Example: Rose, Jasmine, Saffron",
      hidden: ({ document }) => !isPerfume(document as ProductLike),
    }),
    defineField({
      name: "baseNotes",
      title: "Base notes",
      type: "string",
      group: "type",
      description: "Example: Vanilla, Musk, Sandalwood",
      hidden: ({ document }) => !isPerfume(document as ProductLike),
    }),

    // --- Home ---
    defineField({
      name: "homeSubtype",
      title: "Home subtype",
      type: "string",
      group: "type",
      options: {
        list: [...HOME_SUBTYPE_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isHome(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isHome(doc) && !value) {
            return "Select cleaning products or home fragrance";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "destination",
      title: "Destination (cleaning)",
      type: "string",
      group: "type",
      options: {
        list: [...CLEANING_DESTINATION_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isCleaning(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isCleaning(doc) && !value) {
            return "Destination is required for cleaning products";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "packagingInfo",
      title: "Packaging info",
      type: "text",
      group: "type",
      rows: 3,
      hidden: ({ document }) => {
        const doc = document as ProductLike | undefined;
        return !(isCleaning(doc) || isGift(doc));
      },
    }),
    defineField({
      name: "diffuserType",
      title: "Diffuser type",
      type: "string",
      group: "type",
      options: {
        list: [...DIFFUSER_TYPE_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isHomeFragrance(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isHomeFragrance(doc) && !value) {
            return "Diffuser type is required";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "scent",
      title: "Scent",
      type: "string",
      group: "type",
      description: "Home fragrance scent description",
      hidden: ({ document }) => !isHomeFragrance(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isHomeFragrance(doc) && !String(value ?? "").trim()) {
            return "Scent is required for home fragrance";
          }
          return true;
        }),
      ],
    }),

    // --- Gift ---
    defineField({
      name: "setContains",
      title: "Set contains",
      type: "array",
      group: "type",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ document }) => !isGift(document as ProductLike),
    }),
    defineField({
      name: "recommendedOccasion",
      title: "Recommended occasion",
      type: "string",
      group: "type",
      hidden: ({ document }) => !isGift(document as ProductLike),
    }),

    defineField({
      name: "images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => [
        rule.min(1).error("At least one image is required"),
      ],
    }),
    defineField({
      name: "stock",
      type: "number",
      group: "inventory",
      initialValue: 0,
      description: "Number of items in stock",
      validation: (rule) => [
        rule.min(0).error("Stock cannot be negative"),
        rule.integer().error("Stock must be a whole number"),
      ],
    }),

    defineField({
      name: "featuredOnHome",
      title: "Featured on home",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
      description: "Show on homepage carousel",
    }),
    defineField({
      name: "onSale",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "popular",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "newArrival",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "gift",
      title: "Gift highlight",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
      description: "Highlight as gift idea (any product type)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      categoryKind: "category.kind",
      media: "images.0",
      price: "price",
      productType: "productType",
      concentration: "concentration",
      volume: "volume",
    },
    prepare({
      title,
      categoryKind,
      media,
      price,
      productType,
      concentration,
      volume,
    }) {
      const categoryLabel =
        categoryKind === "perfume"
          ? "Parfum"
          : categoryKind === "home"
            ? "Casă"
            : categoryKind === "gift"
              ? "Cadou"
              : categoryKind
                ? String(categoryKind)
                : "";
      const typeLabel = productType ?? "";
      const sizeLabel =
        concentration && volume
          ? `${concentration} • ${volume} ml`
          : concentration || (volume ? `${volume} ml` : "");

      return {
        title,
        subtitle: [categoryLabel, typeLabel, sizeLabel, `${price ?? 0} RON`]
          .filter(Boolean)
          .join(" • "),
        media,
      };
    },
  },
});
