import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const CONCENTRATION_OPTIONS = [
  { title: "Eau de Cologne", value: "eau-de-cologne" },
  { title: "Eau de Toilette", value: "eau-de-toilette" },
  { title: "Eau de Parfum", value: "eau-de-parfum" },
  { title: "Parfum", value: "parfum" },
  { title: "Elixir", value: "elixir" },
];

const SCENT_FAMILY_OPTIONS = [
  { title: "Floral", value: "floral" },
  { title: "Woody", value: "woody" },
  { title: "Oriental", value: "oriental" },
  { title: "Fresh", value: "fresh" },
  { title: "Citrus", value: "citrus" },
  { title: "Amber", value: "amber" },
  { title: "Aromatic", value: "aromatic" },
];

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
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
    }),

    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => [rule.required().error("Category is required")],
    }),

    defineField({
      name: "volumeMl",
      title: "Volume (ml)",
      type: "number",
      group: "details",
      description: "Bottle size in milliliters, e.g. 30, 50, 100",
      validation: (rule) => [
        rule.required().error("Volume is required"),
        rule.positive().error("Volume must be positive"),
        rule.integer().error("Volume must be a whole number"),
      ],
    }),
    defineField({
      name: "concentration",
      type: "string",
      group: "details",
      options: {
        list: CONCENTRATION_OPTIONS,
        layout: "radio",
      },
      validation: (rule) => [
        rule.required().error("Concentration is required"),
      ],
    }),
    defineField({
      name: "scentFamily",
      title: "Scent family",
      type: "string",
      group: "details",
      options: {
        list: SCENT_FAMILY_OPTIONS,
        layout: "radio",
      },
      validation: (rule) => [rule.required().error("Scent family is required")],
    }),
    defineField({
      name: "topNotes",
      title: "Top notes",
      type: "string",
      group: "details",
      description: "Example: Citrus, Oud, Bergamot",
      validation: (rule) => [rule.required().error("Top notes are required")],
    }),
    defineField({
      name: "middleNotes",
      title: "Middle notes",
      type: "string",
      group: "details",
      description: "Example: Rose, Jasmine, Saffron",
      validation: (rule) => [
        rule.required().error("Middle notes are required"),
      ],
    }),
    defineField({
      name: "baseNotes",
      title: "Base notes",
      type: "string",
      group: "details",
      description: "Example: Vanilla, Musk, Sandalwood",
      validation: (rule) => [rule.required().error("Base notes are required")],
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
      name: "featured",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Show on homepage and promotions",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "images.0",
      price: "price",
      concentration: "concentration",
      volumeMl: "volumeMl",
    },
    prepare({ title, subtitle, media, price, concentration, volumeMl }) {
      const sizeLabel =
        concentration && volumeMl
          ? `${concentration} • ${volumeMl}ml`
          : concentration || (volumeMl ? `${volumeMl}ml` : "");

      return {
        title,
        subtitle: [subtitle, sizeLabel, `${price ?? 0} RON`]
          .filter(Boolean)
          .join(" • "),
        media,
      };
    },
  },
});
