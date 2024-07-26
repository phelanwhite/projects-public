import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";

type State = {
  brand: Array<any>;
};
type Action = {
  addBrand: (data: any) => any;
  updateBrandById: (id: any, data: any) => any;
  removeBrandById: (id: any) => any;
  fetchBrand: (params: any) => any;
  fetchBrandById: (id: any) => any;
};

const useBrandStore = create<State & Action>((set) => ({
  brand: [],
  addBrand: async (data) => {
    const url = `brand/`;

    const resp = await axiosClient.post(url, data);
    set((state) => ({
      ...state,
      brand: [...state.brand, resp?.result as unknown as any],
    }));
    return resp;
  },
  updateBrandById: async (id, data) => {
    const url = `brand/${id}`;
    const resp = await axiosClient.put(url, data);
    set((state) => ({
      ...state,
      brand: state.brand?.map((item) =>
        item._id === id ? { ...item, ...(resp.result as unknown as any) } : item
      ),
    }));
    return resp;
  },
  removeBrandById: async (id) => {
    const url = `brand/${id}`;
    const resp = await axiosClient.delete(url);
    set((state) => ({
      brand: state.brand.filter((item) => item._id !== id),
    }));
    return resp;
  },
  fetchBrand: async (params) => {
    const url = `brand/`;
    const resp = await axiosClient.get(url + "?" + params);
    set((state) => ({
      ...state,
      brand: resp?.result?.data as unknown as any,
    }));
    return resp?.result as unknown as any;
  },
  fetchBrandById: async (id) => {
    const url = `brand/${id}`;
    const resp = await axiosClient.get(url);
    return resp?.result as unknown as any;
  },
}));

export default useBrandStore;
