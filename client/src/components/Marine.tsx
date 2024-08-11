import Image from "next/image";
import React from "react";

interface MarineProps {
  name: string;
  image: string;
  position: string;
}

export default function Marine({
  name = "Sengoku",
  image = "https://static.wikia.nocookie.net/onepiece/images/0/08/Sengoku_Anime_Pre_Timeskip_Infobox.png/revision/latest?cb=20230213230306",
  position = "admiral",
}: MarineProps) {
  return (
    <div className="w-[351px] h-[496px] bg-wanted flex flex-col text-black gap-2 p-2 bg-[#C2D8FF] bg-blend-luminosity">
      <h1 className="uppercase text-7xl text-center font-playfair font-bold mix-blend-overlay">
        marine
      </h1>

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

      <p className="uppercase text-xl text-center font-playfair font-bold mix-blend-overlay">
        CHIEF petty officer
      </p>

      <p className="uppercase text-3xl text-center font-playfair font-bold mix-blend-overlay ">
        {name}
      </p>

      <div className="uppercase text-sm text-center font-playfair mix-blend-overlay flex items-center justify-between px-4">
        <div className="flex items-center">
          <Image
            src="/assets/wg.png"
            alt=""
            width={40}
            height={40}
            className="inline mr-2"
          />
          <p className="text-2xl">Rank</p>
        </div>
        <p className="text-2xl">{position}</p>
      </div>

      <div className="flex justify-center items-center px-4">
        <p className="text-[5px] font-playfair font-bold mix-blend-overlay text-left">
          honor of marine, we will swear that will help to people innocent and
          have keep the justice if we find bad thing in the sea, we have to get
          rid of it, vow of righteousness and justice
        </p>

        <Image
          src="/assets/marine.png"
          alt=""
          width={80}
          height={36}
          className="inline w-20 h-9"
        />
      </div>
    </div>
  );
}
