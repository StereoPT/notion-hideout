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
