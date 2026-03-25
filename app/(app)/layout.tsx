import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { NavMenuStoreProvider } from "@/lib/store/nav-menu-store-provider";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { CartSheet } from "@/components/CartSheet";
import { NavMenuSheet } from "@/components/NavMenuSheet";
import Footer from "@/components/Footer";
import ShippingAlert from "@/components/ShippingAlert";
import Anpc from "@/components/ANPCBadges";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <NavMenuStoreProvider>
          {/* <ShippingAlert /> */}
          <Header />
          <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
          <Footer />
          <NavMenuSheet />
          <CartSheet />
        </NavMenuStoreProvider>
        <Toaster position="bottom-center" />
        <SanityLive />
      </CartStoreProvider>
    </ClerkProvider>
  );
};

export default Layout;
