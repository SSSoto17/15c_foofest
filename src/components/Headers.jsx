"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import logo from "@/assets/svg/logo_bold.svg";

export default function Header(linksActive) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 bg-main-background drop-shadow-main z-20 overflow-x-clip">
      <nav className="flex w-full items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="FooFest" className="h-16 w-fit" />
        </Link>
        {linksActive && (
          <>
            <ul className="md:flex gap-2 hidden">
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
            <MobileNavIcon setIsOpen={setIsOpen} isOpen={isOpen} />
          </>
        )}
      </nav>
      <MobileNav setIsOpen={setIsOpen} isOpen={isOpen} />
    </header>
  );
}

export const MobileNav = ({ setIsOpen, isOpen }) => {
  const classes = `col-start-1 col-span-3 w-screen h-screen absolute top-20 bg-[#171e1b] drop-shadow-main grid items-center justify-around transition-[left] duration-500 ease-in-out ${isOpen ? "left-0" : "left-full"}`;
  return (
    <nav className={classes}>
      <menu className="text-2xl flow-space">
        <li>
          <Link
            className="py-2 px-6 grid place-content-center uppercase font-semibold"
            href="/lineup/artists"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Lineup 2025
          </Link>
        </li>
        <li>
          <Link
            className="border-2 border-forest-600 bg-forest-600 py-2 px-6 grid place-content-center uppercase font-bold"
            href="/booking"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Buy Tickets
          </Link>
        </li>
      </menu>
    </nav>
  );
};

export const MobileNavIcon = ({ setIsOpen, isOpen }) => {
  const role = {
    top: `transition-[transform] ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-0.5"}`,
    middle: `transition-[opacity] my-1 ${isOpen ? "opacity-0" : "opacity-100"}`,
    bottom: `transition-[transform] ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0.5"}`,
  };

  function setClasses(role) {
    return "bg-forest-100 block duration-300 ease-out h-0.5 w-6 rounded-sm z-100 " + role;
  }

  return (
    <button
      aria-label="Navigation"
      className="md:hidden"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <span className={setClasses(role.top)}></span>
      <span className={setClasses(role.middle)}></span>
      <span className={setClasses(role.bottom)}></span>
    </button>
  );
};
