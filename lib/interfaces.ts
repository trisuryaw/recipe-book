import { FieldPath, FieldValues } from "react-hook-form";

export interface paramsProps {
    userId: number,
    pageNumber?: number,
    pageSize?: number,
    recipeName?: string,
    levelId?: number,
    categoryId?: number,
    time?: number | string,
    sortBy?: string
}

export interface categoryProps {
    categoryId: number,
    categoryName: string
}
  
export interface levelProps {
    levelId: number,
    levelName: string
}
  
export interface recipesProps {
    recipeId: number;
    categories: categoryProps,
    levels: levelProps,
    recipeName: string,
    imageUrl: string,
    time: number,
    isFavorite: boolean
    ingredient?: string | TrustedHTML
    howToCook?: string | TrustedHTML
}
  
export interface fetchDataProps {
    total: number,
    data: recipesProps[]
}
  
export interface errorProps {
    details: string,
    message: string,
    statusCode: number
}

export interface AuthCardWrapperProps {
    title: string;
    children: React.ReactNode;
    footerMessage?: string;
    footerLinkText: string;
    url: string;
    showAbout?: boolean;
    isLoading: boolean;
}

export interface EntriesPageProps {
    totalPages: number;
}

export interface HeaderProps {
    showControlBar?: boolean;
    showBackButton?: boolean;
    title: string;
}

export interface PaginationProps {
    totalPages: number;
}

export interface RecipeCardProps {
    recipeId: number;
    image: string;
    category: string;
    difficulty: string;
    name: string;
    time: number;
    isFavorited: boolean;
    detailUrl: string;
    handleFavoriteChange?: () => void;
}

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface useDialogStore {
    isOpen: boolean;
    type: "success" | "info";
    message: string;
    onOpen: () => void;
    onClose: () => void;
    recipeId: string;
    setRecipeId: (id: string) => void
}

export interface useSidebarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface useUserStore {
    token: string | null;
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}
  
export interface favoriteProps {
    userId: number
}

export interface recipeWrapperProps {
    params: paramsProps,
    url: string
}