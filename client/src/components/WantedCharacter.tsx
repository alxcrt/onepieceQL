import Image from "next/image";
import React from "react";

interface WantedCharacterProps {
  name: string;
  image: string;
  bounty: string;
}

export default function WantedCharacter({
  name = "Monkey D. Luffy",
  image = "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png",
  bounty = "5,000,000,000",
}: WantedCharacterProps) {
  return (
    <div className="w-[351px] h-[496px] bg-wanted flex flex-col text-black gap-2 p-2 relative overflow-hidden">
      {/* 351 × 496 */}
      <h3 className="uppercase text-7xl text-center font-playfair font-bold mix-blend-overlay">
        Wanted
      </h3>

      <div className="w-[220px] h-[220px] mx-auto flex justify-center items-center">
        <div className="w-[220px] h-[220px] bg-black opacity-50 mix-blend-overlay absolute rounded-md"></div>
        <Image
          src={image}
          alt={name}
          className="mx-auto object-cover object-top rounded-md h-[215px] w-[215px]"
          width={215}
          height={215}
        />
      </div>

      <p className="uppercase text-2xl text-center font-playfair font-bold mix-blend-overlay tracking-[0.4rem]">
        dead or alive
      </p>

      <p className="uppercase text-3xl text-center font-playfair font-bold mix-blend-overlay ">
        {name}
      </p>

      <p className="uppercase text-3xl text-center font-alwaysInMyHeart mix-blend-overlay tracking-[0.5rem] mx-auto flex">
        <Image src="/assets/Belly.svg" alt="" width={20} height={20} />
        {bounty}
      </p>

      <div className="flex justify-between items-center ">
        <p className="text-[5px] font-playfair font-bold mix-blend-overlay text-left pl-6">
          KONO SAKUHIN HA FICTION DETHUNODE JITSUZAISURU JINBUTSU DANTAI SONOTA
          NO SOSHIKI TO DOITSU NO MEISHOU GA GEKICHU NI TOUJYOU SHITATOSHITEMO
          JITSUZAI NA MONOTOHA ISSAI MUKANKEIDETH
        </p>

        <p className="uppercase text-3xl text-center font-playfair font-bold mix-blend-overlay">
          marine
        </p>

        {/* Decorations */}
        <div className=" mix-blend-overlay">
          <Image
            src="/assets/Swirl Left Top.svg"
            alt={name}
            className="mx-auto object-cover object-top rounded-md absolute top-[65%] left-3"
            width={13}
            height={56}
          />

          <Image
            src="/assets/Swirl Left Bottom.svg"
            alt={name}
            className="mx-auto object-cover object-top rounded-md absolute top-[77%] left-3"
            width={16}
            height={96}
          />

          <Image
            src="/assets/Swirl Right Top.svg"
            alt={name}
            className="mx-auto object-cover object-top rounded-md absolute top-[65%] right-3"
            width={14}
            height={56}
          />

          <Image
            src="/assets/Swirl Right Bottom.svg"
            alt={name}
            className="mx-auto object-cover object-top rounded-md absolute top-[77%] right-3"
            width={13}
            height={64}
          />
        </div>
      </div>
    </div>
  );
}
