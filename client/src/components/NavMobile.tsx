"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavMobile() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav>
      <div className="max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4 font-playfair uppercase font-black text-2xl tracking-[0.2rem] flex md:hidden text-white">
        <Link href="/">
          <Image
            className="w-[215px] h-[78px]"
            src="/op-logo.png"
            alt="logo"
            width={215}
            height={78}
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center gap-4 absolute w-[90%] z-10 bg-[#464646] left-1/2 transform -translate-x-1/2 border-4 ">
            <li onClick={() => setIsOpen(false)}>
              <Link href="/characters">Characters</Link>
            </li>

            <li onClick={() => setIsOpen(false)}>
              <Link href="/devil-fruits">Devil Fruits</Link>
            </li>

            <ul className="ml-auto flex gap-4 justify-center items-center">
              <li onClick={() => setIsOpen(false)}>
                <Link href="/api/graphql" target="_blank">
                  Docs
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  href="https://github.com/alxcrt/onepieceQL"
                  target="_blank"
                >
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
        </div>
      </div>
    </nav>
  );
}
