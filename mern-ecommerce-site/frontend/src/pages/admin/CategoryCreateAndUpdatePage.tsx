import Loader from "@/components/loader";
import useCategoryStore from "@/stores/category-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryCreateAndUpdatePage = () => {
  const { id } = useParams();
  const { addCategory, updateCategoryById, fetchCategoryById } =
    useCategoryStore();

  const getCategoryByIdResult = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      try {
        const result = window.location.pathname.includes("/update")
          ? await fetchCategoryById(id)
          : null;
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const addAndUpdate = useMutation({
    mutationKey: ["addAndUpdate"],
    mutationFn: async (data: any) => {
      let result;
      if (window.location.pathname.includes("/create")) {
        result = await addCategory(data);
      } else {
        result = await updateCategoryById(id as any, data);
      }
      return result;
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form
    const fromData = new FormData();
    Object.entries(formValue).forEach((item) =>
      fromData.append(item[0], item[1])
    );
    file && fromData.append(`file`, file);
    addAndUpdate.mutate(fromData);
  };

  useEffect(() => {
    if (window.location.pathname.includes("/update")) {
      setFormValue({ ...formValue, ...getCategoryByIdResult.data });
    }
  }, [getCategoryByIdResult.data]);

  if (addAndUpdate.isPending || getCategoryByIdResult.isLoading)
    return <Loader />;

  return (
    <div className="bg-white rounded-lg p-4">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <label
          htmlFor="file"
          className="max-w-[200px] w-full cursor-pointer border"
        >
          <input
            className="hidden"
            type="file"
            id="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
          <div className="rounded overflow-hidden aspect-video">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formValue?.thumbnail
                  ? formValue?.thumbnail
                  : "https://hiephoithuongmainhatviet.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg"
              }
              alt=""
            />
          </div>
        </label>
        <Input
          required
          name="title"
          value={formValue?.title || ""}
          onChange={handleInputChange}
          placeholder="Title"
        />

        <TextArea
          name="description"
          value={formValue?.description || ""}
          onChange={handleInputChange}
          placeholder="Description"
          rows={5}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CategoryCreateAndUpdatePage;
