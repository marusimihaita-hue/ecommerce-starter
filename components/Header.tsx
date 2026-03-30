"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Package, PackageCheck, ShoppingCart, User } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { DesktopMainNav } from "@/components/DesktopMainNav";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useNavMenuActions } from "@/lib/store/nav-menu-store-provider";

export function Header() {
  const { isSignedIn } = useAuth();
  const { openCart } = useCartActions();
  const { openNavMenu } = useNavMenuActions();
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/100 backdrop-blur-md supports-[backdrop-filter]:bg-background/100">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2 lg:min-w-[140px]">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 lg:hidden"
            onClick={openNavMenu}
            aria-label="Deschide meniul"
          >
            <Menu className="size-5" strokeWidth={2} aria-hidden />
          </Button>
          <Link
            href="/"
            className="inline-flex min-w-0 shrink-0 items-center rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src="/cvaldav-logo.png"
              alt="CValdav"
              width={160}
              height={40}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <DesktopMainNav />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 lg:ml-0 lg:min-w-[140px] lg:justify-end">
          {isSignedIn && (
            <Button asChild variant="ghost" size="icon" className="size-10">
              <Link
                href="/orders"
                className="inline-flex size-10 items-center justify-center"
                aria-label="Comenzile mele"
              >
                <PackageCheck className="size-5" strokeWidth={2} aria-hidden />
              </Link>
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative size-10"
            onClick={openCart}
            aria-label={
              totalItems > 0
                ? `Deschide coșul, ${totalItems} produse`
                : "Deschide coșul"
            }
          >
            <ShoppingCart className="size-5" strokeWidth={2} aria-hidden />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Button>

          <div className="flex size-10 items-center justify-center">
            {isSignedIn ? (
              <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-1 ring-border",
                    userButtonPopoverCard: "rounded-xl",
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10"
                  aria-label="Autentificare"
                >
                  <User className="size-5" strokeWidth={2} aria-hidden />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
