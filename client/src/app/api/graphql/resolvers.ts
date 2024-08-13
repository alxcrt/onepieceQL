import { eq, getTableColumns, inArray, sql, and } from "drizzle-orm";

import db from "@/db";
import {
  charactersToDevilFruits,
  devilFruits,
  devilFruitsToDevilFruitTypes,
  devilFruitTypes,
} from "@/db/schema";
import { fetchCharacters, fetchDevilFruits } from "@/db/data";

const resolvers = {
  DevilFruitTypes: {
    PARAMECIA: "Paramecia",
    ZOAN: "Zoan",
    LOGIA: "Logia",
  },
  DevilFruit: {
    types: async (parent: any) => {
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
    devilFruits: async (parent: any) => {
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
    characters: async (_: any, { filter }: any) => {
      return await fetchCharacters(filter);
    },
    devilFruits: async (_: any, { filter }: any) => {
      return await fetchDevilFruits(filter);
    },
  },
};

export default resolvers;
