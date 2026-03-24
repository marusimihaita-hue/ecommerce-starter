import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { PRODUCT_TYPE_SANITY_LIST } from "@/lib/constants/productOptions";

/**
 * Shop categories are fixed: one document per product line (perfume / home / gift).
 * `kind` matches `product.productType` and is used as the public URL segment (/catalog/[slug]).
 */
export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Category (product line)",
      type: "string",
      description:
        "Exactly three categories: Parfum, Casă, Cadou — same values as product type.",
      options: {
        list: [...PRODUCT_TYPE_SANITY_LIST],
        layout: "radio",
      },
      validation: (rule) => [
        rule
          .required()
          .error("Choose which product line this category represents"),
      ],
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Thumbnail for category tiles and navigation",
    }),
  ],
  preview: {
    select: {
      kind: "kind",
      media: "image",
    },
    prepare({ kind, media }) {
      const label =
        PRODUCT_TYPE_SANITY_LIST.find((k) => k.value === kind)?.title ??
        (kind as string) ??
        "Category";
      return {
        title: label,
        subtitle: kind ? String(kind) : undefined,
        media,
      };
    },
  },
});
