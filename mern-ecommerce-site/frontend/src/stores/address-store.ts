import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";

type State = {
  address: Array<any>;
};
type Action = {
  addAddress: (data: any) => any;
  updateAddress: (id: any, data: any) => any;
  removeAddress: (id: any) => any;
  fetchAddresses: () => any;
  fetchAddressesById: (id: any) => any;
};

const useAddressStore = create<State & Action>((set) => ({
  address: [],
  addAddress: async (data) => {
    const url = `address/`;
    const resp = await axiosClient.post(url, data);
    set((state) => ({
      ...state,
      address: [...state.address, resp?.result as unknown as any],
    }));
    return resp;
  },
  updateAddress: async (id, data) => {
    const url = `address/${id}`;
    const resp = await axiosClient.put(url, data);
    set((state) => ({
      ...state,
      address: [...state.address, resp?.result as unknown as any],
    }));
    return resp;
  },
  removeAddress: async (id) => {
    const url = `address/${id}`;
    const resp = await axiosClient.delete(url);
    set((state) => ({
      address: state.address.filter((item) => item._id !== id),
    }));
    return resp;
  },
  fetchAddresses: async () => {
    const url = `address/`;
    const resp = await axiosClient.get(url);
    set((state) => ({
      ...state,
      address: resp?.result as unknown as any,
    }));
  },
  fetchAddressesById: async (id) => {
    const url = `address/${id}`;
    const resp = await axiosClient.get(url);
    return resp?.result as unknown as any;
  },
}));

export default useAddressStore;
