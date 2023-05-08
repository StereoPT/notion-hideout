import * as dotenv from "dotenv";
dotenv.config();

import moment from "moment";

import { Client } from "@notionhq/client";
import createEventPage from "./utils/createEventPage.js";
import { EventType } from "../types/event.js";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseID: string = process.env.NOTION_DATABASE_ID;

export const handleEvents = async (events: EventType[]) => {
  const eventPromises = [];
  const dbEventIDs = [];

  const { results: dbEvents } = await notion.databases.query({
    database_id: databaseID,
  });

  if (dbEvents.length > 0) {
    for (const event of dbEvents) {
      const { id, properties } = JSON.parse(JSON.stringify(event));

      const shouldRemove = moment().isAfter(moment(properties.Date.date.start));

      if (shouldRemove) {
        await notion.pages.update({
          page_id: id,
          archived: true,
        });
        continue;
      }

      dbEventIDs.push(properties.id.rich_text[0].plain_text);
    }
  }

  for (const event of events) {
    if (!event.title || !event.date || !event.place || !event.category || !event.href) continue;
    if (dbEventIDs.includes(event.id)) continue;

    const date = moment();
    date.day(event.date.day);
    date.month(event.date.month);

    const eventPromise = createEventPage(databaseID, {
      id: event.id,
      name: event.title,
      date: date.toISOString(true),
      place: event.place,
      category: event.category,
      link: event.href,
    });

    eventPromises.push(eventPromise);
  }

  await Promise.all(eventPromises);
  console.log(" [+] Events Added!");
};

export { createEventPage };
export default notion;
