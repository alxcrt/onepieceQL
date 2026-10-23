"use client";
import Loading from "@/components/Loading";
import WantedCharacter from "@/components/WantedCharacter";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from "react";

import type { CharactersData } from "@/types/graphql";

const QUERY = gql`
  query characters($filter: CharacterFilter) {
    characters(filter: $filter) {
      info { count pages next prev }
      results { name description image bounty occupations affiliations }
    }
  }
`;

export default function Warlords() {
  const { data, loading, error } = useQuery<CharactersData>(QUERY, {
    variables: {
      filter: {
        search: "warlord",
        limit: 3,
      },
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className="flex justify-evenly items-center flex-col">
      <h2 className="text-6xl font-bold text-center font-playfair ">
        Warlords
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {data?.characters.results.map((character) => (
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
