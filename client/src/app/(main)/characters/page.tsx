"use client";
import Character from "@/components/Character";
import Loading from "@/components/Loading";
import Marine from "@/components/Marine";
import WantedCharacter from "@/components/WantedCharacter";
import { useQuery, gql } from "@apollo/client";
import React, { useCallback, useEffect, useRef } from "react";
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

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const obersever = useRef<IntersectionObserver | null>(null);

  const { data, loading, error, fetchMore } = useQuery(QUERY, {
    variables: {
      filter: {
        search: debouncedQuery,
        limit: 20,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        filter: {
          search: debouncedQuery,
          limit: 20,
          page: Number.parseInt(data.characters.info.next),
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          characters: {
            info: fetchMoreResult.characters.info,
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        };
      },
    });
  }, [fetchMore, data, debouncedQuery]);

  // Callback Ref to observe the last character
  const lastCharacter = useCallback(
    (node: any) => {
      if (!node) return;
      if (loading) return;
      if (obersever.current) obersever.current.disconnect();

      obersever.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.characters.info.next) {
          handleFetchMore();
        }
      });

      if (node) obersever.current.observe(node);
    },
    [loading, handleFetchMore, data]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main className="flex flex-col px-4 mt-5">
      <h2 className="font-mono text-center  text-5xl">Characters</h2>

      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search characters e.g. Straw Hat Pirates, Marines, etc"
        className="lg:w-[75%] p-2 border border-gray-300 rounded-lg text-black mx-auto my-8 font-mono text-xl w-full"
      />

      {error && <p>Error: {error.message}</p>}
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 p-4">
        {data?.characters.results?.map((character: any, i: number) => (
          <div
            key={character.name}
            ref={
              data.characters.results.length === i + 1 ? lastCharacter : null
            }
          >
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
