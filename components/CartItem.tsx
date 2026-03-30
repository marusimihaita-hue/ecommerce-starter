"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StockBadge } from "@/components/StockBadge";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/store/cart-store";
import { StockInfo } from "@/lib/hooks/useCartStock";

interface CartItemProps {
  item: CartItemType;
  stockInfo?: StockInfo;
}

export function CartItem({ item, stockInfo }: CartItemProps) {
  const { removeItem } = useCartActions();

  const isOutOfStock = stockInfo?.isOutOfStock ?? false;
  const exceedsStock = stockInfo?.exceedsStock ?? false;
  const currentStock = stockInfo?.currentStock ?? 999;
  const hasIssue = isOutOfStock || exceedsStock;

  return (
    <div
      className={cn(
        "flex gap-4 py-4",
        hasIssue && "rounded-lg bg-red-50 p-3 dark:bg-red-950/30",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted",
          isOutOfStock && "opacity-50",
        )}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            Fără imagine
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link
            href={`/products/${item.productId}`}
            className={cn(
              "font-medium text-foreground transition-colors hover:text-primary",
              isOutOfStock && "text-muted-foreground",
            )}
          >
            {item.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Șterge {item.name}</span>
          </Button>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            {formatPrice(item.price)}
          </p>
          {!isOutOfStock && (
            <AddToCartButton
              variant="cartLine"
              productId={item.productId}
              name={item.name}
              price={item.price}
              image={item.image}
              stock={currentStock}
            />
          )}
        </div>

        <div className="mt-2">
          <StockBadge productId={item.productId} stock={currentStock} />
        </div>
      </div>
    </div>
  );
}
