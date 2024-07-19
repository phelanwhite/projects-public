import { FaHome, FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";

export const menuHeaderLink = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <MdLocalMovies />,
  },
  {
    title: "TV Series",
    path: "/tv-series",
    icon: <RiMovie2Fill />,
  },
  {
    title: "Search",
    path: "/search",
    icon: <FaSearch />,
  },
];

export const person_mediaTypeList = [
  {
    title: `Movie`,
    value: `movie`,
  },

  {
    title: `Tv Series`,
    value: `tv`,
  },
];

export const movie_typeList = [
  {
    title: `Now playing`,
    value: `now_playing`,
  },
  {
    title: `Popular`,
    value: `popular`,
  },
  {
    title: `Top rated`,
    value: `top_rated`,
  },
  {
    title: `Upcoming`,
    value: `upcoming`,
  },
];

export const tvSeries_typeList = [
  {
    title: `Airing Today`,
    value: `airing_today`,
  },
  {
    title: `On The Air`,
    value: `on_the_air`,
  },
  {
    title: `Popular`,
    value: `popular`,
  },
  {
    title: `Top Rated`,
    value: `top_rated`,
  },
];

export const search_typeList = [
  {
    title: `Multi`,
    value: `multi`,
  },
  {
    title: `Movies`,
    value: `movie`,
  },
  {
    title: `TV Series`,
    value: `tv`,
  },
  {
    title: `People`,
    value: `person`,
  },
  {
    title: `Collection`,
    value: `collection`,
  },
  {
    title: `Company`,
    value: `company`,
  },
  // {
  //   title: `Keyword`,
  //   value: `keyword`,
  // },
];
