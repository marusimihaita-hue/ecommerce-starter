import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CONCENTRATIONS_SANITY_LIST,
  OLFACTORY_FAMILIES_SANITY_LIST,
} from "@/lib/constants/filters";
import {
  DIFFUSER_TYPE_SANITY_LIST,
  GENDER_SANITY_LIST,
  GIFT_FOR_SANITY_LIST,
  PRODUCT_TYPE_SANITY_LIST,
} from "@/lib/constants/productOptions";

type ProductLike = {
  productType?: string;
};

const isPerfumes = (doc: ProductLike | undefined) =>
  doc?.productType === "perfumes";

const isGiftsets = (doc: ProductLike | undefined) =>
  doc?.productType === "giftsets";

const isHomeSpray = (doc: ProductLike | undefined) =>
  doc?.productType === "homeSpray";

const isCarPerfume = (doc: ProductLike | undefined) =>
  doc?.productType === "carPerfume";

const usesOlfactoryMultiselect = (doc: ProductLike | undefined) =>
  isPerfumes(doc) || isHomeSpray(doc) || isCarPerfume(doc);

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
      description: "Descriere produs",
    }),
    defineField({
      name: "tiktokReviewUrl",
      title: "Link review TikTok",
      type: "url",
      group: "details",
      description:
        "Opțional. URL-ul clipului/review-ului de pe TikTok; apare pe pagina produsului ca „Vezi review pe TikTok”.",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
    }),
    defineField({
      name: "productType",
      title: "Categorie principală",
      type: "string",
      group: "type",
      options: {
        list: [...PRODUCT_TYPE_SANITY_LIST],
        layout: "radio",
      },
      initialValue: "perfumes",
      validation: (rule) => [rule.required().error("Selectează categoria")],
    }),

    // --- Parfumuri ---
    defineField({
      name: "gender",
      title: "Gen",
      type: "string",
      group: "type",
      options: {
        list: [...GENDER_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isPerfumes(doc) && !value) {
            return "Genul este obligatoriu pentru parfumuri";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "volume",
      title: "Volum",
      type: "string",
      group: "type",
      description: 'Ex.: "50ml", "100ml"',
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isPerfumes(doc) && !String(value ?? "").trim()) {
            return "Volumul este obligatoriu";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "concentration",
      title: "Concentrație",
      type: "string",
      group: "type",
      options: {
        list: CONCENTRATIONS_SANITY_LIST,
        layout: "radio",
      },
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isPerfumes(doc) && !value) {
            return "Concentrația este obligatorie";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "olfactiveFamily",
      title: "Familie olfactivă",
      type: "array",
      group: "type",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [...OLFACTORY_FAMILIES_SANITY_LIST],
            layout: "dropdown",
          },
        }),
      ],
      options: {
        layout: "tags",
      },
      hidden: ({ document }) => !usesOlfactoryMultiselect(document as ProductLike),
    }),
    defineField({
      name: "topNotes",
      title: "Note de vârf",
      type: "string",
      group: "type",
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
    }),
    defineField({
      name: "middleNotes",
      title: "Note de mijloc",
      type: "string",
      group: "type",
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
    }),
    defineField({
      name: "baseNotes",
      title: "Note de bază",
      type: "string",
      group: "type",
      hidden: ({ document }) => !isPerfumes(document as ProductLike),
    }),

    // --- Giftsets ---
    defineField({
      name: "giftFor",
      title: "Pentru",
      type: "string",
      group: "type",
      options: {
        list: [...GIFT_FOR_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isGiftsets(document as ProductLike),
    }),
    defineField({
      name: "setContains",
      title: "Conținut set",
      type: "array",
      group: "type",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ document }) => !isGiftsets(document as ProductLike),
    }),
    defineField({
      name: "recommendedOccasion",
      title: "Ocazie recomandată",
      type: "string",
      group: "type",
      hidden: ({ document }) => !isGiftsets(document as ProductLike),
    }),
    defineField({
      name: "packagingInfo",
      title: "Informații ambalaj",
      type: "text",
      group: "type",
      rows: 3,
      hidden: ({ document }) => !isGiftsets(document as ProductLike),
    }),

    // --- Home Spray ---
    defineField({
      name: "diffuserType",
      title: "Tip difuzor",
      type: "string",
      group: "type",
      options: {
        list: [...DIFFUSER_TYPE_SANITY_LIST],
        layout: "radio",
      },
      hidden: ({ document }) => !isHomeSpray(document as ProductLike),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          if (isHomeSpray(doc) && !value) {
            return "Selectează tipul de difuzor";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "scent",
      title: "Miros",
      type: "string",
      group: "type",
      description: "Descriere miros (home spray / car parfum)",
      hidden: ({ document }) =>
        !(isHomeSpray(document as ProductLike) ||
          isCarPerfume(document as ProductLike)),
      validation: (rule) => [
        rule.custom((value, context) => {
          const doc = context.document as ProductLike | undefined;
          const needs =
            isHomeSpray(doc) || isCarPerfume(doc)
              ? !String(value ?? "").trim()
              : false;
          if (needs) return "Mirosul este obligatoriu";
          return true;
        }),
      ],
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
      name: "onSale",
      title: "On sale",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "popular",
      title: "Popular",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "newArrival",
      title: "New arrival",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
    }),
    defineField({
      name: "gift",
      title: "Gift",
      type: "boolean",
      group: "merchandising",
      initialValue: false,
      description: "Evidențiere cadou (orice categorie)",
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
        PRODUCT_TYPE_SANITY_LIST.find((k) => k.value === categoryKind)?.title ??
        (categoryKind ? String(categoryKind) : "");
      const typeLabel =
        PRODUCT_TYPE_SANITY_LIST.find((k) => k.value === productType)?.title ??
        (productType ? String(productType) : "");
      const sizeLabel = [concentration, volume].filter(Boolean).join(" • ");

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
