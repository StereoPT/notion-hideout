import axios from "axios";

export const fetchPage = async (url: string) => {
  try {
    const { status, data: pageHTML } = await axios.get(url);

    if (status !== 200) {
      console.error("Failed to Fetch Page!");
    }

    return pageHTML;
  } catch (e) {
    console.error(e);
  }
};
