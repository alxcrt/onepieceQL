"use client";
import DevilFruit from "@/components/DevilFruit";
import Loading from "@/components/Loading";
import { useQuery, gql } from "@apollo/client";
import DevilFruitsInfo from "./components/DevilFruitsInfo";

const QUERY = gql`
  query {
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
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 px-4 mt-5">
      <DevilFruitsInfo />

      {loading && <Loading />}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {data?.devilFruits.map((devilFruit: any) => (
          <div key={devilFruit.name} className="flex flex-col items-center">
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
