"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useNavMenuActions,
  useNavMenuIsOpen,
} from "@/lib/store/nav-menu-store-provider";

const MAIN_LINKS = [
  { label: "Parfumuri bărbați", href: "/catalog/parfumuri-barbati" },
  { label: "Parfumuri femei", href: "/catalog/parfumuri-femei" },
  { label: "Unisex", href: "/catalog/unisex" },
  { label: "Seturi cadou", href: "/catalog/seturi-cadou" },
  { label: "Casă & Îngrijire", href: "/catalog/casa-ingrijire" },
  { label: "Parfumuri cameră", href: "/catalog/parfumuri-camera" },
] as const;

const SPECIAL_LINKS = [
  { label: "Oferte", href: "/catalog/oferte" },
  { label: "Noutăți", href: "/catalog/noutati" },
  { label: "Populare", href: "/catalog/populare" },
] as const;

export function NavMenuSheet() {
  const isOpen = useNavMenuIsOpen();
  const { closeNavMenu } = useNavMenuActions();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeNavMenu()}>
      <SheetContent
        side="left"
        className="flex w-full flex-col sm:max-w-lg gap-0"
      >
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            Meniu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Categorii principale
          </p>
          <ul className="space-y-0.5">
            {MAIN_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeNavMenu}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Separator className="my-4 bg-border" />

          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Secțiuni speciale
          </p>
          <ul className="space-y-0.5">
            {SPECIAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeNavMenu}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
