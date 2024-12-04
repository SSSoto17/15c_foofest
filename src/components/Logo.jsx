import Link from "next/link";
import Image from "next/image";

import logoSVG from "@/assets/svg/logo_bold.svg";

export default function Logo() {
  return (
    <Link href="" className="grid gap-y-2 place-items-center max-w-14">
      <Image src={logoSVG} alt="FooFest logo" className="w-" />
      <p className="font-semibold uppercase text-desk-sm text-[#C08A40]">
        FooFest
      </p>
    </Link>
  );
}
