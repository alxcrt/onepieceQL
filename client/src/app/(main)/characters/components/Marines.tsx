import Marine from "@/components/Marine";
import { fetchCharacters } from "@/db/data";

export default async function Marines() {
  const data = await fetchCharacters({
    search: "marines and -pirate and admiral",
    limit: 3,
  });

  return (
    <section className="flex justify-evenly items-center flex-col">
      <h2 className="text-6xl font-bold text-center font-playfair">Marines</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {data.results.map((character) => (
          <div key={character.name} className="scale-75">
            <Marine
              name={character.name}
              image={character.image}
              position={character.occupations?.split(";")[0] || ""}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
