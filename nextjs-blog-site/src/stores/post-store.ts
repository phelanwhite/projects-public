import {
  createPost,
  deletePostById,
  getPostsByMe,
  updatePostById,
} from "@/libs/prisma-action";
import { create } from "zustand";

type State = {
  posts: PostType[];
};

type Action = {
  createPost: (post: PostType) => void;
  updatePostById: (id: string, post: PostType) => void;
  deletePostById: (id: string) => void;
  getPostsByMe: () => void;
};

export const usePostStore = create<State & Action>()((set, get) => ({
  posts: [],
  createPost: async (post) => {
    const resp = await createPost(post);

    set((state) => ({
      ...state,
      posts: [...state.posts, resp as unknown as PostType],
    }));
  },
  updatePostById: async (id, post) => {
    const resp = await updatePostById(id, post);
    set((state) => ({
      ...state,
      posts: state.posts.map((item) =>
        item.id === resp?.id ? { ...item, ...resp } : item
      ),
    }));
  },
  deletePostById: async (id) => {
    const resp = await deletePostById(id);
    set((state) => ({
      posts: state.posts.filter((item) => item.id !== resp?.id),
    }));
  },
  getPostsByMe: async () => {
    const resp = await getPostsByMe();
    return resp;
  },
}));
