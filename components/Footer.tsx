import Link from "next/link";
import Anpc from "./ANPCBadges";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black mt-10 border-t-1 pt-8">
      <div className="max-w-6xl mx-auto px-4 pt-1 mb-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* 1. Plata cu Cardul */}
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4 text-gray-800"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
              Plata Online cu Cardul
            </h3>
            <p className="text-xs text-gray-500 mt-2 font-light italic">
              Plătește în siguranță cu cardul
            </p>
          </div>

          {/* 2. Transport Gratuit */}
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4 text-gray-800"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a2 2 0 0 0-.59-1.41l-2.82-2.82a2 2 0 0 0-1.41-.59H15" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="17" cy="18" r="2" />
            </svg>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
              Transport Gratuit
            </h3>
            <p className="text-xs text-gray-500 mt-2 font-light italic">
              La comenzi de peste 1000 lei
            </p>
          </div>

          {/* 3. Ambalat cu Grijă */}
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4 text-gray-800"
            >
              <path d="M20 12v10H4V12" />
              <path d="M2 7h20v5H2z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
              Ambalat cu Grijă
            </h3>
            <p className="text-xs text-gray-500 mt-2 font-light italic">
              Pregătit special pentru cadou
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-t-1 pt-2">
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
      </div>
      <Anpc />
    </footer>
  );
};

export default Footer;
