import { checkAuthentication } from "@/libs/prisma-action";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State1 = {
  isAuthenticated: boolean;
  user: UserType | null;
};

type Action1 = {
  login: () => void;
  logout: () => void;
};

export const useAuthStore = createStore<State1 & Action1>()(
  //   persist(
  (set, get) => ({
    isAuthenticated: false,
    user: null,
    login: async () => {
      const user = await checkAuthentication();
      set((state) => ({
        ...state,
        isAuthenticated: true,
        user: user,
      }));
    },
    logout: () => {
      set((state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
      }));
    },
  })
  //     { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  //   )
);
