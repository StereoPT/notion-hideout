import * as cheerio from "cheerio";
import { EventType } from "../types/event.js";

export const scrapeTeatro = (html: string): EventType[] => {
  const $ = cheerio.load(html);
  const events = $("#event-list a");

  console.log(` - Found ${events.length} Events`);

  const scrapeEvent = (index: number, elem: cheerio.Element): EventType => {
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

    return {
      id,
      href,
      category,
      title,
      place,
      date,
    };
  };

  return events.map(scrapeEvent).toArray();
};
