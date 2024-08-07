import { create } from "zustand";
import axiosClient from "@/configs/axiosClient";

type State = {
  posts: any[];
  // posts_drafts: any[];
};

type Action = {
  createPost: (data: any) => any;
  updatePostById: (id: any, data: any) => any;
  deletePostById: (id: any) => any;
  getPosts: (params: any) => any;
  getPostsDrafts: (params: any) => any;
};

export const usePostStore = create<State & Action>()((set) => ({
  createPost: async (data) => {
    const url = `post/create`;
    const resp = await axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set((state: any) => ({
      ...state,
      posts: [...state.posts, { ...resp.data?.result }],
    }));

    return resp.data;
  },
  updatePostById: async (id, data) => {
    const url = `post/update-id/${id}`;
    const resp = await axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set((state: any) => ({
      posts: state.posts?.map((item: any) =>
        item._id === id ? { ...item, ...resp.data?.result } : item
      ),
    }));

    return resp.data;
  },
  deletePostById: async (id) => {
    const url = `post/delete-id/${id}`;
    const resp = await axiosClient.delete(url);

    set((state: any) => ({
      ...state,
      posts: state.posts?.filter((item: any) => item?._id !== id),
    }));
    set((state: any) => ({
      ...state,
      posts_drafts: state.posts?.filter((item: any) => item?._id !== id),
    }));
    return resp.data;
  },

  posts: [],
  getPosts: async (params) => {
    const url = `post/get-post-by-me-published` + (params ? params : ``);
    const resp = await axiosClient.get(url);

    set((state: any) => ({ ...state, posts: resp.data?.result?.data as any }));
    return resp.data;
  },

  getPostsDrafts: async (params) => {
    const url = `post/get-post-by-me-drafts` + (params ? params : ``);
    const resp = await axiosClient.get(url);

    set((state: any) => ({
      ...state,
      posts: resp.data?.result?.data as any,
    }));
    return resp.data;
  },
}));
