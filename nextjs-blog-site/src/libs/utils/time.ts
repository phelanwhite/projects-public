export const getDateTimeToString = (date: Date) => {
  return Intl.DateTimeFormat("vn-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
