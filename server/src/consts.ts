type Paramecia = "Paramecia";
type Zoan = "Zoan";
type Logia = "Logia";

type ZoanSubType = "Ancient" | "Mythical" | "Artificial";

export type DevilFruitType = `${ZoanSubType} ${Zoan}` | Paramecia | Logia;
