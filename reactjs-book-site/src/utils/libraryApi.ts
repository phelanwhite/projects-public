import imgNotFound from "../assets/cover_not_found.jpg";

export const getBookImage = (url: string) => {
  return url ? `https://covers.openlibrary.org/b/id/${url}-L.jpg` : imgNotFound;
};
