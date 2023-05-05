import fs from "fs/promises";
import moment from "moment";

import * as dotenv from "dotenv";
dotenv.config();

import { fetchPage } from "./utils/fetchPage.js";
import { scrapeTeatro } from "./scrapers/teatro.js";
import { createEventPage } from "./notion/index.js";

const bannerMessage: string = "[Notion-Hideout]";
const teatroURL: string = "https://www.teatrojlsilva.pt/";
const databaseID: string = process.env.NOTION_DATABASE_ID;

console.log(bannerMessage);

const teatroHTML = await fetchPage(teatroURL);
const scrapedEvents = scrapeTeatro(teatroHTML);

for (const event of scrapedEvents) {
  if (!event.title || !event.date || !event.place || !event.category || !event.href) continue;

  const date = moment();
  date.day(event.date.day);
  date.month(event.date.month);

  createEventPage(databaseID, {
    name: event.title,
    date: date.toISOString(true),
    place: event.place,
    category: event.category,
    link: event.href,
  });
}

// This Writes the Events to a JSON File:
// await fs.writeFile("events.json", JSON.stringify(scrapedEvents, null, 2));
