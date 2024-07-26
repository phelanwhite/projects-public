import Loader from "@/components/loader";
import useAddressStore from "@/stores/address-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddressCreateAndUpdatePage = () => {
  const { id } = useParams();
  const { addAddress, updateAddress, fetchAddressesById } = useAddressStore();

  const getAddressById = useQuery({
    queryKey: ["address", id],
    queryFn: async () => {
      try {
        const result = window.location.pathname.includes("/update")
          ? await fetchAddressesById(id)
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
    mutationFn: async () => {
      let result;
      if (window.location.pathname.includes("/create")) {
        result = await addAddress(formValue);
      } else {
        result = await updateAddress(id as any, formValue);
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
    name: "",
    company: "",
    phone: "",
    country: "",
    provinces: "",
    district: "",
    wards: "",
    address: "",
    address_type: "House / Apartment",
    isDefault: false,
  });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form
    addAndUpdate.mutate();
  };

  useEffect(() => {
    if (window.location.pathname.includes("/update")) {
      setFormValue({ ...formValue, ...getAddressById.data });
    }
  }, [getAddressById.data]);

  const [provinceCode, setProvinceCode] = useState<string | null>(null);
  const [districtCode, setDistrictCode] = useState<string | null>(null);

  const provinces = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const url = `https://esgoo.net/api-tinhthanh/1/0.htm`;
      const resp = await axios.get(url);
      return resp.data;
    },
  });
  const districts = useQuery({
    queryKey: ["districts", provinceCode],
    queryFn: async () => {
      const url = `https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`;
      return provinceCode && (await axios.get(url)).data;
    },
  });
  const wards = useQuery({
    queryKey: ["wards", districtCode],
    queryFn: async () => {
      const url = `https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`;
      return districtCode && (await axios.get(url)).data;
    },
  });

  const provincesCustom = useMemo(() => {
    const data =
      provinces.data?.data?.map((province: any) => ({
        value: province?.full_name,
        label: province?.name,
        id: province?.id,
      })) || [];

    data?.unshift({ label: `Select Province/City`, value: `` });
    return data;
  }, [provinces]);
  const districtsCustom = useMemo(() => {
    const data =
      districts.data?.data?.map((province: any) => ({
        value: province?.full_name,
        label: province?.name,
        id: province?.id,
      })) || [];

    data?.unshift({ label: `Select District`, value: `` });
    return data;
  }, [districts]);
  const wardsCustom = useMemo(() => {
    const data =
      wards.data?.data?.map((province: any) => ({
        value: province?.full_name,
        label: province?.name,
      })) || [];

    data?.unshift({ label: `Select Wards`, value: `` });
    return data;
  }, [wards]);

  if (
    provinces.isLoading ||
    districts.isLoading ||
    wards.isLoading ||
    addAndUpdate.isPending
  )
    return <Loader />;

  return (
    <div className="bg-white rounded-lg p-4">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <Input
          required
          name="name"
          value={formValue?.name || ""}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <Input
          name="company"
          value={formValue?.company || ""}
          onChange={handleInputChange}
          placeholder="Company"
        />
        <Input
          required
          name="phone"
          value={formValue?.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone number"
        />
        <Select
          showSearch
          value={formValue?.provinces}
          onChange={(e: any) => {
            setFormValue({ ...formValue, provinces: e });
            const code = provincesCustom?.find(
              (item: any) => item?.value === e
            )?.id;
            setProvinceCode(code);
            setFormValue((prev) => ({ ...prev, district: "" }));
            setFormValue((prev) => ({ ...prev, wards: "" }));
          }}
          options={provincesCustom}
        />
        <Select
          showSearch
          value={formValue?.district}
          onChange={(e) => {
            setFormValue({ ...formValue, district: e });
            const code = districtsCustom?.find(
              (item: any) => item?.value === e
            )?.id;
            setDistrictCode(code);
          }}
          options={districtsCustom}
        />
        <Select
          showSearch
          value={formValue?.wards}
          onChange={(e) => {
            setFormValue({ ...formValue, wards: e });
          }}
          options={wardsCustom}
        />
        <TextArea
          required
          name="address"
          value={formValue?.address || ""}
          onChange={handleInputChange}
          placeholder="Address"
          rows={5}
        />
        <Radio.Group
          name="address_type"
          value={formValue.address_type}
          onChange={(e) =>
            setFormValue({ ...formValue, address_type: e.target.value })
          }
        >
          <Radio value="House / Apartment">House / Apartment</Radio>
          <Radio value="Agency / Company">Agency / Company</Radio>
        </Radio.Group>
        <div className="space-x-2">
          <Checkbox
            checked={formValue.isDefault}
            value={formValue.isDefault}
            onChange={(e) =>
              setFormValue({ ...formValue, isDefault: !e.target.value })
            }
          />
          <span>Set default address</span>
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddressCreateAndUpdatePage;
