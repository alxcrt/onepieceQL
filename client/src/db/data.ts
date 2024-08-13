import { and, desc, getTableColumns, isNotNull, sql } from "drizzle-orm";
import {
  characters,
  devilFruits,
  devilFruitsToDevilFruitTypes,
  devilFruitTypes,
} from "./schema";
import db from ".";

export async function fetchCharacters(filter: {
  search?: string;
  limit: number;
  page?: number;
  hasBounty?: boolean;
}) {
  const { search, limit = 10, page = 1, hasBounty } = filter;

  if (search && search.length > 0) {
    const matchQuery = sql`(
          setweight(to_tsvector('english', ${characters.name}), 'A') ||
          setweight(to_tsvector('english', ${characters.affiliations}), 'B') ||
          setweight(to_tsvector('english', ${characters.occupations}), 'C') ||
          setweight(to_tsvector('english', ${characters.origin}), 'D') ||
          setweight(to_tsvector('english', ${characters.bloodType}), 'D'))
          , websearch_to_tsquery('english', ${filter.search}
        )`;

    const results = await db
      .select({
        ...getTableColumns(characters),
        rank: sql`ts_rank(${matchQuery})`,
        rankCd: sql`ts_rank_cd(${matchQuery})`,
        count: sql`count(*) OVER()`,
      })
      .from(characters)
      .where(
        and(
          sql`(
              setweight(to_tsvector('english', ${characters.name}), 'A') ||
              setweight(to_tsvector('english', ${characters.affiliations}), 'B') ||
              setweight(to_tsvector('english', ${characters.occupations}), 'C') ||
              setweight(to_tsvector('english', ${characters.origin}), 'D') ||
              setweight(to_tsvector('english', ${characters.bloodType}), 'D'))
              @@ websearch_to_tsquery('english', ${filter.search}
            )`,
          hasBounty ? isNotNull(characters.bounty) : undefined
        )
      )
      .orderBy((t) => desc(t.rank))
      .limit(limit)
      .offset(page * limit - limit);

    // @ts-expect-error
    const pages = Math.ceil((results[0]?.count || 0) / limit);

    return {
      results,
      info: {
        count: results[0]?.count || 0,
        // pages: Math.ceil((results[0]?.count || 0) / limit),
        pages,
        // Number of next page (null if no next page)
        next: page >= pages ? null : page + 1,
        // Number of previous page (null if no previous page)
        prev: page < 2 ? null : page - 1,
      },
    };
  }

  const results = await db
    .select({
      ...getTableColumns(characters),
      count: sql`count(*) OVER()`,
    })
    .from(characters)
    .where(hasBounty ? isNotNull(characters.bounty) : undefined)
    .limit(limit)
    .offset(limit * page - limit);

  // @ts-expect-error
  const pages = Math.ceil((results[0]?.count || 0) / limit);

  return {
    results,
    info: {
      count: results[0]?.count || 0,
      pages,
      next: page >= pages ? null : page + 1,
      prev: page < 2 ? null : page - 1,
    },
  };
}

export async function fetchDevilFruits(filter: {
  limit: number;
  page?: number;
  type?: string;
}) {
  const { limit = 20, page = 1, type } = filter;

  if (type) {
    const getDevilFruitsWithTypes = async (
      fruitNameFilter?: string,
      typeNameFilter?: string
    ) => {
      return await db.query.devilFruitsToDevilFruitTypes.findMany({
        where: and(
          fruitNameFilter
            ? sql`${devilFruitsToDevilFruitTypes.devilFruitId} IN (
                  SELECT id FROM ${devilFruits} WHERE name = ${fruitNameFilter}
                )`
            : undefined,
          typeNameFilter
            ? sql`${devilFruitsToDevilFruitTypes.devilFruitTypeId} IN (
                  SELECT id FROM ${devilFruitTypes} WHERE type = ${typeNameFilter}
                )`
            : undefined
        ),
        with: {
          devilFruit: true,
          devilFruitType: true,
        },
        extras: {
          count: sql`count(*) OVER()`.as("count"),
        },
        limit,
        offset: page * limit - limit,
      });
    };

    const results = await getDevilFruitsWithTypes(undefined, type);

    //@ts-expect-error
    const pages = Math.ceil((results[0]?.count || 0) / limit);

    return {
      results: results.map((result: any) => result.devilFruit),
      info: {
        count: results[0]?.count || 0,
        pages,
        next: page >= pages ? null : page + 1,
        prev: page < 2 ? null : page - 1,
      },
    };
  }

  const results = await db
    .select({
      ...getTableColumns(devilFruits),
      count: sql`count(*) OVER()`,
    })
    .from(devilFruits)
    .limit(limit)
    .offset(page * limit - limit);

  //@ts-expect-error
  const pages = Math.ceil((results[0]?.count || 0) / limit);

  return {
    results,
    info: {
      count: results[0]?.count || 0,
      pages,
      next: page >= pages ? null : page + 1,
      prev: page < 2 ? null : page - 1,
    },
  };
}
