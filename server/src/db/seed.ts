import {
  devilFruits,
  characters,
  devilFruitTypes,
  devilFruitsToDevilFruitTypes,
  charactersToDevilFruits,
} from "./schema";

import { db } from ".";
import devilFruitsInfo from "../../../scrapers/devilFruitsInfo.json" assert { type: "json" };
import charactersInfo from "../../../scrapers/charactersInfo.json" assert { type: "json" };
import { eq, inArray, or, sql } from "drizzle-orm";
import { joinIfArray } from "../utils";

const main = async () => {
  try {
    console.log("Seeding database");

    await clearDatabase();
    await seedDevilFruitsTypes();
    await seedDevilFruits();
    await seedCharacters();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }

  console.log("Database seeded successfully");

  process.exit(0);
};

async function clearDatabase() {
  await db.delete(devilFruitsToDevilFruitTypes);
  await db.delete(charactersToDevilFruits);

  await db.delete(devilFruits);
  await db.delete(characters);
  await db.delete(devilFruitTypes);
}

async function seedDevilFruitsTypes() {
  const availableTypes = ["Logia", "Paramecia", "Zoan"];
  const availableZoanSubTypes = ["Mythical", "Ancient", "Artificial"];

  for (const type of availableTypes) {
    await db.insert(devilFruitTypes).values({
      type: type,
    });
  }

  for (const subType of availableZoanSubTypes) {
    await db.insert(devilFruitTypes).values({
      type: "Zoan",
      subType: subType,
    });
  }
}

async function seedDevilFruits() {
  for (const devilFruit of devilFruitsInfo) {
    const devilFruitName = devilFruit.name;
    const devilFruitDescription = devilFruit.description;
    const devilFruitInfo = devilFruit.Statistics;

    const devilFruitMeaning = !Array.isArray(devilFruitInfo["Meaning"])
      ? devilFruitInfo["Meaning"]
      : devilFruitInfo["Meaning"].join(", ");

    // const devi
    const devilFruitType = devilFruit.types;

    // Find the type in the database
    const type = await db
      .select()
      .from(devilFruitTypes)
      .where(
        or(
          inArray(
            sql`CONCAT(COALESCE(${devilFruitTypes.subType}, ''), ' ', ${devilFruitTypes.type})`,
            devilFruitType
          ),
          inArray(devilFruitTypes.type, devilFruitType)
        )
      );

    // Save the devil fruit
    const devilFruitEntity = await db
      .insert(devilFruits)
      .values({
        meaning: devilFruitMeaning,
        description: devilFruitDescription,
        image: devilFruit.image,
        name: devilFruitName,
      })
      .returning();

    if (type.length === 0) continue;

    // Save the relationship between the devil fruit and its type
    for (const t of type) {
      await db.insert(devilFruitsToDevilFruitTypes).values({
        devilFruitId: devilFruitEntity[0].id,
        devilFruitTypeId: t.id,
      });
    }
  }
}

async function seedCharacters() {
  for (const character of charactersInfo) {
    const characterName = character.name;
    const characterInfo = character.Statistics;
    const characterDescription = character.description;
    const characterImage = character.image;

    let characterDevilFruits = [];

    const characterOrigin = characterInfo["Origin"];

    const characterBirthday = joinIfArray(characterInfo["Birthday"]);
    const characterBloodType = joinIfArray(characterInfo["Blood Type"]);

    if ("Devil Fruit" in character) {
      let devilFruitsInfo = character["Devil Fruit"] as any;
      if (!Array.isArray(devilFruitsInfo)) {
        characterDevilFruits = [devilFruitsInfo];
      } else {
        characterDevilFruits = devilFruitsInfo;
      }
    }

    // Save the character
    const characterEntity = await db
      .insert(characters)
      .values({
        name: characterName,
        description: characterDescription,
        image: characterImage,
        origin: characterOrigin,
        birthday: characterBirthday,
        bloodType: characterBloodType,
      })
      .returning();

    if (characterDevilFruits.length === 0) continue;

    // We can have a devil fruit with multiple names but the first one is the one we want
    const devilFruitsArray = characterDevilFruits
      .map((df) => df["Japanese Name"])
      .map((name) => (Array.isArray(name) ? name[0] : name));

    // Find the devil fruits in the database
    const devilFruitEntities = await db
      .select()
      .from(devilFruits)
      .where(inArray(devilFruits.name, devilFruitsArray));

    // Save the relationship between the character and its devil fruits
    for (const devilFruit of devilFruitEntities) {
      await db.insert(charactersToDevilFruits).values({
        characterId: characterEntity[0].id,
        devilFruitId: devilFruit.id,
      });
    }
  }
}

await main();
