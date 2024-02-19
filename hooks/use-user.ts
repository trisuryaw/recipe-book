import { useUserStore } from "@/lib/interfaces";
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

export const useUser = create<useUserStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        userId: null,
        login: (token, userId) => set({ token, userId }),
        logout: () => set({ token: null, userId: null }),
      }),
      {
        name: 'user-session',
      }
    )
  )
)