"use client";
import Character from "@/components/Character";
import Loading from "@/components/Loading";
import Marine from "@/components/Marine";
import WantedCharacter from "@/components/WantedCharacter";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

const QUERY = gql`
  query characters($filter: CharacterFilter) {
    characters(filter: $filter) {
      name
      description
      image
      bounty
      occupations
      affiliations
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

export default function Warlords() {
  const { data, loading, error } = useQuery(QUERY, {
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
        {data?.characters.map((character: any, i: number) => (
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
