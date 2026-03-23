"use client";

import Link from "next/link";
import {
  Menu,
  Package,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";

export function Header() {
  const { isSignedIn } = useAuth();
  const { openCart } = useCartActions();
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Menu className="mr-1" />
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              CValdav
            </span>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* My Orders - Only when signed in */}
          {isSignedIn && (
            <Button asChild variant="ghost" size="icon">
              <Link href="/orders" className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="sm"
            className="relative mr-2"
            onClick={openCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 ">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Deschide coșul ({totalItems} items)</span>
          </Button>

          {/* User */}
          {isSignedIn ? (
            <UserButton
              afterSwitchSessionUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Orders"
                  labelIcon={<Package className="h-4 w-4" />}
                  href="/orders"
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Autentificare</span>
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
