import { create } from "zustand";
import axiosClient from "@/configs/axiosClient";

type State = {
  posts: any[];
};

type Action = {
  createPost: (data: any) => any;
  updatePostById: (id: any, data: any) => any;
  deletePostById: (id: any) => any;
  getPosts: () => any;
};

export const usePostStore = create<State & Action>()((set) => ({
  posts: [],
  createPost: async (data) => {
    const url = `post/create`;
    const resp = await axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return resp.data;
  },
  updatePostById: async (id, data) => {
    const url = `post/update-id/${id}`;
    const resp = await axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ resp });

    // set((state: any) => ({ ...state, posts: [...state.posts, resp.data] }));
    return resp.data;
  },
  deletePostById: async (id) => {
    const url = `post/delete-id/${id}`;
    const resp = await axiosClient.delete(url);

    set((state: any) => ({
      ...state,
      posts: state.posts?.filter((item: any) => item?._id !== id),
    }));
    return resp.data;
  },
  getPosts: async () => {
    const url = `post/get-all`;
    const resp = await axiosClient.get(url);

    set((state: any) => ({ ...state, posts: resp.data?.result?.data as any }));
    return resp.data;
  },
}));
