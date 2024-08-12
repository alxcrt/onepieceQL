import {
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
  not,
  isNotNull,
  and,
} from "drizzle-orm";

import db from "@/db";
import {
  characters,
  charactersToDevilFruits,
  devilFruits,
  devilFruitsToDevilFruitTypes,
} from "@/db/schema";
import { fetchCharacters } from "@/db/data";

const resolvers = {
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
      const { search, limit, offset, hasBounty } = filter;

      return await fetchCharacters(filter);

      // if (filter.search) {
      //   // const matchQuery = sql`(
      //   //   setweight(to_tsvector('english', ${characters.name}), 'A') ||
      //   //   setweight(to_tsvector('english', ${characters.origin}), 'B') ||
      //   //   setweight(to_tsvector('english', ${characters.birthday}), 'C') ||
      //   //   setweight(to_tsvector('english', ${characters.bloodType}), 'D') ||
      //   //   setweight(to_tsvector('english', ${characters.description}), 'D'))
      //   //   , websearch_to_tsquery('english', ${filter.search}
      //   // )`;

      //   const matchQuery = sql`(
      //     setweight(to_tsvector('english', ${characters.name}), 'A') ||
      //     setweight(to_tsvector('english', ${characters.affiliations}), 'B') ||
      //     setweight(to_tsvector('english', ${characters.occupations}), 'C') ||
      //     setweight(to_tsvector('english', ${characters.origin}), 'D') ||
      //     setweight(to_tsvector('english', ${characters.bloodType}), 'D'))
      //     , websearch_to_tsquery('english', ${filter.search}
      //   )`;

      //   // return await db.query.characters.findMany({
      //   //   where: sql`to_tsvector('english', ${characters.name}) @@ websearch_to_tsquery('english', ${filter.name})`,
      //   // });

      //   // setweight(to_tsvector('english', ${table.name}), 'A') ||
      //   // setweight(to_tsvector('english', ${table.origin}), 'B') ||
      //   // setweight(to_tsvector('english', ${table.birthday}), 'C') ||
      //   // setweight(to_tsvector('english', ${table.description}), 'D') ||
      //   // setweight(to_tsvector('english', ${table.bloodType}), 'D'

      //   // return await db.query.characters.select().findMany({

      //   //   where: sql`(
      //   //     setweight(to_tsvector('english', ${characters.name}), 'A') ||
      //   //     setweight(to_tsvector('english', ${characters.origin}), 'B') ||
      //   //     setweight(to_tsvector('english', ${characters.birthday}), 'C') ||
      //   //     setweight(to_tsvector('english', ${characters.bloodType}), 'D'))
      //   //     @@ websearch_to_tsquery('english', ${filter.search}
      //   //   )`,
      //   //   limit: 10,
      //   // });

      //   return await db
      //     .select({
      //       ...getTableColumns(characters),
      //       rank: sql`ts_rank(${matchQuery})`,
      //       rankCd: sql`ts_rank_cd(${matchQuery})`,
      //     })
      //     .from(characters)
      //     .where(
      //       and(
      //         sql`(
      //         setweight(to_tsvector('english', ${characters.name}), 'A') ||
      //         setweight(to_tsvector('english', ${characters.affiliations}), 'B') ||
      //         setweight(to_tsvector('english', ${characters.occupations}), 'C') ||
      //         setweight(to_tsvector('english', ${characters.origin}), 'D') ||
      //         setweight(to_tsvector('english', ${characters.bloodType}), 'D'))
      //         @@ websearch_to_tsquery('english', ${filter.search}
      //       )`,
      //         hasBounty ? isNotNull(characters.bounty) : undefined
      //       )
      //     )
      //     .orderBy((t) => desc(t.rank))
      //     .limit(limit)
      //     .offset(offset);
      // }

      // return await db.query.characters.findMany({
      //   limit: limit,
      //   offset: offset,
      //   where: hasBounty ? isNotNull(characters.bounty) : undefined,
      // });
    },
    devilFruits: async () => await db.select().from(devilFruits),
  },
};

export default resolvers;
