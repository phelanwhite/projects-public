export const currencyChange = ({
  location,
  value,
}: {
  location?: string;
  value: string | number;
}) => {
  if (!location) location = "vn-VN";
  return Intl.NumberFormat(location, {
    style: "currency",
    currency: "VND",
  }).format(Number(value));
};
