import fs from "fs/promises";

import { fetchPage } from "./utils/fetchPage.js";
import { scrapeTeatro } from "./scrapers/teatro.js";

const bannerMessage: string = "[Notion-Hideout]";
const teatroURL: string = "https://www.teatrojlsilva.pt/";

console.log(bannerMessage);

const teatroHTML = await fetchPage(teatroURL);
const scrapedEvents = scrapeTeatro(teatroHTML);

// This Writes the Events to a JSON File:
// await fs.writeFile("events.json", JSON.stringify(scrapedEvents, null, 2));
