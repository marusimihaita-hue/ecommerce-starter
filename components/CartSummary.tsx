"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  useTotalPrice,
  useTotalItems,
  useCartActions,
} from "@/lib/store/cart-store-provider";
import { getShippingChargeRon } from "@/lib/constants/shipping";

interface CartSummaryProps {
  hasStockIssues?: boolean;
}

export function CartSummary({ hasStockIssues = false }: CartSummaryProps) {
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();
  const shippingCharge = getShippingChargeRon(totalPrice);

  if (totalItems === 0) return null;

  return (
    <div className="border-t border-border p-4">
      <div className="flex justify-between text-base font-medium text-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className="mt-2 flex justify-between text-sm text-muted-foreground">
        <span>Livrare (estimat)</span>
        <span className="font-medium text-foreground">
          {shippingCharge === 0 ? (
            <span className="font-semibold text-brand-mint">Gratuit</span>
          ) : (
            formatPrice(shippingCharge)
          )}
        </span>
      </div>
      <div className="mt-4">
        {hasStockIssues ? (
          <Button disabled className="w-full">
            Rezolvă problemele de stoc pentru a finaliza comanda
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href="/checkout" onClick={() => closeCart()}>
              Finalizează comanda
            </Link>
          </Button>
        )}
      </div>
      <div className="mt-3 text-center">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Continuă cumpărăturile →
        </Link>
      </div>
    </div>
  );
}
