import notion from "./index.js";

const createPage = (databaseID: string, pageProperties: any) => {
  return notion.pages.create({
    parent: { database_id: databaseID },
    properties: pageProperties,
  });
};

export default createPage;
