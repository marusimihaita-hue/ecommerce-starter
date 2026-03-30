"use client";

import {
  type DocumentHandle,
  useDocument,
  useDocumentProjection,
  useEditDocument,
} from "@sanity/sdk-react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import {
  DeleteButton,
  ImageUploader,
  PublishButton,
  RevertButton,
} from "@/components/admin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CONCENTRATIONS, OLFACTORY_FAMILIES } from "@/lib/constants/filters";
import {
  DIFFUSER_TYPES,
  GENDERS,
  GIFT_FOR_OPTIONS,
  PRODUCT_TYPES,
} from "@/lib/constants/productOptions";

// Field editor components
function NameEditor(handle: DocumentHandle) {
  const { data: name } = useDocument({ ...handle, path: "name" });
  const editName = useEditDocument({ ...handle, path: "name" });

  return (
    <Input
      value={(name as string) ?? ""}
      onChange={(e) => editName(e.target.value)}
      placeholder="Nume produs"
    />
  );
}

function SlugEditor(handle: DocumentHandle) {
  const { data: slug } = useDocument({ ...handle, path: "slug" });
  const editSlug = useEditDocument({ ...handle, path: "slug" });
  const slugValue = (slug as { current?: string })?.current ?? "";

  return (
    <Input
      value={slugValue}
      onChange={(e) => editSlug({ _type: "slug", current: e.target.value })}
      placeholder="slug-produs"
    />
  );
}

function BrandEditor(handle: DocumentHandle) {
  const { data: brand } = useDocument({ ...handle, path: "brand" });
  const editBrand = useEditDocument({ ...handle, path: "brand" });

  return (
    <Input
      value={(brand as string) ?? ""}
      onChange={(e) => editBrand(e.target.value)}
      placeholder="Marcă / brand"
    />
  );
}

