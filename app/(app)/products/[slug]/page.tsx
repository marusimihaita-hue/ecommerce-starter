import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { ProductShippingProgress } from "@/components/ProductShippingProgress";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* CONTENT */}
      <main className="grow min-h-[70vh]">
        <div className="mx-auto max-w-screen-2xl px-4 pt-6 sm:px-6 lg:px-8">
          <ProductShippingProgress className="mb-6" />
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image Gallery */}
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}
