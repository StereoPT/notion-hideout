import * as dotenv from "dotenv";
dotenv.config();

import { Client } from "@notionhq/client";
import createEventPage from "./utils/createEventPage.js";

const notion = new Client({ auth: process.env.NOTION_KEY });

export { createEventPage };
export default notion;