function ProductTypeEditor(handle: DocumentHandle) {
  const { data: productType } = useDocument({
    ...handle,
    path: "productType",
  });
  const editProductType = useEditDocument({
    ...handle,
    path: "productType",
  });

  return (
    <Select
      value={(productType as string) ?? "perfumes"}
      onValueChange={(value) => editProductType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Tip produs" />
      </SelectTrigger>
      <SelectContent>
        {PRODUCT_TYPES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function GenderEditor(handle: DocumentHandle) {
  const { data: gender } = useDocument({ ...handle, path: "gender" });
  const editGender = useEditDocument({ ...handle, path: "gender" });

  return (
    <Select
      value={(gender as string) ?? ""}
      onValueChange={(value) => editGender(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Gen" />
      </SelectTrigger>
      <SelectContent>
        {GENDERS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DiffuserTypeEditor(handle: DocumentHandle) {
  const { data: diffuserType } = useDocument({
    ...handle,
    path: "diffuserType",
  });
  const editDiffuserType = useEditDocument({
    ...handle,
    path: "diffuserType",
  });

  return (
    <Select
      value={(diffuserType as string) ?? ""}
      onValueChange={(value) => editDiffuserType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Tip difuzor" />
      </SelectTrigger>
      <SelectContent>
        {DIFFUSER_TYPES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ScentEditor(handle: DocumentHandle) {
  const { data: scent } = useDocument({ ...handle, path: "scent" });
  const editScent = useEditDocument({ ...handle, path: "scent" });

  return (
    <Input
      value={(scent as string) ?? ""}
      onChange={(e) => editScent(e.target.value)}
      placeholder="Descriere miros"
    />
  );
}

function PackagingInfoEditor(handle: DocumentHandle) {
  const { data: packagingInfo } = useDocument({
    ...handle,
    path: "packagingInfo",
  });
  const editPackagingInfo = useEditDocument({
    ...handle,
    path: "packagingInfo",
  });

  return (
    <Textarea
      value={(packagingInfo as string) ?? ""}
      onChange={(e) => editPackagingInfo(e.target.value)}
      placeholder="Detalii ambalaj…"
      rows={3}
    />
  );
}

function RecommendedOccasionEditor(handle: DocumentHandle) {
  const { data: recommendedOccasion } = useDocument({
    ...handle,
    path: "recommendedOccasion",
  });
  const editRecommendedOccasion = useEditDocument({
    ...handle,
    path: "recommendedOccasion",
  });

  return (
    <Input
      value={(recommendedOccasion as string) ?? ""}
      onChange={(e) => editRecommendedOccasion(e.target.value)}
      placeholder="ex. Valentine’s, Crăciun"
    />
  );
}

function DescriptionEditor(handle: DocumentHandle) {
  const { data: description } = useDocument({ ...handle, path: "description" });
  const editDescription = useEditDocument({ ...handle, path: "description" });

  return (
    <Textarea
      value={(description as string) ?? ""}
      onChange={(e) => editDescription(e.target.value)}
      placeholder="Descriere produs…"
      rows={4}
    />
  );
}

/** Opțional; același câmp ca în Sanity (`tiktokReviewUrl`). */
function TiktokReviewUrlEditor(handle: DocumentHandle) {
  const { data } = useDocument({ ...handle, path: "tiktokReviewUrl" });
  const edit = useEditDocument({ ...handle, path: "tiktokReviewUrl" });
  const value =
    data === undefined || data === null ? "" : String(data as string);
  const href = value.trim();

  return (
    <div className="space-y-2">
      <Input
        id="tiktok-review-url"
        type="url"
        inputMode="url"
        autoComplete="url"
        placeholder="https://www.tiktok.com/@.../video/..."
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          edit(v === "" ? undefined : v);
        }}
      />
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Deschide în TikTok
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function PriceEditor(handle: DocumentHandle) {
  const { data: price } = useDocument({ ...handle, path: "price" });
  const editPrice = useEditDocument({ ...handle, path: "price" });

  return (
    <Input
      type="number"
      step="0.01"
      min="0"
      value={(price as number) ?? ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        editPrice(parseFloat(e.target.value) || 0)
      }
      placeholder="0.00"
    />
  );
}

function StockEditor(handle: DocumentHandle) {
  const { data: stock } = useDocument({ ...handle, path: "stock" });
  const editStock = useEditDocument({ ...handle, path: "stock" });

  return (
    <Input
      type="number"
      min="0"
      value={(stock as number) ?? 0}
      onChange={(e) => editStock(parseInt(e.target.value, 10) || 0)}
      placeholder="0"
    />
  );
}

function VolumeEditor(handle: DocumentHandle) {
  const { data: volume } = useDocument({ ...handle, path: "volume" });
  const editVolume = useEditDocument({ ...handle, path: "volume" });

  return (
    <Input
      value={
        volume === undefined || volume === null ? "" : String(volume as string)
      }
      onChange={(e) => editVolume(e.target.value.trim() || undefined)}
      placeholder='ex. 50ml, 100ml'
    />
  );
}

function ConcentrationEditor(handle: DocumentHandle) {
  const { data: concentration } = useDocument({
    ...handle,
    path: "concentration",
  });
  const editConcentration = useEditDocument({
    ...handle,
    path: "concentration",
  });

  return (
    <Select
      value={(concentration as string) ?? ""}
      onValueChange={(value) => editConcentration(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selectează concentrația" />
      </SelectTrigger>
      <SelectContent>
        {CONCENTRATIONS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function OlfactiveFamilyEditor(handle: DocumentHandle) {
  const { data: raw } = useDocument({
    ...handle,
    path: "olfactiveFamily",
  });
  const editOlfactiveFamily = useEditDocument({
    ...handle,
    path: "olfactiveFamily",
  });

  const selected: string[] = Array.isArray(raw)
    ? (raw as string[])
    : raw != null && raw !== ""
      ? [String(raw)]
      : [];

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((x) => x !== value)
      : [...selected, value];
    editOlfactiveFamily(next.length ? next : undefined);
  };

  return (
    <div className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
      {OLFACTORY_FAMILIES.map((item) => (
        <label
          key={item.value}
          className="flex cursor-pointer items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300"
            checked={selected.includes(item.value)}
            onChange={() => toggle(item.value)}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}

function GiftForEditor(handle: DocumentHandle) {
  const { data: giftFor } = useDocument({ ...handle, path: "giftFor" });
  const editGiftFor = useEditDocument({ ...handle, path: "giftFor" });

  return (
    <Select
      value={(giftFor as string) ?? ""}
      onValueChange={(value) => editGiftFor(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pentru (el / ea / unisex)" />
      </SelectTrigger>
      <SelectContent>
        {GIFT_FOR_OPTIONS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TopNotesEditor(handle: DocumentHandle) {
  const { data: topNotes } = useDocument({ ...handle, path: "topNotes" });
  const editTopNotes = useEditDocument({ ...handle, path: "topNotes" });

  return (
    <Textarea
      value={(topNotes as string) ?? ""}
      onChange={(e) => editTopNotes(e.target.value)}
      placeholder="ex. bergamotă, lămâie, piper roz"
      rows={2}
    />
  );
}

function MiddleNotesEditor(handle: DocumentHandle) {
  const { data: middleNotes } = useDocument({
    ...handle,
    path: "middleNotes",
  });
  const editMiddleNotes = useEditDocument({ ...handle, path: "middleNotes" });

  return (
    <Textarea
      value={(middleNotes as string) ?? ""}
      onChange={(e) => editMiddleNotes(e.target.value)}
      placeholder="ex. trandafir, iasomie, lavandă"
      rows={2}
    />
  );
}

function BaseNotesEditor(handle: DocumentHandle) {
  const { data: baseNotes } = useDocument({ ...handle, path: "baseNotes" });
  const editBaseNotes = useEditDocument({ ...handle, path: "baseNotes" });

  return (
    <Textarea
      value={(baseNotes as string) ?? ""}
      onChange={(e) => editBaseNotes(e.target.value)}
      placeholder="ex. vanilie, mosc, santal"
      rows={2}
    />
  );
}

function MerchBooleanRow({
  handle,
  path,
  title,
  description,
}: {
  handle: DocumentHandle;
  path: string;
  title: string;
  description: string;
}) {
  const { data: value } = useDocument({ ...handle, path });
  const editValue = useEditDocument({ ...handle, path });

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <Switch
        checked={(value as boolean) ?? false}
        onCheckedChange={(checked: boolean) => editValue(checked)}
      />
    </div>
  );
}

interface ProductSlugProjection {
  slug: {
    current: string;
  } | null;
}

function ProductStoreLink(handle: DocumentHandle) {
  const { data } = useDocumentProjection<ProductSlugProjection>({
    ...handle,
    projection: `{ slug }`,
  });

  const slug = data?.slug?.current;

  if (!slug) return null;

  return (
    <Link
      href={`/products/${slug}`}
      target="_blank"
      className="flex items-center justify-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      Vezi în magazin
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

function TypeSpecificAttributes({ handle }: { handle: DocumentHandle }) {
  const { data: productType } = useDocument({
    ...handle,
    path: "productType",
  });
  const pt = (productType as string) ?? "perfumes";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Categorie principală</Label>
        <Suspense fallback={<Skeleton className="h-10" />}>
          <ProductTypeEditor {...handle} />
        </Suspense>
      </div>

      {pt === "perfumes" && (
        <>
          <div className="space-y-2">
            <Label>Gen</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <GenderEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label>Volum</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <VolumeEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label>Concentrație</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <ConcentrationEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Familii olfactive (multiple)</Label>
            <Suspense fallback={<Skeleton className="h-32" />}>
              <OlfactiveFamilyEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Note de vârf</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <TopNotesEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Note de mijloc</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <MiddleNotesEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Note de bază</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <BaseNotesEditor {...handle} />
            </Suspense>
          </div>
        </>
      )}

      {pt === "giftsets" && (
        <>
          <div className="space-y-2 sm:col-span-2">
            <Label>Pentru</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <GiftForEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Ocazie recomandată</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <RecommendedOccasionEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Informații ambalaj</Label>
            <Suspense fallback={<Skeleton className="h-20" />}>
              <PackagingInfoEditor {...handle} />
            </Suspense>
          </div>
          <p className="text-sm text-zinc-500 sm:col-span-2 dark:text-zinc-400">
            Conținutul setului (setContains) îl poți edita în Sanity Studio.
          </p>
        </>
      )}

      {pt === "homeSpray" && (
        <>
          <div className="space-y-2">
            <Label>Tip difuzor</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <DiffuserTypeEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Familii olfactive (multiple)</Label>
            <Suspense fallback={<Skeleton className="h-32" />}>
              <OlfactiveFamilyEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Miros</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <ScentEditor {...handle} />
            </Suspense>
          </div>
        </>
      )}

      {pt === "carPerfume" && (
        <>
          <div className="space-y-2 sm:col-span-2">
            <Label>Familii olfactive (multiple)</Label>
            <Suspense fallback={<Skeleton className="h-32" />}>
              <OlfactiveFamilyEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Miros</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <ScentEditor {...handle} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

function ProductDetailContent({ handle }: { handle: DocumentHandle }) {
  const { data: name } = useDocument({ ...handle, path: "name" });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            {(name as string) || "Produs nou"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Editează detaliile produsului
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DeleteButton handle={handle} />
          <Suspense fallback={null}>
            <RevertButton {...handle} />
          </Suspense>
          <Suspense fallback={null}>
            <PublishButton {...handle} />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Informații de bază
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nume</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <NameEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <SlugEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marcă</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <BrandEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descriere</Label>
                <Suspense fallback={<Skeleton className="h-24" />}>
                  <DescriptionEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok-review-url">
                  Link TikTok{" "}
                  <span className="font-normal text-zinc-500 dark:text-zinc-400">
                    (opțional)
                  </span>
                </Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <TiktokReviewUrlEditor {...handle} />
                </Suspense>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Clip sau review pe TikTok; apare pe pagina produsului dacă e
                  completat.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Preț și stoc
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Preț (RON)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <PriceEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stoc</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <StockEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Type-specific attributes */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Tip produs și atribute
            </h2>
            <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
              <TypeSpecificAttributes handle={handle} />
            </Suspense>
          </div>

          {/* Merchandising flags */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Merchandising / promovare
            </h2>
            <div className="space-y-6">
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="onSale"
                  title="La reducere"
                  description="Marchează ca produs cu discount / ofertă"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="popular"
                  title="Popular"
                  description="Evidențiază ca produs popular"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="newArrival"
                  title="Noutate"
                  description="Evidențiază ca produs nou"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="gift"
                  title="Recomandat cadou"
                  description="Promovează ca idee de cadou"
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Imagini produs
            </h2>
            <ImageUploader {...handle} />
            <div className="mt-4">
              <Suspense fallback={null}>
                <ProductStoreLink {...handle} />
              </Suspense>
            </div>
          </div>

          {/* Studio Link */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Editare avansată
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Categoria și alte opțiuni le setezi în Sanity Studio.
            </p>
            <Link
              href={`/studio/structure/product;${handle.documentId}`}
              target="_blank"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              Deschide în Studio
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Skeleton className="h-7 w-48 sm:h-8" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-[140px]" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const handle: DocumentHandle = {
    documentId: id,
    documentType: "product",
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/inventory"
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Înapoi la inventar
      </Link>

      {/* Product Detail */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent handle={handle} />
      </Suspense>
    </div>
  );
}
