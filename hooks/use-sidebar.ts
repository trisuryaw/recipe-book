import { useSidebarStore } from "@/lib/interfaces";
import { create } from "zustand";

export const useSidebar = create<useSidebarStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
