import Loader from "@/components/loader";
import TextEditor from "@/components/TextEditor";
import useBrandStore from "@/stores/brand-store";
import useCategoryStore from "@/stores/category-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import useProductStore from "@/stores/product-store";

const ProductCreateAndUpdatePage = () => {
  const { id } = useParams();
  const { brand, fetchBrand } = useBrandStore();
  const { category, fetchCategory } = useCategoryStore();
  const { addProduct, updateProductById, fetchProductById } = useProductStore();
  const getProductByIdResult = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const result = window.location.pathname.includes("/update")
          ? await fetchProductById(id)
          : null;
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const getBrandAndCategory = useQuery({
    queryKey: ["brandAndCategory"],
    queryFn: async () => {
      try {
        const brandResult = await fetchBrand(``);
        const categoryResult = await fetchCategory(``);
        return { brand: brandResult, category: categoryResult };
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
        result = await addProduct(data);
      } else {
        result = await updateProductById(id as any, data);
      }
      return result;
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);

      // toast.error(error.stack);
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    description: "",
    original_price: 0,
    quantity: 0,
    category: "",
    banrd: "",
    discount_rate: 0,

    options: null,
    highlight: null,
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
      fromData.append(item[0], item[1] as string)
    );
    file && fromData.append(`file`, file);
    addAndUpdate.mutate(fromData);
  };

  useEffect(() => {
    if (window.location.pathname.includes("/update")) {
      setFormValue({ ...formValue, ...getProductByIdResult.data });
    }
  }, [getProductByIdResult.data]);

  const brandCustom = useMemo(() => {
    const data = brand?.map((item: any) => ({
      label: item?.title,
      value: item?._id,
    }));

    return data;
  }, [brand]);

  const categoryCustom = useMemo(() => {
    const data = category?.map((item: any) => ({
      label: item?.title,
      value: item?._id,
    }));

    return data;
  }, [category]);

  if (
    addAndUpdate.isPending ||
    getProductByIdResult.isLoading ||
    getBrandAndCategory.isLoading
  )
    return <Loader />;

  return (
    <div className="bg-white rounded-lg p-4">
      {/* <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        
        <Input
          required
          name="title"
          value={formValue?.title || ""}
          onChange={handleInputChange}
          placeholder="Title"
        />

        <InputNumber
          className="w-full"
          name="price"
          value={formValue?.price || 0}
          min={0}
          onChange={(value) =>
            setFormValue({ ...formValue, price: value as number })
          }
          placeholder="Price"
        />
      </form> */}

      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item>
          <label
            htmlFor="file"
            className="max-w-[200px] w-full cursor-pointer border rounded overflow-hidden aspect-video block"
          >
            <input
              className="hidden"
              type="file"
              id="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] as File)}
            />
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
          </label>
        </Form.Item>

        <Form.Item label="Title">
          <Input
            className="w-full"
            name="title"
            value={formValue?.title || ""}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Price">
          <InputNumber
            className="w-full"
            name="original_price"
            value={formValue?.original_price || 0}
            min={0}
            onChange={(value) =>
              setFormValue({ ...formValue, original_price: value as number })
            }
          />
        </Form.Item>

        <Form.Item label="Discount">
          <InputNumber
            className="w-full"
            name="discount_rate"
            value={formValue?.discount_rate || 0}
            min={0}
            onChange={(value) =>
              setFormValue({ ...formValue, discount_rate: value as number })
            }
          />
        </Form.Item>

        <Form.Item label="Quantity">
          <InputNumber
            className="w-full"
            name="quantity"
            value={formValue?.quantity || 0}
            min={0}
            onChange={(value) =>
              setFormValue({ ...formValue, quantity: value as number })
            }
          />
        </Form.Item>

        <Form.Item label="Select Category">
          <Select
            showSearch
            value={formValue?.category}
            onChange={(e) => {
              setFormValue({ ...formValue, category: e });
            }}
            options={categoryCustom}
          />
        </Form.Item>

        <Form.Item label="Select Brand">
          <Select
            showSearch
            value={formValue?.banrd}
            onChange={(e) => {
              setFormValue({ ...formValue, banrd: e });
            }}
            options={brandCustom}
          />
        </Form.Item>

        <Form.Item label="Description">
          <TextEditor
            placeholder="Write..."
            value={formValue.description || ""}
            onChange={(e) => setFormValue({ ...formValue, description: e })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreateAndUpdatePage;
