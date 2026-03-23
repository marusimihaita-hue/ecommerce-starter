import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { CartSheet } from "@/components/CartSheet";
import Footer from "@/components/Footer";
import ShippingAlert from "@/components/ShippingAlert";
import Anpc from "@/components/ANPCBadges";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        {/* <ShippingAlert /> */}
        <Header />
        <main>{children}</main>
        <Footer />
        <Anpc />
        <CartSheet />
        <Toaster position="bottom-center" />
        <SanityLive />
      </CartStoreProvider>
    </ClerkProvider>
  );
};

export default Layout;
