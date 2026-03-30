import { PackageSearch } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "../ui/empty-state";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface ProductGridProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[min(100dvh,36rem)] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-16">
        <EmptyState
          icon={PackageSearch}
          title="Niciun produs găsit"
          description="Încearcă alte cuvinte la căutare sau relaxează filtrele pentru a vedea mai multe rezultate."
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="@container">
      {/* 1 col mobil, 2 col tablet, 3 col laptop+ (lângă sidebar-ul de filtre) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="min-w-0 w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
