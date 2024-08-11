import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavMobile from "./NavMobile";

export default function Nav() {
  return (
    <>
      <NavMobile />
      <nav className="py-8 font-playfair uppercase font-black text-xl tracking-[0.2rem] hidden md:block">
        {/* Large Display */}
        <ul className="flex-1 justify-center items-center gap-8 hidden md:flex">
          <li>
            <Link href="/">
              <Image
                className="w-[215px] h-[78px]"
                src="/op-logo.png"
                alt="logo"
                width={215}
                height={78}
              />
            </Link>
          </li>
          <li>
            <Link href="/characters">Characters</Link>
          </li>

          <li>
            <Link href="/devil-fruits">Devil Fruits</Link>
          </li>

          <ul className="ml-auto flex gap-4 justify-center items-center">
            <li>
              <Link href="/docs">Docs</Link>
            </li>
            <li>
              <Link href="https://github.com">
                <Image
                  className="w-[30px] h-[30px] invert"
                  src="/gh.svg"
                  alt="github"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
}
