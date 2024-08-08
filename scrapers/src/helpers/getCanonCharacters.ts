import axios from "axios";
import * as cheerio from "cheerio";
import cliProgress from "cli-progress";

import { BASE_URL, PATHS } from "../consts";
import { getInfoFromAside, wait } from "../utils";

const charactersInfoBar = new cliProgress.SingleBar(
  {
    format:
      "Scraping one piece canon characters info... {bar} {percentage}% || {value}/{total} Characters",
    barCompleteChar: "\u2588",
    barIncompleteChar: " ",
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic
);

interface CharacterMetadata {
  id: string;
  name: string;
  href: string;
}

async function getCanonCharactersMetadata() {
  const axiosResponse = await axios.get(
    BASE_URL + PATHS.ONE_PIECE_CANON_CHARACTERS
  );

  const $ = cheerio.load(axiosResponse.data);

  const charactersMetadata: Array<CharacterMetadata> = [];

  let id = 0;

  $("#mw-content-text > div > table")
    .first()
    .find("tr")
    .slice(1) // Skip the header row
    .each((_, el) => {
      $(el)
        .find("td")
        .each((j, td) => {
          const name = $(td).text().trim();
          const a = $(td).find("a");
          const href = $(a).attr("href");
          if (j == 1 && href && name) {
            charactersMetadata.push({ id: id.toString(), name, href });
            id++;
          }
        });
    });

  return charactersMetadata;
}

async function getCanonCharacterInfo(character: CharacterMetadata) {
  const info = await getInfoFromAside(BASE_URL + character.href);
  return {
    id: character.id,
    href: character.href,
    ...info,
  };
}

async function getCanonCharacters(delay: number = 1000, limit: number = 0) {
  const charactersInfo: Array<any> = [];

  const charactersMetadata = await getCanonCharactersMetadata();

  charactersInfoBar.start(charactersMetadata.length, 0);

  let i = 0;
  for (const character of charactersMetadata) {
    const characterInfo = await getCanonCharacterInfo(character);
    charactersInfo.push({ name: character.name, ...characterInfo });

    charactersInfoBar.update(i++);

    // if limit is set, break the loop
    if (limit && i >= limit) break;

    await wait(delay);
  }

  charactersInfoBar.stop();

  return charactersInfo;
}

export default getCanonCharacters;
