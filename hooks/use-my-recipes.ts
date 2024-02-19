import {recipesProps} from "@/lib/interfaces";
import {create} from "zustand";
import {MyRecipesStore} from "@/store/MyRecipesStore";

export const useMyRecipes = create<MyRecipesStore>()((set) => ({
    recipes: [],
    setRecipes: (recipes: recipesProps[]) => set({recipes: recipes}),
    remove: (recipeId: number) => set((state) => ({ recipes: state.recipes.filter(recipe => recipe.recipeId !== recipeId) })),
}))