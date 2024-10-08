import {
  integer,
  serial,
  text,
  pgTable,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { desc, relations, sql } from "drizzle-orm";

export const type = pgEnum("type", ["Paramecia", "Zoan", "Logia"]);
export const subType = pgEnum("sub_type", [
  "Ancient",
  "Mythical",
  "Artificial",
]);

export const devilFruits = pgTable("devil_fruits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  meaning: text("meaning"),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const characters = pgTable(
  "characters",
  {
    id: serial("id").primaryKey(),
    origin: text("origin"),
    name: text("name").notNull(),
    birthday: text("birthday"),
    description: text("description").notNull(),
    image: text("image").notNull(),
    bloodType: text("blood_type"),
    affiliations: text("affiliations"),
    occupations: text("occupations"),
    bounty: text("bounty"),
  },
  (table) => ({
    nameSearchIndex: index("name_search_index").using(
      "gin",
      sql`(
        setweight(to_tsvector('english', ${table.name}), 'A') ||
        setweight(to_tsvector('english', ${table.affiliations}), 'B') ||
        setweight(to_tsvector('english', ${table.occupations}), 'C') ||
        setweight(to_tsvector('english', ${table.origin}), 'D') ||
        setweight(to_tsvector('english', ${table.bloodType}), 'D')
      )`
    ),
  })
);

export type CharacterType = typeof characters.$inferSelect;

export const devilFruitTypes = pgTable("devil_fruit_types", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  subType: text("sub_type"),
});

export const devilFruitsToDevilFruitTypes = pgTable(
  "devil_fruits_to_devil_fruit_types",
  {
    devilFruitId: integer("devil_fruit_id").references(() => devilFruits.id),
    devilFruitTypeId: integer("devil_fruit_type_id").references(
      () => devilFruitTypes.id
    ),
  }
);

export const charactersToDevilFruits = pgTable("characters_to_devil_fruits", {
  characterId: integer("character_id").references(() => characters.id),
  devilFruitId: integer("devil_fruit_id").references(() => devilFruits.id),
});

export const devilFruitsToDevilFruitTypesRelations = relations(
  devilFruitsToDevilFruitTypes,
  ({ one }) => ({
    devilFruit: one(devilFruits, {
      fields: [devilFruitsToDevilFruitTypes.devilFruitId],
      references: [devilFruits.id],
    }),
    devilFruitType: one(devilFruitTypes, {
      fields: [devilFruitsToDevilFruitTypes.devilFruitTypeId],
      references: [devilFruitTypes.id],
    }),
  })
);

export const charactersToDevilFruitsRelations = relations(
  charactersToDevilFruits,
  ({ one }) => ({
    character: one(characters, {
      fields: [charactersToDevilFruits.characterId],
      references: [characters.id],
    }),
    devilFruit: one(devilFruits, {
      fields: [charactersToDevilFruits.devilFruitId],
      references: [devilFruits.id],
    }),
  })
);
