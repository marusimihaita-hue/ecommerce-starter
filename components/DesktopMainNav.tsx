"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const topLinkClass = cn(
  navigationMenuTriggerStyle(),
  "cursor-pointer no-underline text-foreground",
);

export function DesktopMainNav() {
  return (
    <NavigationMenu viewport={false} className="max-w-none flex-none">
      <NavigationMenuList className="flex flex-wrap items-center justify-center gap-0.5 xl:gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm xl:text-[15px]">
            Parfumuri
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex min-w-[13rem] flex-col gap-0.5 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/catalog/parfumuri-barbati">
                    Parfumuri bărbați
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/catalog/parfumuri-femei">Parfumuri femei</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/catalog/unisex">Unisex</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/catalog/giftsets" className={topLinkClass}>
              Seturi cadou
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/catalog/homeSpray" className={topLinkClass}>
              Parfumuri de cameră
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/catalog/carPerfume" className={topLinkClass}>
              Parfumuri de mașină
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/catalog/oferte" className={topLinkClass}>
              Oferte
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
