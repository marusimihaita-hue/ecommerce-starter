import type { ReactNode } from "react";
import {
  CONCENTRATION_LABEL_BY_VALUE,
  OLFACTORY_LABEL_BY_VALUE,
} from "@/lib/constants/filters";
import {
  DIFFUSER_TYPES,
  GENDERS,
  GIFT_FOR_OPTIONS,
} from "@/lib/constants/productOptions";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

export type ProductSpecRow = {
  key: string;
  label: string;
  value: ReactNode;
};

const formatLabel = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function formatOlfactiveFamily(
  value: string | string[] | null | undefined,
): string {
  if (value == null) return "";
  if (Array.isArray(value)) {
    return value
      .map(
        (x) =>
          OLFACTORY_LABEL_BY_VALUE[
            x as keyof typeof OLFACTORY_LABEL_BY_VALUE
          ] ?? x,
      )
      .filter(Boolean)
      .join(", ");
  }
  return (
    OLFACTORY_LABEL_BY_VALUE[value as keyof typeof OLFACTORY_LABEL_BY_VALUE] ??
    formatLabel(value)
  );
}

export function getProductSpecRows(
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>,
  options?: { excludeKeys?: Set<string> },
): ProductSpecRow[] {
  const exclude = options?.excludeKeys ?? new Set<string>();
  const pt = product.productType;
  const genderLabel = GENDERS.find((g) => g.value === product.gender)?.label;
  const giftForLabel = GIFT_FOR_OPTIONS.find(
    (g) => g.value === product.giftFor,
  )?.label;
  const diffuserLabel = DIFFUSER_TYPES.find(
    (d) => d.value === product.diffuserType,
  )?.label;
  const concentrationLabel = product.concentration
    ? (CONCENTRATION_LABEL_BY_VALUE[
        product.concentration as keyof typeof CONCENTRATION_LABEL_BY_VALUE
      ] ?? formatLabel(product.concentration))
    : "";

  const volumeDisplay =
    product.volume != null &&
    product.volume !== "" &&
    !(typeof product.volume === "number" && product.volume <= 0)
      ? typeof product.volume === "number"
        ? `${product.volume} ml`
        : String(product.volume)
      : "";

  const olfactiveText = formatOlfactiveFamily(product.olfactiveFamily);

  const rows: ProductSpecRow[] = [];

  const push = (row: ProductSpecRow) => {
    if (!exclude.has(row.key)) rows.push(row);
  };

  if (pt === "perfumes" && genderLabel) {
    push({ key: "gender", label: "Gen", value: genderLabel });
  }
  if (pt === "perfumes" && volumeDisplay) {
    push({ key: "volume", label: "Volum", value: volumeDisplay });
  }
  if (pt === "perfumes" && concentrationLabel) {
    push({
      key: "concentration",
      label: "Concentrație",
      value: concentrationLabel,
    });
  }
  if (
    olfactiveText &&
    (pt === "perfumes" || pt === "homeSpray" || pt === "carPerfume")
  ) {
    push({
      key: "olfactive",
      label: "Familie olfactivă",
      value: olfactiveText,
    });
  }
  if (pt === "homeSpray" && product.diffuserType && diffuserLabel) {
    push({
      key: "diffuser",
      label: "Tip difuzor",
      value: diffuserLabel,
    });
  }
  if ((pt === "homeSpray" || pt === "carPerfume") && product.scent) {
    push({ key: "scent", label: "Miros", value: product.scent });
  }
  if (pt === "giftsets" && product.packagingInfo) {
    push({
      key: "packaging",
      label: "Ambalaj / informații",
      value: product.packagingInfo,
    });
  }
  if (pt === "giftsets" && giftForLabel) {
    push({ key: "giftFor", label: "Pentru", value: giftForLabel });
  }
  if (
    pt === "giftsets" &&
    product.setContains &&
    product.setContains.length > 0
  ) {
    push({
      key: "setContains",
      label: "Conținut set",
      value: (
        <ul className="list-disc space-y-1.5 pl-4 marker:text-primary/70">
          {product.setContains.map((item, index) => (
            <li key={`${index}-${item}`} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (pt === "giftsets" && product.recommendedOccasion) {
    push({
      key: "occasion",
      label: "Ocazie",
      value: product.recommendedOccasion,
    });
  }
  if (pt === "perfumes" && product.topNotes) {
    push({
      key: "topNotes",
      label: "Note de vârf",
      value: product.topNotes,
    });
  }
  if (pt === "perfumes" && product.middleNotes) {
    push({
      key: "middleNotes",
      label: "Note de mijloc",
      value: product.middleNotes,
    });
  }
  if (pt === "perfumes" && product.baseNotes) {
    push({
      key: "baseNotes",
      label: "Note de bază",
      value: product.baseNotes,
    });
  }

  return rows;
}
