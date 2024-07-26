import axiosClient from "@/configs/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: any;
  isAuthenticated: boolean;
};
type Action = {
  signup: (data: any) => void;
  signin: (data: any) => any;
  signout: () => void;
  updateMe: (data: any) => any;
  getMe: () => any;
};

const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signup: async (data) => {
        const url = `auth/signup`;
        const resp = await axiosClient.post(url, data);
        return resp;
      },
      signin: async (data) => {
        const url = `auth/signin`;
        const resp = (await axiosClient.post(url, data)) as unknown as any;
        return set((state) => ({
          ...state,
          user: resp?.result,
          isAuthenticated: true,
        }));
      },
      signout: async () => {
        await axiosClient.post(`auth/signout`);
        return set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
        }));
      },
      getMe: async () => {
        const url = `auth/get-me`;
        const resp = await axiosClient.get(url);
        return resp?.result as unknown as any;
      },
      updateMe: async (data) => {
        const url = `auth/update-me`;
        const resp = await axiosClient.put(url, data);
        set((state) => ({
          ...state,
          user: resp?.result as unknown as any,
        }));
        return resp;
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
