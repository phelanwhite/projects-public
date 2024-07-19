import DataTable from "react-data-table-component";
import {
  useGetFavoriteQuery,
  useRemoveFavoriteMutation,
} from "../stores/favoriteApi";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { getTmdbImage } from "../services/tmdb";

const MyFavorite = () => {
  const getFavorites = useGetFavoriteQuery(``);
  const [removeFavorite] = useRemoveFavoriteMutation();

  const columns = [
    {
      name: "Stt",
      selector: (row: any, index: number) => index + 1,
      width: `100px`,
    },
    {
      name: "Title/Name",
      selector: (row: any) => (
        <div className="font-semibold">
          {row?.favouriteType === `person` ? (
            <Link to={`/person/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : row?.favouriteType === `collection` ? (
            <Link to={`/collection/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : (
            <Link
              to={`/media/${row?.data?.id}?media_type=${row?.favouriteType}`}
            >
              {row.data?.title || row.data?.name}
            </Link>
          )}
        </div>
      ),
    },
    {
      name: "Thumbnail/Avatar",
      selector: (row: any) => (
        <div className="w-10 py-1">
          <img
            src={getTmdbImage(
              row?.data?.poster_path || row?.data?.profile_path
            )}
            loading="lazy"
            alt=""
          />
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row: any) => (
        <div className="capitalize">{row?.favouriteType}</div>
      ),
    },
    {
      name: "Genres/Department",
      selector: (row: any) =>
        row?.data?.known_for_department
          ? row?.data?.known_for_department
          : row?.data?.genres?.map((item: any) => item?.name)?.join(", "),
    },
    {
      name: "Release date/Birthday",
      selector: (row: any) =>
        (row?.data?.release_date ||
          row?.data?.first_air_date ||
          row?.data?.birthday) &&
        new Date(
          row?.data?.release_date ||
            row?.data?.first_air_date ||
            row?.data?.birthday
        ).getFullYear(),
    },
    {
      name: "Action",
      selector: (row: any) => (
        <button
          className="btn btn-danger"
          onClick={() => removeFavorite(row?._id)}
        >
          <MdDelete size={20} className="text-red-600 hover:text-red-500" />
        </button>
      ),
    },
  ] as any;

  return (
    <div>
      <div className="wrapper my-10">
        <DataTable columns={columns} data={getFavorites.data} />
      </div>
    </div>
  );
};

export default MyFavorite;
