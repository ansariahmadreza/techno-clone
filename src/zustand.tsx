import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegisterFormData } from "@/utils/valid";
import { RegisterFormData2 } from "./app/(auth)/login/ExsitingUser/page";


interface UserState {
  user: { name: string, email: string } | null;
  user2: { email: string } | null;
  setUser: (data: RegisterFormData) => void;
  setUser2: (data: RegisterFormData2) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      user2: null,
      setUser: (data: RegisterFormData) => set({ user: { name: data.name, email: data.email }, user2: null }),
      setUser2: (data: RegisterFormData2) => set({ user2: { email: data.email }, user: null })
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        user2: state.user2
      })
    }
  )
);
