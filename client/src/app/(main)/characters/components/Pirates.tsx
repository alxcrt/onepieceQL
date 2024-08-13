import WantedCharacter from "@/components/WantedCharacter";
import { fetchCharacters } from "@/db/data";

export default async function Pirates() {
  const data = await fetchCharacters({
    search: "pirate and -warlord and -marines and or luffy or straw hat",
    limit: 3,
  });

  return (
    <section className="flex justify-evenly items-center flex-col">
      <h2 className="text-6xl font-bold text-center font-playfair ">Pirates</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {data.results.map((character) => (
          <div key={character.name} className="scale-75">
            <WantedCharacter
              name={character.name}
              image={character.image}
              bounty={character.bounty || ""}
            />
          </div>
        ))}
      </div>

      {/* <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOffset(offset + 3)}
        >
          Next
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOffset(offset - 3)}
        >
          Previous
        </button>
      </div> */}
    </section>
  );
}
