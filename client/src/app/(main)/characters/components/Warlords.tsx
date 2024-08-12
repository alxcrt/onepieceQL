import WantedCharacter from "@/components/WantedCharacter";
import { fetchCharacters } from "@/db/data";

export default async function Warlords() {
  const data = await fetchCharacters({
    search: "warlord",
    limit: 3,
    offset: 0,
  });

  return (
    <section className="flex justify-evenly items-center flex-col">
      <h2 className="text-6xl font-bold text-center font-playfair ">
        Warlords
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {data.results.map((character: any, i: number) => (
          <div key={character.name} className="scale-75">
            <WantedCharacter
              name={character.name}
              image={character.image}
              bounty={character.bounty}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
