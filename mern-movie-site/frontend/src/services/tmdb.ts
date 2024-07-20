import axios from "axios";
import Cookies from "js-cookie";

const tmdbToken = Cookies.get("tmdbToken");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ` + tmdbToken,
  },
};
const language = `en-US`;

export function getTmdbImage(path: string) {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
export async function getTmdbVideoTrailer(
  media_id: string,
  media_type: string
) {
  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/videos`;
  return await (
    await axios.get(url, options)
  ).data;
}

// home
export async function trending_allApi() {
  const url = `https://api.themoviedb.org/3/trending/all/day?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function trending_movieApi() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function trending_personApi() {
  const url = `https://api.themoviedb.org/3/trending/person/day?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function trending_tvApi() {
  const url = `https://api.themoviedb.org/3/trending/tv/day?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function trending_movie_top_ratedApi() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function trending_tv_top_ratedApi() {
  const url = `https://api.themoviedb.org/3/tv/top_rated?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// media id
export async function media_idApi(media_id: string, media_type: string) {
  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function media_similarApi(media_id: string, media_type: string) {
  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/similar?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function media_recommendationsApi(
  media_id: string,
  media_type: string
) {
  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/recommendations?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function media_creditsApi(media_id: string, media_type: string) {
  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/credits?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// person
export async function person_idApi(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function person_idMediaApi(person_id: string, media_type: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}/${media_type}?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// movies
export async function moviesApi({
  paramster,
  type,
}: {
  paramster?: string;
  type?: string;
}) {
  const url = `https://api.themoviedb.org/3/movie/${type}?${paramster}&language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// tv series
export async function tvSeriesApi({
  paramster,
  type,
}: {
  paramster?: string;
  type?: string;
}) {
  const url = `https://api.themoviedb.org/3/tv/${type}?${paramster}&language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// collection
export async function collection_idApi(collection_id: string) {
  const url = `https://api.themoviedb.org/3/collection/${collection_id}?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function collection_idImagesApi(collection_id: string) {
  const url = `https://api.themoviedb.org/3/collection/${collection_id}/images?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
export async function collection_idTranslationsApi(collection_id: string) {
  const url = `https://api.themoviedb.org/3/collection/${collection_id}/translations?language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}

// search
export async function searchApi({
  paramster,
  type,
}: {
  paramster?: string;
  type?: string;
}) {
  const url = `https://api.themoviedb.org/3/search/${type}?${paramster}&language=${language}`;
  return await (
    await axios.get(url, options)
  ).data;
}
