export const BASE_URL = "https://onepiece.fandom.com";

export const PATHS = {
  ONE_PIECE_CANON_CHARACTERS: "/wiki/List_of_Canon_Characters",
  ONE_PIECE_CANON_DEVIL_FRUITS: "/wiki/Devil_Fruit",
};

type Paramecia = "Paramecia";
type Zoan = "Zoan";
type Logia = "Logia";

type ZoanSubType = "Ancient" | "Mythical" | "Artificial";

export type DevilFruitType = `${ZoanSubType} ${Zoan}` | Paramecia | Logia;
