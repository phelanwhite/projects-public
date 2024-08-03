import { createReview } from "@/libs/prisma-action";
import { create } from "zustand";

type State = {
  reviews: any;
};

type Action = {
  createReview: (data: any) => void;
  // updateReviewById: (id: string, data: any) => void;
  // deleteReviewById: (id: string) => void;
  // getReviewsByMe: () => void;
};

export const usePostStore = create<State & Action>()((set, get) => ({
  reviews: [],
  createReview: async (data) => {
    const resp = await createReview(data);

    set((state) => ({
      ...state,
      posts: [...state.reviews, resp],
    }));
  },
  // updateReviewById: async (id, data) => {
  //   const resp = await updatePostById(id, data);
  //   set((state) => ({
  //     ...state,
  //     posts: state.posts.map((item) =>
  //       item.id === resp?.id ? { ...item, ...resp } : item
  //     ),
  //   }));
  // },
  // deleteReviewById: async (id) => {
  //   const resp = await deletePostById(id);
  //   set((state) => ({
  //     posts: state.posts.filter((item) => item.id !== resp?.id),
  //   }));
  // },
  // getReviewsByMe: async () => {
  //   const resp = await getPostsByMe();
  //   return resp;
  // },
}));
