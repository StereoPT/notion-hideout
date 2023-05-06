import { NotionEventType } from "../../types/event.js";
import notion from "../index.js";

const createEventPage = (databaseID: string, event: NotionEventType) => {
  return notion.pages.create({
    parent: { database_id: databaseID },
    properties: {
      id: {
        rich_text: [
          {
            text: {
              content: event.id,
            },
          },
        ],
      },
      Name: {
        title: [
          {
            text: {
              content: event.name,
            },
          },
        ],
      },
      Date: {
        date: {
          start: event.date,
          end: null,
        },
      },
      Place: {
        select: {
          name: event.place,
        },
      },
      Category: {
        select: {
          name: event.category,
        },
      },
      Link: {
        url: event.link,
      },
    },
  });
};

export default createEventPage;
