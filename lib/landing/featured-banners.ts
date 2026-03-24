export type FeaturedBanner = {
  id: string;
  href: string;
  imageSrc: string;
  /** Shown on the slide and used for image accessibility */
  imageAlt: string;
  headline: string;
};

/**
 * Static hero banners (replace files under /public/banners/ as needed).
 * Routes match `lib/catalog/routes.ts` NAV_ROUTES slugs under /catalog/[slug].
 */
export const FEATURED_BANNERS: FeaturedBanner[] = [
  {
    id: "oferte",
    href: "/catalog/oferte",
    imageSrc: "/banners/oferte.jpg",
    imageAlt: "Oferte — banner",
    headline: "Explorează ofertele noastre",
  },
  {
    id: "parfumuri-barbati",
    href: "/catalog/parfumuri-barbati",
    imageSrc: "/banners/parfumuri-barbati.jpg",
    imageAlt: "Parfumuri bărbați — banner",
    headline: "Parfumuri bărbați",
  },
  {
    id: "parfumuri-femei",
    href: "/catalog/parfumuri-femei",
    imageSrc: "/banners/parfumuri-femei.jpg",
    imageAlt: "Parfumuri femei — banner",
    headline: "Parfumuri femei",
  },
];
