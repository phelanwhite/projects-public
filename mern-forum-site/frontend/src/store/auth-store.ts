import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  isLoggedIn: boolean;
  user: any | null;
};
type Action = {
  signup: (data: any) => any;
  signin: (data: any) => any;
  signout: () => any;
  updateMe: (data: any) => any;
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      signup: async (data) => {
        const url = `auth/signup`;

        const response = await axiosClient.post(url, data);

        return response.data;
      },
      signin: async (data) => {
        const url = `auth/signin`;

        const response = await axiosClient.post(url, data);

        set((state) => ({
          ...state,
          isLoggedIn: true,
          user: response.data?.result,
        }));
        return response.data;
      },
      signout: async () => {
        const url = `auth/signout`;

        const response = await axiosClient.delete(url);

        set((state) => ({ ...state, isLoggedIn: false, user: null }));

        return response.data;
      },
      updateMe: async (data) => {
        const url = `auth/update-profile`;

        const response = await axiosClient.put(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        set((state) => ({
          ...state,
          user: response.data?.result,
        }));
        return response.data;
      },
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  )
);
