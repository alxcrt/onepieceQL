import axios from "axios";
import * as cheerio from "cheerio";
import cliProgress from "cli-progress";

import { BASE_URL, DevilFruitType, PATHS } from "../consts";
import { getInfoFromAside, wait } from "../utils";

const devilFruitsInfoBar = new cliProgress.SingleBar(
  {
    format:
      "Scraping one piece canon devil fruits info... {bar} {percentage}% || {value}/{total} Devil Fruits",
    barCompleteChar: "\u2588",
    barIncompleteChar: " ",
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic
);

interface DevilFruitMetadata {
  id: string;
  name: string;
  href: string;
  types: DevilFruitType[];
}

async function getCanonDevilFruitsMetadata() {
  const devilFruitsMetadata: Array<DevilFruitMetadata> = [];
  let id = 0;
  const axiosResponse = await axios.get(
    BASE_URL + PATHS.ONE_PIECE_CANON_DEVIL_FRUITS
  );

  const $ = cheerio.load(axiosResponse.data);

  $("table[title='Devil Fruits Navibox']")
    .find("tbody")
    // Filter the tables that contain Paramecia, Zoan, or Logia
    .filter((_, tbody) => {
      const text = $(tbody).find("th").text().toLowerCase();
      return (
        text.includes("paramecia") ||
        text.includes("zoan") ||
        text.includes("logia")
      );
    })
    .slice(1) // remove the first row
    .each((_, table) => {
      const type = $(table).find("tr").first().text();

      // Get the subType and the devil fruits of this type and subType
      $(table)
        .find("tr")
        .slice(1)
        .each((_, tr) => {
          let subType = $(tr).find("th").first().text();

          // Devil Fruits of this type and subType
          $(tr)
            .find("td")
            .find("a")
            .each((_, el) => {
              const name = $(el).attr("title");
              const href = $(el).attr("href");

              // dont include this (we already have SMILE)
              if (name?.includes("Artificial Devil Fruit")) return;
              // dont include non-canon
              if (subType.toLocaleLowerCase().includes("non-canon")) return;

              // Get the subType
              const sanitizedSubType = !subType.includes("Canon")
                ? (subType = subType.split(":")[0])
                : undefined;

              if (!name || !href || !type) return;

              // devilFruitsMetadata.push({
              //   name,
              //   href,
              //   id: id.toString(),
              // });
              id++;

              // Check if the devil fruit is already in the array
              const isAlreadyInArray = devilFruitsMetadata.some(
                (df) => df.name === name
              );

              const devilFruitType = (
                sanitizedSubType ? `${sanitizedSubType} ${type}` : type
              ) as DevilFruitType;

              // If it is not, add it to the array
              if (!isAlreadyInArray) {
                devilFruitsMetadata.push({
                  id: id.toString(),
                  name,
                  href,
                  types: [devilFruitType],
                });
              } else {
                // if it is, add the type to the array
                devilFruitsMetadata.forEach((df) => {
                  if (df.name === name) {
                    df.types.push(devilFruitType);
                  }
                });
              }
            });
        });
    });

  return devilFruitsMetadata;
}

async function getCanonDevilFruitInfo(devilFruit: DevilFruitMetadata) {
  const info = await getInfoFromAside(BASE_URL + devilFruit.href);
  return {
    id: devilFruit.id,
    href: devilFruit.href,
    types: devilFruit.types,
    ...info,
  };
}

async function getCanonDevilFruits(delay: number = 1000, limit: number = 0) {
  const devilFruitsInfo: Array<any> = [];

  const devilFruitsMetadata = await getCanonDevilFruitsMetadata();

  devilFruitsInfoBar.start(devilFruitsMetadata.length, 0);

  let i = 0;

  for (const devilFruit of devilFruitsMetadata) {
    const devilFruitInfo = await getCanonDevilFruitInfo(devilFruit);
    devilFruitsInfo.push({ name: devilFruit.name, ...devilFruitInfo });

    // update the progress bar
    devilFruitsInfoBar.update(i++);

    // if limit is set, break the loop
    if (limit && i >= limit) break;

    // wait for the delay to avoid rate limiting
    await wait(delay);
  }

  devilFruitsInfoBar.stop();

  return devilFruitsInfo;
}

export default getCanonDevilFruits;
