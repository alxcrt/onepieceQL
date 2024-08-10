import Character from "@/components/Character";
import Marine from "@/components/Marine";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">OnePieceQL</h1>

      <p>
        Long ago the infamous Gol D. Roger was the strongest and most powerful
        pirate on the seas. As he was about to be executed he revealed that he
        hid all of his wealth, including the legendary treasure known as One
        Piece. On an island at the end of the Grand Line - a treacherous and
        truly unpredictable sea. Monkey D. Luffy is a spirited, energetic and
        somewhat dim-witted young man with a very big dream: to find One Piece
        and become the Pirate King! However Luffy is no ordinary boy, as when he
        was younger he ate one of the Devil's Fruits and gained its power to
        become a Rubber Man. Now in this grand age of pirates Luffy sets out to
        gather a crew and sail to the most dangerous sea in the world so that he
        can fulfill his dream... and maybe even his appetite!
      </p>

      <Character />
      <Marine />
    </main>
  );
}
