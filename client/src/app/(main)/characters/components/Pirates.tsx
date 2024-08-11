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

export default function Pirates() {
  const [offset, setOffset] = React.useState(0);

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      filter: {
        search: "pirate and -warlord and -marines and or luffy or straw hat",
        limit: 3,
        hasBounty: true,
        offset,
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
      <h2 className="text-6xl font-bold text-center font-playfair ">Pirates</h2>

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
