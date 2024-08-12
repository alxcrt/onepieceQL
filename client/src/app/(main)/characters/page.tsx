"use client";
import Character from "@/components/Character";
import Loading from "@/components/Loading";
import Marine from "@/components/Marine";
import WantedCharacter from "@/components/WantedCharacter";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

const QUERY = gql`
  query characters($filter: CharacterFilter) {
    characters(filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        description
        image
        bounty
        occupations
        affiliations
      }
    }
  }
`;

// devilFruits {
//   name
//   description
//   image
//   types {
//     type
//     subType
//   }
// }

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      filter: {
        search: debouncedQuery,
        limit: 10,
        offset: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col">
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // onKeyDown={handleSearch}
        className="w-1/2 p-2 border border-gray-300 rounded-lg text-black mx-auto my-8"
      />

      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4">
        {!loading &&
          data.characters.results.map((character: any, i: number) => (
            <div key={character.name}>
              {character.bounty ? (
                <WantedCharacter
                  name={character.name}
                  image={character.image}
                  bounty={character.bounty}
                />
              ) : character.affiliations?.includes("Marines") ? (
                <Marine
                  name={character.name}
                  image={character.image}
                  position={character.occupations?.split(";")[0]}
                />
              ) : (
                <Character
                  name={character.name}
                  image={character.image}
                  occupation={character.occupations?.split(";")[0]}
                />
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
