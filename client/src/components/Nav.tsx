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
            <Link href="/api/graphql" target="_blank">
              <li
                className="button w-[6rem] h-[2.5rem] bg-[#D73634] rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#B70200,0_0px_0_0_#B70200]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#B70200,0_15px_0_0_#B70200]
    border-b-[1px] border-[#B70200]
  "
              >
                <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
                  Docs
                </span>
              </li>
            </Link>
            <li>
              <Link href="https://github.com/alxcrt/onepieceQL">
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
