"use client";
import Character from "@/components/Character";
import Loading from "@/components/Loading";
import Marine from "@/components/Marine";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

const QUERY = gql`
  query characters($filter: CharacterFilter) {
    characters(filter: $filter) {
      name
      description
      image
      devilFruits {
        name
        description
        image
        types {
          type
          subType
        }
      }
    }
  }
`;

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [query, setQuery] = React.useState("");

  const [search, { data, loading, error }] = useLazyQuery(QUERY, {
    variables: {
      filter: {
        search: query,
      },
    },
  });

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      search({
        variables: {
          filter: {
            search: query,
          },
        },
      });
    }

    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  if (loading) {
    // return <p>Loading...</p>;
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="w-1/2 p-2 border border-gray-300 rounded-lg text-black mx-auto"
      />

      <div className="flex flex-col items-center p-4">
        {data?.characters.map((character: any, i: number) => (
          <div key={character.name}>
            {i % 2 === 0 ? (
              <Character
                name={character.name}
                image={character.image}
                bounty="5,000,000,000"
              />
            ) : (
              <Marine
                name={character.name}
                image={character.image}
                position="Admiral"
              />
            )}
          </div>
        ))}
      </div>
      {/* <p>{JSON.stringify(data)}</p> */}
    </main>
  );
}
