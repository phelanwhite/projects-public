import Loader from "@/components/loader";
import useCategoryStore from "@/stores/category-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { useMemo } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryPage = () => {
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

  const { category, fetchCategory, removeCategoryById } = useCategoryStore();
  const getCategories = useQuery({
    queryKey: ["category", searchParams.toString()],
    queryFn: async () => {
      const result = await fetchCategory(searchParams.toString());
      return result;
    },
  });
  const removeBrandByIdResult = useMutation({
    mutationKey: ["category"],
    mutationFn: async (id) => {
      const result = await removeCategoryById(id);
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
    return category.map((item) => ({ ...item, key: item?._id }));
  }, [category]);

  if (getCategories.isLoading || removeBrandByIdResult.isPending)
    return <Loader />;
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
          total: getCategories.data?.total_results,
          pageSize: getCategories.data?.limit,
          current: searchParams.get("page") as unknown as number | 1,
          onChange: (page) => {
            handleSearchParamsChange("page", page.toString());
          },
        }}
      />
    </div>
  );
};

export default CategoryPage;
