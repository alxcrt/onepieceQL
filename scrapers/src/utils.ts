import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to save a JSON file
export const saveJSON = (data: any, filename: string) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

// Function to extract information from the aside section of a webpage
export async function getInfoFromAside(url: string) {
  // Fetch the webpage content
  const response = await axios.get(url);
  // Load the HTML content into cheerio for parsing
  const $ = cheerio.load(response.data);

  // Find the aside element
  const aside = $("aside");

  // Object to store all the extracted information
  let info = {};

  // Iterate through each section in the aside
  aside.find("aside > section").each((_, sectionBody) => {
    // Extract the section title
    const sectionTitle = $(sectionBody).find("h2").text();

    // Object to store information for this section
    let infoSection = {};

    // Iterate through each div in the section
    $(sectionBody)
      .find("div")
      .each((_, row) => {
        let key = "";
        let value = "";

        // Extract the key (usually in an h3 tag)
        $(row)
          .find("h3")
          .each((_, el) => {
            key = $(el).text();
          });
        // Extract the value (usually in a div tag)
        $(row)
          .find("div")
          .each((_, el) => {
            value = $(el).text();
          });

        // If both key and value are present, add to the infoSection
        key && value && (infoSection[key] = value);
      });

    // Handle duplicate sections by creating an array
    if (info[sectionTitle]) {
      // If the section already exists, create an array with both the existing and new data
      info[sectionTitle] = [info[sectionTitle], infoSection];
    } else {
      // If it's a new section, add it to the info object
      info[sectionTitle] = infoSection;
    }
  });

  // Return the collected information
  return info;
}
