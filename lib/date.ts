import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function formatMonthYear(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function getDateFromNow(dateString: string | Date) {
  return dayjs(dateString).fromNow();
}
