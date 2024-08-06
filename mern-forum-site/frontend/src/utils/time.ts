export const changeTimeToString = (date: any) => {
  return Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
  }).format(date);
};
