import { DateTime } from "luxon";

const formattedDate = (date) => {
  return DateTime.fromJSDate(date).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default formattedDate;
