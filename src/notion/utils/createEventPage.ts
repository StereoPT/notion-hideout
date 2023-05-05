import notion from "../index.js";

type EventType = {
  name: string;
  date: string;
  place: string;
  category: string;
  link: string;
};

const createEventPage = async (databaseID: string, event: EventType) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseID },
      properties: {
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

    console.log("Success! Entry Added!");
  } catch (error) {
    console.error(error);
  }
};

export default createEventPage;
