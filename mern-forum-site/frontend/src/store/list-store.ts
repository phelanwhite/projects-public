import { create } from "zustand";
import axiosClient from "@/configs/axiosClient";

type State = {
  lists: [];
};

type Action = {
  createList: (data: any) => any;
  updateListById: (id: any, data: any) => any;
  deleteListById: (id: any) => any;
  getListsByMe: () => any;
};

export const useListStore = create<State & Action>()((set, get) => ({
  lists: [],
  createList: async (data) => {
    const url = `list/create`;
    const resp = await axiosClient.post(url, data);

    set((state: any) => ({
      ...state,
      lists: [...state.lists, { ...resp.data?.result }],
    }));
    return resp.data;
  },
  updateListById: async (id, data) => {
    const url = `list/update-id/${id}`;
    const resp = await axiosClient.put(url, data);

    set((state: any) => ({
      ...state,
      lists: state.lists?.map((item: any) =>
        item?._id === id ? { ...item, ...resp.data?.result } : item
      ),
    }));
    return resp.data;
  },
  deleteListById: async (id) => {
    const url = `list/delete-id/${id}`;
    const resp = await axiosClient.delete(url);

    set((state: any) => ({
      ...state,
      lists: state.lists?.filter((item: any) => item?._id !== id),
    }));
    return resp.data;
  },
  getListsByMe: async () => {
    const url = `list/get-all-by-me`;
    const resp = await axiosClient.get(url);

    set((state: any) => ({ ...state, lists: resp.data?.result }));
    return resp.data;
  },
}));
