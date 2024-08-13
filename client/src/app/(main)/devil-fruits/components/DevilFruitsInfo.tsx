import Image from "next/image";
import React from "react";

export default function DevilFruitsInfo() {
  return (
    <div className="font-mono text-center space-y-10">
      <h1 className="text-5xl">Devil Fruits</h1>

      <div className="flex justify-center items-center flex-col lg:flex-row text-2xl">
        <Image
          src="/assets/gum-gum.png"
          alt="Gum Gum Fruit"
          className="object-cover hidden lg:block"
          width={194}
          height={250}
        />

        <div className="gap-0 lg:gap-20 space-y-10">
          <p className="lg:text-justify text-left mx-0 lg:mx-10">
            Devil Fruits are mysterious, distinctive fruits scattered throughout
            the world, known for permanently granting their eaters superhuman
            powers and an equally permanent inability to swim. With only one
            notable exception, an individual can only acquire the powers of a
            single Devil Fruit and survive. There are three categories of Devil
            Fruits
          </p>

          <div className="flex justify-center gap-10 flex-col md:flex-row">
            {["Paramecia", "Zoan", "Logia"].map((fruit) => (
              <div className="flex items-center justify-center" key={fruit}>
                <input type="checkbox" id={fruit} className="w-5 h-5" />
                <label htmlFor={fruit} className="ms-3 text-3xl">
                  {fruit}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Image
          src="/assets/hana.png"
          alt="Gum Gum Fruit"
          className="object-cover hidden lg:block"
          width={194}
          height={250}
        />
      </div>
    </div>
  );
}
