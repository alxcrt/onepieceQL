type PageInfo = { count: number; pages: number; next: string | null; prev: string | null };
type CharacterResult = { name: string; description: string; image: string; bounty: string | null; occupations: string | null; affiliations: string | null };
type DevilFruitResult = { name: string; description: string; image: string; types: { type: string; subType: string | null }[] };
export type CharactersData = { characters: { info: PageInfo; results: CharacterResult[] } };
export type DevilFruitsData = { devilFruits: { info: PageInfo; results: DevilFruitResult[] } };
