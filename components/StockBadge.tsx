"use client";

import { Badge } from "@/components/ui/badge";
import { useCartItem } from "../lib/store/cart-store-provider";
import { cn } from "@/lib/utils";
import { isLowStock as checkLowStock } from "@/lib/constants/stock";

interface StockBadgeProps {
  productId: string;
  stock: number;
  className?: string;
}

export function StockBadge({ productId, stock, className }: StockBadgeProps) {
  const cartItem = useCartItem(productId);

  const quantityInCart = cartItem?.quantity ?? 0;
  const isAtMax = quantityInCart >= stock && stock > 0;
  const lowStock = checkLowStock(stock);

  if (isAtMax) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "w-fit border border-border bg-muted text-muted-foreground",
          className,
        )}
      >
        Limită atinsă
      </Badge>
    );
  }

  if (lowStock) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "w-fit bg-brand-mint/15 text-[#0f5c44] dark:bg-brand-mint/20 dark:text-[#8ee4c5]",
          className,
        )}
      >
        Stoc limitat: {stock}
      </Badge>
    );
  }

  return null;
}
