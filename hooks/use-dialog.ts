import { useDialogStore } from "@/lib/interfaces";
import { create } from "zustand";

export const useDialog = create<useDialogStore>()((set) => ({
  isOpen: false,
  recipeId: '',
  type: "success",
  message: "Sukses",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setRecipeId: (id) => set({recipeId: id}),
}))
