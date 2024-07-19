import { ChangeEvent, memo, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useCreateMyListMutation,
  useGetmyListIdQuery,
  useUpdateMyListMutation,
} from "../stores/myListApi";
const MyListForm = ({
  handleClose,
  isEdit,
  idEdit,
}: {
  handleClose: () => void;
  isEdit?: boolean;
  idEdit?: string;
}) => {
  const getmyListId = useGetmyListIdQuery(idEdit || "");
  const [createMyList] = useCreateMyListMutation();
  const [updateMyList] = useUpdateMyListMutation();
  const [fromValue, setFormValue] = useState<any>({
    title: "",
    description: "",
  });
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...fromValue, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit && idEdit) {
      updateMyList({ id: idEdit, data: fromValue });
    } else {
      createMyList(fromValue);
    }

    setFormValue({ title: "", description: "" });
    handleClose();
  };
  useEffect(() => {
    if (isEdit && idEdit && getmyListId.data) {
      setFormValue(getmyListId.data);
    }
  }, [getmyListId, idEdit, isEdit]);

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        action=""
        method="post"
        className="relative flex flex-col gap-4 w-full max-w-[600px] mx-auto rounded-md bg-white p-4"
      >
        <div className="text-xl font-semibold">
          {isEdit ? `Update List` : `Create New List`}
        </div>
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4"
        >
          <IoIosCloseCircle size={20} />
        </button>
        <input
          placeholder="Title"
          name="title"
          value={fromValue?.title || ""}
          onChange={handleFormChange}
          type="text"
          required
          className="input"
        />
        <textarea
          placeholder="Description"
          name="description"
          rows={5}
          value={fromValue?.description || ""}
          onChange={handleFormChange}
          className="input"
        />
        <button className="btn-primary">Submit</button>
      </form>
    </>
  );
};

export default memo(MyListForm);
