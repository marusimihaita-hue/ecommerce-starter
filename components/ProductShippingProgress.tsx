"use client";

import { Gift, Truck } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD_RON } from "@/lib/constants/shipping";
import { cn, formatPrice } from "@/lib/utils";
import { useTotalPrice } from "@/lib/store/cart-store-provider";

type ProductShippingProgressProps = {
  className?: string;
};

export function ProductShippingProgress({
  className,
}: ProductShippingProgressProps) {
  const cartSubtotal = useTotalPrice();

  const threshold = FREE_SHIPPING_THRESHOLD_RON;
  const subtotalBani = Math.round(cartSubtotal * 100);
  const thresholdBani = Math.round(threshold * 100);
  const reached = subtotalBani >= thresholdBani;
  const pctRaw = threshold > 0 ? (cartSubtotal / threshold) * 100 : 100;
  const pct = Math.min(100, Math.max(0, pctRaw));

  const remaining = Math.max(0, threshold - cartSubtotal);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card px-4 py-4 text-card-foreground shadow-sm sm:px-5",
        className,
      )}
      role="region"
      aria-label="Progres către transport gratuit"
    >
      <div className="flex items-center gap-3">
        <div className="relative min-h-9 min-w-0 flex-1 pr-5 pt-2 pb-1">
          {/* Track */}
          <div className="h-2 w-full rounded-full bg-muted" aria-hidden />
          {/* Fill */}
          <div
            className="pointer-events-none absolute left-0 top-2 h-2 overflow-hidden rounded-full"
            style={{ width: `${pct}%` }}
            aria-hidden
          >
            <div className="h-full w-full bg-primary" />
          </div>
          {/* Progress icon (truck) */}
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500 ease-out"
            style={{
              left: `clamp(1rem, ${pct}%, calc(100% - 1rem))`,
            }}
            aria-hidden
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-card text-primary shadow-sm">
              <Truck className="h-4 w-4" strokeWidth={2} />
            </div>
          </div>
          {/* Goal icon (gift) */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card shadow-sm",
                reached
                  ? "border-brand-mint text-brand-mint"
                  : "border-border text-muted-foreground",
              )}
            >
              <Gift className="h-4 w-4" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        {reached ? (
          <>
            Ai atins pragul de{" "}
            <span className="font-semibold text-foreground">
              {formatPrice(threshold)}
            </span>
            —{" "}
            <span className="font-semibold text-brand-mint">
              transport gratuit
            </span>{" "}
            la această comandă.
          </>
        ) : (
          <>
            Mai ai nevoie de{" "}
            <span className="font-semibold text-primary">
              {formatPrice(remaining)}
            </span>{" "}
            pentru{" "}
            <span className="font-semibold text-brand-mint">
              transport gratuit
            </span>.
          </>
        )}
      </p>
    </div>
  );
}
