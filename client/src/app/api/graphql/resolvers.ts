import { eq, inArray } from "drizzle-orm";

import db from "@/db";
import {
  characters,
  charactersToDevilFruits,
  devilFruits,
  devilFruitsToDevilFruitTypes,
} from "@/db/schema";

const resolvers = {
  DevilFruit: {
    type: async (parent: any) => {
      const devilFruitTypes =
        await db.query.devilFruitsToDevilFruitTypes.findMany({
          where: eq(devilFruitsToDevilFruitTypes.devilFruitId, parent.id),
        });

      const devilFruitTypeIds = devilFruitTypes
        .map((dft) => dft.devilFruitTypeId)
        .filter((id) => id !== null);

      return await db.query.devilFruitTypes.findMany({
        where: inArray(devilFruits.id, devilFruitTypeIds),
      });
    },
  },
  Character: {
    devilFruit: async (parent: any) => {
      const characterDevilFruits =
        await db.query.charactersToDevilFruits.findMany({
          where: eq(charactersToDevilFruits.characterId, parent.id),
        });

      const devilFruitIds = characterDevilFruits
        .map((cdf) => cdf.devilFruitId)
        .filter((id) => id !== null);

      return await db.query.devilFruits.findMany({
        where: inArray(devilFruits.id, devilFruitIds),
      });
    },
  },
  Query: {
    me: () => "Hello, world!",
    characters: async () => await db.select().from(characters),
    devilFruits: async () => await db.select().from(devilFruits),
  },
};

export default resolvers;
