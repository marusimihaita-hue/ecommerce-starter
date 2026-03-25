"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartActions, useCartItem } from "../lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
  /** Pe pagina produsului: alegi cantitatea înainte de primul „Adaugă în coș”. */
  showQuantityBeforeAdd?: boolean;
  /**
   * În linia din coș (sheet): mereu − / cantitate / +.
   * Pe carduri rămâne butonul „Adaugă în coș” ca să nu sară layout-ul.
   */
  variant?: "product" | "cartLine";
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
  showQuantityBeforeAdd = false,
  variant = "product",
}: AddToCartButtonProps) {
  const { addItem, updateQuantity } = useCartActions();
  const cartItem = useCartItem(productId);
  const [pickQty, setPickQty] = useState(1);

  const quantityInCart = cartItem?.quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const isAtMax = quantityInCart >= stock;

  useEffect(() => {
    setPickQty((q) => Math.min(Math.max(1, q), Math.max(1, stock)));
  }, [stock]);

  const handleAdd = (amount = 1, silent?: boolean) => {
    const space = stock - quantityInCart;
    if (space <= 0) return;
    const n = Math.min(amount, space);
    addItem({ productId, name, price, image }, n);
    if (!silent) {
      toast.success(
        n === 1
          ? `„${name}” a fost adăugat în coș`
          : `Am adăugat ${n}× „${name}” în coș`,
      );
    }
  };

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(productId, quantityInCart - 1);
    }
  };

  // Out of stock
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        className={cn("h-11 w-full", className)}
      >
        Stoc epuizat
      </Button>
    );
  }

  if (variant === "cartLine") {
    return (
      <div
        className={cn(
          "flex h-11 w-full items-center rounded-md border border-border bg-card",
          className,
        )}
        role="group"
        aria-label="Cantitate în coș"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full flex-1 rounded-r-none"
          onClick={handleDecrement}
          aria-label="Scade cantitatea"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="flex-1 text-center text-sm font-semibold tabular-nums">
          {quantityInCart}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full flex-1 rounded-l-none disabled:opacity-20"
          onClick={() => handleAdd(1, true)}
          disabled={isAtMax}
          aria-label="Crește cantitatea"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Card / pagină produs: același UI înainte și după adăugare (fără −/+ după add).
  const qtyPicker = showQuantityBeforeAdd && stock > 0 && (
      <div
        className={cn(
          "flex h-11 shrink-0 items-center rounded-md border border-border bg-card",
          "w-full sm:w-auto sm:min-w-34",
        )}
        role="group"
        aria-label="Cantitate"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full flex-1 rounded-r-none"
          disabled={pickQty <= 1}
          onClick={() => setPickQty((q) => Math.max(1, q - 1))}
          aria-label="Scade cantitatea"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="min-w-10 text-center text-sm font-semibold tabular-nums">
          {pickQty}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full flex-1 rounded-l-none"
          disabled={pickQty >= stock}
          onClick={() => setPickQty((q) => Math.min(stock, q + 1))}
          aria-label="Crește cantitatea"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3",
        showQuantityBeforeAdd && "sm:flex-row sm:items-stretch",
        className,
      )}
    >
      {qtyPicker}
      <Button
        type="button"
        onClick={() => handleAdd(showQuantityBeforeAdd ? pickQty : 1)}
        className={cn(
          "h-11 w-full",
          showQuantityBeforeAdd && "sm:flex-1 sm:min-w-0",
        )}
        disabled={isAtMax}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Adaugă în coș
      </Button>
    </div>
  );
}
