import {
  useGetmyListIdQuery,
  useRemoveItemFromMyListMutation,
} from "../stores/myListApi";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { getTmdbImage } from "../services/tmdb";

const MyListId = () => {
  const { id } = useParams();
  const getMylistItem = useGetmyListIdQuery(id);
  const [removeItemFromMyList] = useRemoveItemFromMyListMutation();

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
          {row?.type === `person` ? (
            <Link to={`/person/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : row?.type === `collection` ? (
            <Link to={`/collection/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : (
            <Link to={`/media/${row?.data?.id}?media_type=${row?.type}`}>
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
      selector: (row: any) => <div className="capitalize">{row?.type}</div>,
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
          onClick={() =>
            removeItemFromMyList({
              id: id,
              itemId: row?.id,
              itemType: row?.type,
            })
          }
        >
          <MdDelete size={20} className="text-red-600 hover:text-red-500" />
        </button>
      ),
    },
  ] as any;

  return (
    <div>
      <div className="wrapper py-8 space-y-4">
        <div className="font-semibold text-xl">
          {getMylistItem?.data?.title}
        </div>
        <div className="text-gray-500 italic">
          {getMylistItem?.data?.description}
        </div>

        <DataTable columns={columns} data={getMylistItem.data?.items} />
      </div>
    </div>
  );
};

export default MyListId;
