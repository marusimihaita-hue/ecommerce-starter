import { ClerkProvider } from "@clerk/nextjs";
import { CartSheet } from "@/components/CartSheet";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavMenuSheet } from "@/components/NavMenuSheet";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { NavMenuStoreProvider } from "@/lib/store/nav-menu-store-provider";
import { SanityLive } from "@/sanity/lib/live";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-ui-scale w-full">
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
    </div>
  );
};

export default Layout;
