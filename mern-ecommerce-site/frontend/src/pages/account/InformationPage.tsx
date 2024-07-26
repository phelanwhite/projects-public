import Loader from "@/components/loader";
import useAuthStore from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const InformationPage = () => {
  const { getMe, updateMe } = useAuthStore();

  const getMeResult = useQuery({
    queryKey: ["getMeResult"],
    queryFn: async () => {
      const result = await getMe();
      return result;
    },
  });
  const updateMeResult = useMutation({
    mutationKey: ["updateMeResult"],
    mutationFn: async (data: any) => {
      const result = await updateMe(data);
      return result;
    },
    onSuccess(data) {
      console.log(data);

      toast.success(data?.message);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    setFormValue({ ...formValue, ...getMeResult.data });
  }, [getMeResult.data]);

  const [formValue, setFormValue] = useState({
    name: "",
    nickname: "",
    dob: new Date().toLocaleString(),
    gender: "male",
    avatar: "",

    website: "",
    phone: "",
    country: "",

    biography: "",
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
    const formData = new FormData();
    Object.entries(formValue).forEach((item) =>
      formData.append(item[0], item[1])
    );
    file && formData.append("file", file);
    updateMeResult.mutate(formData);
  };

  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const url = `https://restcountries.com/v3.1/all`;
      return (await axios.get(url)).data;
    },
  });

  const countriesCustom = useMemo(() => {
    const data = countries.data?.map((item: any) => ({
      label: item?.name?.common,
      value: item?.name?.common,
    }));

    data?.unshift({ label: `Select Country`, value: `` });
    return data;
  }, [countries]);

  if (countries.isLoading || updateMeResult.isPending) return <Loader />;

  return (
    <div className="bg-white rounded-lg p-4">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <label htmlFor="file" className="max-w-max mx-auto cursor-pointer">
          <div className="w-32 h-32 overflow-hidden rounded-full ">
            <img
              src={file ? URL.createObjectURL(file) : formValue.avatar}
              loading="lazy"
              alt=""
            />
          </div>
          <input
            className="hidden"
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
        </label>

        <Input
          required
          name="name"
          value={formValue?.name || ""}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <Input
          name="nickname"
          value={formValue?.nickname || ""}
          onChange={handleInputChange}
          placeholder="Nickname"
        />
        <DatePicker
          name="dob"
          defaultValue={dayjs(formValue?.dob || "", "YYYY/MM/DD")}
          format={"YYYY/MM/DD"}
          onChange={(date, dateString) => {
            setFormValue({ ...formValue, dob: dateString as string });
          }}
        />
        <Input
          name="phone"
          value={formValue?.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone number"
        />
        <Input
          name="website"
          value={formValue?.website || ""}
          onChange={handleInputChange}
          placeholder="Website"
        />
        <Select
          showSearch
          value={formValue?.country}
          onChange={(e) => {
            setFormValue({ ...formValue, country: e });
          }}
          options={countriesCustom}
        />
        <Radio.Group
          name="gender"
          value={formValue.gender}
          onChange={(e) =>
            setFormValue({ ...formValue, gender: e.target.value })
          }
        >
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
        <TextArea
          name="biography"
          value={formValue?.biography || ""}
          onChange={handleInputChange}
          placeholder="Biography"
          rows={5}
        />

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default InformationPage;
