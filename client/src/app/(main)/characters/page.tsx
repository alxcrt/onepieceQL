"use client";
import Character from "@/components/Character";
import Marine from "@/components/Marine";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {
    characters {
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
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.characters.map((character, i) => (
          <div key={character.name} className="flex flex-col items-center">
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
                bounty="5,000,000,000"
              />
            )}
          </div>
        ))}
      </div>
      {/* <p>{JSON.stringify(data)}</p> */}
    </main>
  );
}
