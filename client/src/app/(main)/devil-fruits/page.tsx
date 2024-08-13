"use client";
import DevilFruit from "@/components/DevilFruit";
import Loading from "@/components/Loading";
import { useQuery, gql } from "@apollo/client";
import DevilFruitsInfo from "./components/DevilFruitsInfo";
import { useCallback, useRef, useState } from "react";

const QUERY = gql`
  query devilFruits($filter: DevilFruitFilter) {
    devilFruits(filter: $filter) {
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
        types {
          type
          subType
        }
      }
    }
  }
`;

export default function Home() {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setSelectedType(event.target.value);
  };

  const obersever = useRef<IntersectionObserver | null>(null);

  const { data, loading, error, fetchMore } = useQuery(QUERY, {
    variables: {
      filter: {
        limit: 20,
        type: selectedType ? selectedType : undefined,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        filter: {
          limit: 20,
          page: Number.parseInt(data.devilFruits.info.next),
          type: selectedType ? selectedType : undefined,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          devilFruits: {
            info: fetchMoreResult.devilFruits.info,
            results: [
              ...prev.devilFruits.results,
              ...fetchMoreResult.devilFruits.results,
            ],
          },
        };
      },
    });
  }, [fetchMore, data, selectedType]);

  // Callback Ref to observe the last devil fruit
  const lastDevilFruit = useCallback(
    (node: any) => {
      if (!node) return;
      if (loading) return;
      if (obersever.current) obersever.current.disconnect();

      obersever.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.devilFruits.info.next) {
          handleFetchMore();
        }
      });

      if (node) obersever.current.observe(node);
    },
    [loading, handleFetchMore, data]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 px-4 mt-5">
      <DevilFruitsInfo handleSelect={handleChange} />

      {error && <p>Error: {error.message}</p>}
      {loading && <Loading />}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {data?.devilFruits?.results?.map((devilFruit: any, i: number) => (
          <div
            key={devilFruit.name}
            className="flex flex-col items-center"
            ref={
              data.devilFruits.results.length === i + 1 ? lastDevilFruit : null
            }
          >
            <DevilFruit
              name={devilFruit.name}
              image={devilFruit.image}
              types={devilFruit.types}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
