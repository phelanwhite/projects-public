import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";

type State = {
  category: Array<any>;
};
type Action = {
  addCategory: (data: any) => any;
  updateCategoryById: (id: any, data: any) => any;
  removeCategoryById: (id: any) => any;
  fetchCategory: (params: any) => any;
  fetchCategoryById: (id: any) => any;
};

const useCategoryStore = create<State & Action>((set) => ({
  category: [],
  addCategory: async (data) => {
    const url = `category/`;

    const resp = await axiosClient.post(url, data);
    set((state) => ({
      ...state,
      category: [...state.category, resp?.result as unknown as any],
    }));
    return resp;
  },
  updateCategoryById: async (id, data) => {
    const url = `category/${id}`;

    const resp = await axiosClient.put(url, data);
    set((state) => ({
      ...state,
      category: state.category?.map((item) =>
        item._id === id ? { ...item, ...(resp.result as unknown as any) } : item
      ),
    }));
    return resp;
  },
  removeCategoryById: async (id) => {
    const url = `category/${id}`;
    const resp = await axiosClient.delete(url);
    set((state) => ({
      category: state.category.filter((item) => item._id !== id),
    }));
    return resp;
  },
  fetchCategory: async (params) => {
    const url = `category/`;
    const resp = await axiosClient.get(url + "?" + params);
    set((state) => ({
      ...state,
      category: resp?.result?.data as unknown as any,
    }));
    return resp?.result as unknown as any;
  },
  fetchCategoryById: async (id) => {
    const url = `category/${id}`;

    const resp = await axiosClient.get(url);
    return resp?.result as unknown as any;
  },
}));

export default useCategoryStore;
