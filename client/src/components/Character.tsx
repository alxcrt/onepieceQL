import Image from "next/image";
import React from "react";

interface CharacterProps {
  name: string;
  image: string;
  occupation: string;
}

export default function Character({
  name = "Monkey D. Luffy",
  image = "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png",
  occupation = "Pirate",
}: CharacterProps) {
  return (
    <div className="w-[351px] h-[496px] bg-wanted flex flex-col text-black gap-2 p-2 bg-[#A7C796] bg-blend-luminosity overflow-hidden">
      <div className="w-[335px] h-[72px]"></div>

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

      {/* <p className="uppercase text-2xl text-center font-playfair font-bold mix-blend-overlay tracking-[0.4rem]">
        dead or alive
      </p> */}

      <p className="uppercase text-3xl text-center font-playfair font-bold mix-blend-overlay ">
        {name}
      </p>

      <p className="uppercase text-3xl text-center font-playfair mix-blend-overlay tracking-[0.5rem] mx-auto flex">
        {occupation}
      </p>
    </div>
  );
}
