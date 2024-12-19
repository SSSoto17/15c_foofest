import Link from "next/link";
import Image from "next/image";
import Headers from "./Headers";

import "@/app/globals.css";
import { Anton } from "next/font/google";
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

import logo from "@/assets/svg/logo_bold.svg";

export default function MainLayout({ page, children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base">
        <Headers linksActive={page != "booking"} />
        {/* <Header linksActive={page != "booking"} /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}

export function Header({ linksActive }) {
  return (
    <header className="col-start-2 py-8">
      <nav className="flex w-full items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="FooFest" className="h-16 w-fit" />
        </Link>
        {linksActive && (
          <ul className="flex gap-2">
            <li>
              <Link href="/lineup/artists" className="py-2 px-6 grid place-content-center uppercase font-semibold">
                Lineup 2025
              </Link>
            </li>
            <li>
              <Link href="/booking" className="border-2 border-forest-600 bg-forest-600 py-2 px-6 grid place-content-center uppercase font-bold">
                Buy Tickets
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="grid place-content-center py-6 text-aztec-600">
      <small>Copyright © 2024 | All rights reserved</small>
    </footer>
  );
}
