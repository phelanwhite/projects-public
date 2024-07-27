import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";

type State = {
  product: Array<any>;
};
type Action = {
  addProduct: (data: any) => any;
  updateProductById: (id: any, data: any) => any;
  removeProductById: (id: any) => any;
  fetchProduct: (params: any) => any;
  fetchProductById: (id: any) => any;
};

const useProductStore = create<State & Action>((set) => ({
  product: [],
  addProduct: async (data) => {
    const url = `product/`;

    const resp = await axiosClient.post(url, data);
    set((state) => ({
      ...state,
      product: [...state.product, resp?.result as unknown as any],
    }));
    return resp;
  },
  updateProductById: async (id, data) => {
    const url = `product/${id}`;
    const resp = await axiosClient.put(url, data);
    set((state) => ({
      ...state,
      product: state.product?.map((item) =>
        item._id === id ? { ...item, ...(resp.result as unknown as any) } : item
      ),
    }));
    return resp;
  },
  removeProductById: async (id) => {
    const url = `product/${id}`;
    const resp = await axiosClient.delete(url);
    set((state) => ({
      product: state.product.filter((item) => item._id !== id),
    }));
    return resp;
  },
  fetchProduct: async (params) => {
    const url = `product/`;
    const resp = await axiosClient.get(url + "?" + params);
    set((state) => ({
      ...state,
      product: resp?.result?.data as unknown as any,
    }));
    return resp?.result as unknown as any;
  },
  fetchProductById: async (id) => {
    const url = `product/${id}`;
    const resp = await axiosClient.get(url);
    return resp?.result as unknown as any;
  },
}));

export default useProductStore;
