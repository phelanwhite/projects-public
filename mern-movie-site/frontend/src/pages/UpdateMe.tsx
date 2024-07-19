import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetMeQuery, useUpdateMeMutation } from "../stores/authApi ";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../stores/authSlice";
import Loader from "../components/loader";

const UpdateMe = () => {
  const dispatch = useDispatch();
  const getMe = useGetMeQuery(``);
  const [updateMe, updateMeResult] = useUpdateMeMutation();
  const [formValue, setFormValue] = useState({
    avatar: "",
    name: "",
    phone: "",
    address: "",
    website: "",
    content: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData();
    Object.entries(formValue).forEach((item) => {
      fromData.append(item[0], item[1]);
    });
    if (file) {
      fromData.append("file", file);
    }

    updateMe(fromData);
  };
  useEffect(() => {
    setFormValue(getMe.data);
  }, [getMe]);
  useEffect(() => {
    if (updateMeResult.isSuccess) {
      //   console.log(updateMeResult);

      dispatch(setCurrentUser(updateMeResult.data));
    }
  }, [updateMeResult, dispatch]);
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);
  if (updateMeResult.isLoading) return <Loader />;
  return (
    <div className="wrapper my-10">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <label htmlFor="file">
          <div className="w-48 h-48 rounded-full overflow-hidden mx-auto cursor-pointer">
            <img
              src={preview ? (preview as string) : formValue?.avatar}
              loading="lazy"
              alt=""
            />
          </div>
          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
        </label>
        <input
          placeholder="Name"
          name="name"
          value={formValue?.name || ""}
          onChange={handleChange}
          type="text"
          required
          className="input"
        />
        <input
          placeholder="Phone"
          name="phone"
          value={formValue?.phone || ""}
          onChange={handleChange}
          type="text"
          className="input"
        />
        <input
          placeholder="Address"
          name="address"
          value={formValue?.address || ""}
          onChange={handleChange}
          type="text"
          className="input"
        />
        <input
          placeholder="Website"
          name="website"
          value={formValue?.website || ""}
          onChange={handleChange}
          type="url"
          className="input"
        />
        <textarea
          rows={5}
          placeholder="Content"
          name="content"
          value={formValue?.content || ""}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateMe;
