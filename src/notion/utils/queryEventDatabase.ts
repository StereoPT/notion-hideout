import moment from "moment";
import notion from "../index.js";

const queryEventDatabase = async (databaseID: string) => {
  const dbEventIDs = [];

  const { results: dbEvents } = await notion.databases.query({
    database_id: databaseID,
  });

  if (dbEvents.length > 0) {
    for (const event of dbEvents) {
      const { id, properties } = JSON.parse(JSON.stringify(event));

      const shouldRemove = moment().isAfter(moment(properties.Date.date.start));

      if (shouldRemove) {
        console.log(`   [-] Removed: ${properties.Name.title[0].plain_text}`);
        await notion.pages.update({
          page_id: id,
          archived: true,
        });
        continue;
      }

      dbEventIDs.push(properties.id.rich_text[0].plain_text);
    }
  }

  return dbEventIDs;
};

export default queryEventDatabase;
