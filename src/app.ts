import { fetchPage } from "./utils/fetchPage.js";
import { scrapeTeatro } from "./scrapers/teatro.js";
import { handleEvents } from "./notion/index.js";

const bannerMessage: string = "[Notion-Hideout]";
const teatroURL: string = "https://www.teatrojlsilva.pt/";

console.log(bannerMessage);

const teatroHTML = await fetchPage(teatroURL);
const scrapedEvents = scrapeTeatro(teatroHTML);

handleEvents(scrapedEvents);
