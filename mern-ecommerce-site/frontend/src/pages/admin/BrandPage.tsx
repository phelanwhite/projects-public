import Loader from "@/components/loader";
import useBrandStore from "@/stores/brand-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { useMemo } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const BrandPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: `1`,
  });
  const handleSearchParamsChange = (name: string, value: string) => {
    setSearchParams(
      (prev) => {
        prev.set(name, value);
        return prev;
      },
      { replace: true }
    );
  };

  const { brand, fetchBrand, removeBrandById } = useBrandStore();
  const getBrands = useQuery({
    queryKey: ["brands", searchParams.toString()],
    queryFn: async () => {
      const result = await fetchBrand(searchParams.toString());
      return result;
    },
  });
  const removeBrandByIdResult = useMutation({
    mutationKey: ["brands"],
    mutationFn: async (id) => {
      const result = await removeBrandById(id);
      return result;
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const columns: TableProps["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (item) => <Link to={`/`}>{item}</Link>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (item) => (
        <div className="aspect-video w-10">
          <img src={item} loading="lazy" alt="" />
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (item) => <div className="line-clamp-2">{item}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <div className="line-clamp-2 space-x-2">
          {/* {JSON.stringify(item)} */}
          <Link to={`update/${item?._id}`}>
            <Button size="small" type="primary">
              <MdEdit />
            </Button>
          </Link>
          <Button
            onClick={() => removeBrandByIdResult.mutate(item?._id)}
            size="small"
            danger
            type="primary"
          >
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];
  const customBrand = useMemo(() => {
    return brand.map((item) => ({ ...item, key: item?._id }));
  }, [brand]);

  if (getBrands.isLoading || removeBrandByIdResult.isPending) return <Loader />;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Link to={`create`}>
          <Button type="primary">
            <MdAdd />
            Create
          </Button>
        </Link>
      </div>
      <Table
        dataSource={customBrand}
        columns={columns}
        pagination={{
          total: getBrands.data?.total_results,
          pageSize: getBrands.data?.limit,
          current: searchParams.get("page") as unknown as number | 1,
          onChange: (page) => {
            handleSearchParamsChange("page", page.toString());
          },
        }}
      />
    </div>
  );
};

export default BrandPage;
