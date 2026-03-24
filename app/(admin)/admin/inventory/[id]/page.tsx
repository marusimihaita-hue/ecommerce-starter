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
import { CONCENTRATIONS, SCENT_FAMILIES } from "@/lib/constants/filters";
import {
  CLEANING_DESTINATIONS,
  DIFFUSER_TYPES,
  GENDERS,
  HOME_SUBTYPES,
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
      placeholder="Product name"
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
      placeholder="product-slug"
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
      placeholder="Brand name"
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
      value={(productType as string) ?? "perfume"}
      onValueChange={(value) => editProductType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Product type" />
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
        <SelectValue placeholder="Gender" />
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

function HomeSubtypeEditor(handle: DocumentHandle) {
  const { data: homeSubtype } = useDocument({
    ...handle,
    path: "homeSubtype",
  });
  const editHomeSubtype = useEditDocument({
    ...handle,
    path: "homeSubtype",
  });

  return (
    <Select
      value={(homeSubtype as string) ?? ""}
      onValueChange={(value) => editHomeSubtype(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Home subtype" />
      </SelectTrigger>
      <SelectContent>
        {HOME_SUBTYPES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DestinationEditor(handle: DocumentHandle) {
  const { data: destination } = useDocument({
    ...handle,
    path: "destination",
  });
  const editDestination = useEditDocument({
    ...handle,
    path: "destination",
  });

  return (
    <Select
      value={(destination as string) ?? ""}
      onValueChange={(value) => editDestination(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Destination" />
      </SelectTrigger>
      <SelectContent>
        {CLEANING_DESTINATIONS.map((item) => (
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
        <SelectValue placeholder="Diffuser type" />
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

function HomeScentEditor(handle: DocumentHandle) {
  const { data: scent } = useDocument({ ...handle, path: "scent" });
  const editScent = useEditDocument({ ...handle, path: "scent" });

  return (
    <Input
      value={(scent as string) ?? ""}
      onChange={(e) => editScent(e.target.value)}
      placeholder="Scent description"
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
      placeholder="Packaging details..."
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
      placeholder="e.g. Valentine's, Christmas"
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
      placeholder="Product description..."
      rows={4}
    />
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
      type="number"
      min="0"
      value={(volume as number) ?? ""}
      onChange={(e) => editVolume(parseInt(e.target.value, 10) || 0)}
      placeholder="e.g., 50"
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
        <SelectValue placeholder="Select concentration" />
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
  const { data: olfactiveFamily } = useDocument({
    ...handle,
    path: "olfactiveFamily",
  });
  const editOlfactiveFamily = useEditDocument({
    ...handle,
    path: "olfactiveFamily",
  });

  return (
    <Select
      value={(olfactiveFamily as string) ?? ""}
      onValueChange={(value) => editOlfactiveFamily(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Olfactive family" />
      </SelectTrigger>
      <SelectContent>
        {SCENT_FAMILIES.map((item) => (
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
      placeholder="e.g., Bergamot, Lemon, Pink Pepper"
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
      placeholder="e.g., Rose, Jasmine, Lavender"
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
      placeholder="e.g., Vanilla, Musk, Sandalwood"
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
      View on store
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

function TypeSpecificAttributes({ handle }: { handle: DocumentHandle }) {
  const { data: productType } = useDocument({
    ...handle,
    path: "productType",
  });
  const { data: homeSubtype } = useDocument({
    ...handle,
    path: "homeSubtype",
  });
  const pt = (productType as string) ?? "perfume";
  const hs = homeSubtype as string | undefined;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Product type</Label>
        <Suspense fallback={<Skeleton className="h-10" />}>
          <ProductTypeEditor {...handle} />
        </Suspense>
      </div>

      {pt === "perfume" && (
        <>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <GenderEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label>Volume (ml)</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <VolumeEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label>Concentration</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <ConcentrationEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label>Olfactive family</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <OlfactiveFamilyEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Top notes</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <TopNotesEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Middle notes</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <MiddleNotesEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Base notes</Label>
            <Suspense fallback={<Skeleton className="h-16" />}>
              <BaseNotesEditor {...handle} />
            </Suspense>
          </div>
        </>
      )}

      {pt === "home" && (
        <>
          <div className="space-y-2 sm:col-span-2">
            <Label>Home subtype</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <HomeSubtypeEditor {...handle} />
            </Suspense>
          </div>
          {hs === "cleaningProducts" && (
            <>
              <div className="space-y-2 sm:col-span-2">
                <Label>Destination</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <DestinationEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label>Volume (ml)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <VolumeEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Packaging info</Label>
                <Suspense fallback={<Skeleton className="h-20" />}>
                  <PackagingInfoEditor {...handle} />
                </Suspense>
              </div>
            </>
          )}
          {hs === "homeFragrance" && (
            <>
              <div className="space-y-2">
                <Label>Diffuser type</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <DiffuserTypeEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label>Volume (ml)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <VolumeEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Scent</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <HomeScentEditor {...handle} />
                </Suspense>
              </div>
            </>
          )}
        </>
      )}

      {pt === "gift" && (
        <>
          <div className="space-y-2 sm:col-span-2">
            <Label>Recommended occasion</Label>
            <Suspense fallback={<Skeleton className="h-10" />}>
              <RecommendedOccasionEditor {...handle} />
            </Suspense>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Packaging info</Label>
            <Suspense fallback={<Skeleton className="h-20" />}>
              <PackagingInfoEditor {...handle} />
            </Suspense>
          </div>
          <p className="text-sm text-zinc-500 sm:col-span-2 dark:text-zinc-400">
            Edit set contents (setContains) in Sanity Studio.
          </p>
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
            {(name as string) || "New Product"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Edit product details
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
              Basic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <NameEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <SlugEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <BrandEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Suspense fallback={<Skeleton className="h-24" />}>
                  <DescriptionEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Pricing & Inventory
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (£)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <PriceEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <StockEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Type-specific attributes */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Product type &amp; attributes
            </h2>
            <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
              <TypeSpecificAttributes handle={handle} />
            </Suspense>
          </div>

          {/* Merchandising flags */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Merchandising
            </h2>
            <div className="space-y-6">
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="featuredOnHome"
                  title="Featured on home"
                  description="Show in homepage carousel"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="onSale"
                  title="On sale"
                  description="Mark as discounted / on sale"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="popular"
                  title="Popular"
                  description="Highlight as popular"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="newArrival"
                  title="New arrival"
                  description="Highlight as new"
                />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-14" />}>
                <MerchBooleanRow
                  handle={handle}
                  path="gift"
                  title="Gift highlight"
                  description="Promote as a gift idea"
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
              Product Images
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
              Advanced Editing
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Set category and other options in Sanity Studio.
            </p>
            <Link
              href={`/studio/structure/product;${handle.documentId}`}
              target="_blank"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              Open in Studio
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
        Back to Inventory
      </Link>

      {/* Product Detail */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent handle={handle} />
      </Suspense>
    </div>
  );
}
