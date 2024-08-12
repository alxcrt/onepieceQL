import { and, desc, getTableColumns, isNotNull, sql } from "drizzle-orm";
import { characters } from "./schema";
import db from ".";

export async function fetchCharacters(filter: {
  search?: string;
  limit: number;
  offset: number;
  hasBounty?: boolean;
}) {
  const { search, limit, offset, hasBounty } = filter;

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
      .offset(offset);

    return {
      results,
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    };
  }

  const results = await db.query.characters.findMany({
    limit: limit,
    offset: offset,
    where: hasBounty ? isNotNull(characters.bounty) : undefined,
  });

  return {
    results,
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
  };
}
