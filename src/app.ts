import fs from "fs/promises";

import * as dotenv from "dotenv";
dotenv.config();

import { Client } from "@notionhq/client";

import { fetchPage } from "./utils/fetchPage.js";
import { scrapeTeatro } from "./scrapers/teatro.js";

const bannerMessage: string = "[Notion-Hideout]";
const teatroURL: string = "https://www.teatrojlsilva.pt/";
const databaseID: string = process.env.NOTION_DATABASE_ID;

console.log(bannerMessage);

const notion = new Client({ auth: process.env.NOTION_KEY });

const addItem = async (name: string, date: string) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Date: {
          date: {
            start: new Date(date).toISOString(),
            end: null,
          },
        },
      },
    });

    console.log("Success! Entry Added!");
  } catch (error) {
    console.error(error);
  }
};

const teatroHTML = await fetchPage(teatroURL);
const scrapedEvents = scrapeTeatro(teatroHTML);

for (const event of scrapedEvents) {
  addItem(event.title, "05-05-2023");
}

// This Writes the Events to a JSON File:
// await fs.writeFile("events.json", JSON.stringify(scrapedEvents, null, 2));
