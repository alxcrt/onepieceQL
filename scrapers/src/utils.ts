import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to save a JSON file
export const saveJSON = (data: any, filename: string) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

// Utility function remove bracketed footnotes
export const removeFootnotes = (text: string) => {
  return text.replace(/\[.*?\]/g, "");
};

// Function to extract information from the aside section of a webpage
export async function getInfoFromAside(url: string) {
  // Fetch the webpage content
  const response = await axios.get(url);
  // Load the HTML content into cheerio for parsing
  const $ = cheerio.load(response.data);

  // Object to store all the extracted information
  let info = {};

  // #mw-content-text > div > p:nth-child(3)
  // Find the description of the character/fruit
  // const description = aside.find("p").text();
  $("#mw-content-text > div > p")
    .filter((_, el) => {
      return $(el).text().trim().length > 0;
    })
    .first()
    .each((_, el) => {
      const text = $(el).text().trim();
      info["description"] = removeFootnotes(text);
    });

  // Find the aside element
  const aside = $("aside");

  // Get the image URL
  const img = aside.find("img").attr("src");
  // remove all after .pnm
  img && (info["image"] = img.split(".png")[0] + ".png");

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
        let values: string[] | string = [];

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
            // Find ul and li elements
            let list = $(el).find("ul li").toArray();

            // If there are list elements, extract the text content
            if (list.length > 0) {
              // remove footnotes
              values = list.map((li) => removeFootnotes($(li).text()));
              values = values.filter((v: string) => v.trim().length > 0);
              return;
            }

            // Extract the text content
            let value = $(el)
              .find("br")
              .replaceWith("\n")
              .end()
              .find("hr")
              .replaceWith("\n")
              .end()
              .text();

            // Remove bracketed footnotes
            value = removeFootnotes(value);

            // Check if the value is a list
            if (value.split("\n").length > 1) {
              // Split multiple values into an array
              values = value.split("\n").map((v: string) => v.trim());
              values = values.filter((v: string) => v.length > 0);
            } else {
              values = value;
            }
          });

        // remove : from the key
        key = key.replace(":", "");

        // If both key and value are present, add to the infoSection
        key && values && (infoSection[key] = values);
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
