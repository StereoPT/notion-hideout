import { EventPageType } from "../../types/event.js";
import createPage from "../createPage.js";

const createEventPage = (databaseID: string, event: EventPageType) => {
  return createPage(databaseID, {
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
  });
};

export default createEventPage;
