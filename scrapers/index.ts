// import getCanonCharacters from "./utils/getCanonCharacters";

import axios from "axios";
import * as cheerio from "cheerio";
import getCanonCharacters from "./src/helpers/getCanonCharacters";
import { BASE_URL, PATHS } from "./src/consts";
import getCanonDevilFruits from "./src/helpers/getCanonDevilFruits";
import { getInfoFromAside, saveJSON } from "./src/utils";

async function performScraping() {
  const charactersInfo = await getCanonCharacters(1000, 10);
  console.log(JSON.stringify(charactersInfo, null, 2));
  // saveJSON(charactersInfo, "charactersInfo.json");
  // const devilFruitsInfo = await getCanonDevilFruits(1000);
  // console.log(JSON.stringify(devilFruitsInfo, null, 2));
  // saveJSON(devilFruitsInfo, "devilFruitsInfo.json");
}

performScraping();
