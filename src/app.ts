import axios from "axios";
import * as cheerio from "cheerio";

const bannerMessage: string = "[Notion-Hideout]";
const teatroURL: string = "https://www.teatrojlsilva.pt/";

console.log(bannerMessage);

const { status, data: pageHTML } = await axios.get(teatroURL);

if (status !== 200) {
  console.error("Failed to Fetch Page!");
}

const $ = cheerio.load(pageHTML);
const events = $("#event-list a");

console.log(` - Found ${events.length} Events`);

for (const elem of events) {
  const event = $(elem);

  const { id, href } = event.attr();
  const category = event.find(".entry-category").text().trim();
  const title = event.find(".entry-title").text().trim();
  const place = event.find(".entry-edificio").text().trim();
  const date = {
    weekday: event.find(".event-date span:nth-child(1)").text().trim(),
    day: event.find(".event-date span:nth-child(2)").text().trim(),
    month: event.find(".event-date span:nth-child(3)").text().trim(),
  };

  const eventObject = {
    id,
    href,
    category,
    title,
    place,
    date,
  };

  console.log(eventObject);
}
