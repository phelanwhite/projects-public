import useAddressStore from "@/stores/address-store";
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "@/components/loader";

const AddressItem = ({ data }: { data: any }) => {
  const { removeAddress } = useAddressStore();
  const removeResult = useMutation({
    mutationKey: ["addresses", "remove", data?._id],
    mutationFn: async (id) => {
      const result = await removeAddress(id);
      return result;
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (removeResult.isPending) return <Loader />;
  return (
    <div className="bg-white rounded-lg p-4 flex items-start gap-4">
      <div className="space-y-1 flex-1">
        <div className="font-semibold">{data?.name}</div>
        <div>
          <span>Địa chỉ: </span>
          <span>
            {data?.address +
              ", " +
              data?.wards +
              ", " +
              data?.district +
              ", " +
              data?.provinces}
          </span>
        </div>
        <div>
          <span>Điện thoại: </span>
          <span>{data?.phone}</span>
        </div>
        <div>
          <span>Address type: </span>
          <span>{data?.address_type}</span>
        </div>
        {data?.isDefault && (
          <div className="text-red-500 font-semibold">Address default</div>
        )}
      </div>
      <div className="relative group">
        <div className="cursor-pointer">
          <HiOutlineDotsVertical />
        </div>
        <div className="hidden group-hover:block rounded shadow absolute right-0 top-0 bg-white">
          <Link
            to={`update/${data?._id}`}
            className="cursor-pointer flex items-center gap-1 hover:bg-stone-100 p-2 px-4"
          >
            <MdEdit />
            <span className="text-xs">Update</span>
          </Link>
          <div
            onClick={() => removeResult.mutate(data?._id)}
            className="cursor-pointer flex items-center gap-1 hover:bg-stone-100 p-2 px-4"
          >
            <MdDelete />
            <span className="text-xs">Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressPage = () => {
  const { address, fetchAddresses } = useAddressStore();
  const getAddressResult = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const result = await fetchAddresses();
      return result;
    },
  });
  if (getAddressResult.isLoading) return <Loader />;
  return (
    <div className="space-y-4">
      <Link to={`create`}>
        <Button block type="primary">
          <IoIosAdd />
          Add new address
        </Button>
      </Link>
      {address.map((item) => (
        <AddressItem data={item} key={item?._id} />
      ))}
    </div>
  );
};

export default AddressPage;
