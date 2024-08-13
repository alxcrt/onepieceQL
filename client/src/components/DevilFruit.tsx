import Image from "next/image";
import React from "react";

interface DevilFruitProps {
  name: string;
  image: string;
  types: { type: string; subType: string }[];
}

export default function DevilFruit({
  name = "Monkey D. Luffy",
  image = "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png",
  types = [{ type: "Zoan", subType: "Mythical" }],
}: DevilFruitProps) {
  return (
    <div className="w-[351px] h-[496px] bg-wanted flex flex-col gap-2 p-2 bg-[#DBBE8E] bg-blend-multiply relative text-[#4f0000]">
      {/* 351 × 496 */}
      <h1 className="uppercase text-7xl text-center font-playfair font-bold mix-blend-overlay">
        akuma no mi
      </h1>

      <div className="w-[220px] h-[220px] mx-auto flex justify-center items-center">
        <div className="w-[220px] h-[220px] bg-black opacity-50 mix-blend-overlay absolute rounded-md"></div>
        <Image
          src={image}
          alt={name}
          className="mx-auto object-scale-down object-center rounded-md h-[215px] w-[215px]"
          width={215}
          height={215}
        />
      </div>

      <p className="uppercase text-3xl text-center font-playfair font-bold mix-blend-overlay ">
        {name}
      </p>

      <div className="flex justify-center gap-4 font-mono">
        {types.map((type) => (
          <div
            key={type.type}
            className="bg-[#4f0000] text-[#DBBE8E] p-2 rounded-md text-sm"
          >
            {type.type} {type.subType}
          </div>
        ))}
      </div>
    </div>
  );
}
