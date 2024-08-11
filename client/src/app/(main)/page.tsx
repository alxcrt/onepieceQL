import Character from "@/components/Character";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className=" flex justify-center items-center flex-col lg:flex-row gap-8 lg:gap-16">
        <Image
          src="/assets/hero-main.jpg"
          alt="Monkey D. Luffy"
          className="object-cover rounded-md"
          width={400}
          height={565}
        />
        <p className="lg:w-1/2 text-2xl font-mono">
          <span className="font-bold text-3xl">Long ago</span> the infamous Gol
          D. Roger was the strongest and most powerful pirate on the seas. As he
          was about to be executed he revealed that he hid all of his wealth,
          including the legendary treasure known as One Piece. On an island at
          the end of the Grand Line - a treacherous and truly unpredictable sea.
          Monkey D. Luffy is a spirited, energetic and somewhat dim-witted young
          man with a very big dream: to find One Piece and become the Pirate
          King! However Luffy is no ordinary boy, as when he was younger he ate
          one of the Devil&apos;s Fruits and gained its power to become a Rubber
          Man. Now in this grand age of pirates Luffy sets out to gather a crew
          and sail to the most dangerous sea in the world so that he can fulfill
          his dream... and maybe even his appetite!
        </p>
      </div>

      {/* <Character /> */}
    </main>
  );
}
