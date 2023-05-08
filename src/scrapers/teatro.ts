import * as cheerio from "cheerio";
import { EventType } from "../types/event.js";

const EVENT = {
  LIST: "#event-list a",
  CATEGORY: ".entry-category",
  TITLE: ".entry-title",
  PLACE: ".entry-edificio",
  DATE: {
    WEEKDAY: ".event-date span:nth-child(1)",
    DAY: ".event-date span:nth-child(2)",
    MONTH: ".event-date span:nth-child(3)",
  },
};

export const scrapeTeatro = (html: string): EventType[] => {
  const $ = cheerio.load(html);
  const events = $(EVENT.LIST);

  console.log(` [+] Found ${events.length} Events`);

  const scrapeEvent = (index: number, elem: cheerio.Element): EventType => {
    const event = $(elem);

    const { id, href } = event.attr();
    const category = event.find(EVENT.CATEGORY).text().trim();
    const title = event.find(EVENT.TITLE).text().trim();
    const place = event.find(EVENT.PLACE).text().trim();
    const date = {
      weekday: event.find(EVENT.DATE.WEEKDAY).text().trim(),
      day: event.find(EVENT.DATE.DAY).text().trim(),
      month: event.find(EVENT.DATE.MONTH).text().trim(),
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
