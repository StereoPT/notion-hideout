export type EventType = {
  id: string;
  href: string;
  category: string;
  title: string;
  place: string;
  date: {
    weekday: string;
    day: string;
    month: string;
  };
};

export type NotionEventType = {
  id: string;
  name: string;
  date: string;
  place: string;
  category: string;
  link: string;
};
