import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t pt-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Link-uri principale */}
        <div
          className="flex flex-col items-center gap-4 text-center 
                        md:flex-row md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-4"
        >
          <Link href="/info/about-us" className="hover:underline">
            Despre noi
          </Link>

          <Link href="/politica-cookies" className="hover:underline">
            Politica Cookies
          </Link>

          <Link href="/protectia-date" className="hover:underline">
            Politica privind protecția datelor cu caracter personal
          </Link>

          <Link href="/termeni-conditii" className="hover:underline">
            Termeni și condiții
          </Link>

          <Link href="/gdpr" className="hover:underline">
            Politica GDPR
          </Link>
        </div>

        {/* Linie 2 */}
        <div
          className="mt-4 flex flex-col items-center gap-3 text-center 
                        md:flex-row md:justify-center md:gap-x-10"
        >
          <Link href="https://anpc.ro/" className="hover:underline">
            PROTECȚIA CONSUMATORULUI A.N.P.C
          </Link>

          <Link href="/info/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-600">
          © 2026 CompactValdav
        </div>
      </div>
    </footer>
  );
};

export default Footer;
