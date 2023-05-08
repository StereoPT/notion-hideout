import * as dotenv from "dotenv";
dotenv.config();

import moment from "moment";

import { Client } from "@notionhq/client";
import createEventPage from "./utils/createEventPage.js";
import { EventType } from "../types/event.js";
import queryEventDatabase from "./utils/queryEventDatabase.js";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseID: string = process.env.NOTION_DATABASE_ID;

export const handleEvents = async (events: EventType[]) => {
  const eventPromises = [];
  const dbEventIDs = await queryEventDatabase(databaseID);

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
  console.log(` [+] ${eventPromises.length} Events Added!`);
};

export { createEventPage };
export default notion;
