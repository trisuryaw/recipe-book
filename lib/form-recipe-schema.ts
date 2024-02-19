import * as z from "zod"
import {ZodType} from "zod";

export const formRecipeSchema = z.object({
    userId: z.number(),
    file: z.any()
        .refine((file: File) => file?.name !== undefined, "Kolom Gambar tidak boleh kosong")
        .optional(),
    recipeId: z.number().optional(),
    recipeName: z.string({
        required_error: "Kolom Recipe Name tidak boleh kosong",
    })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value),
            {message: "Kolom Resep Masakan tidak boleh berisi special character atau angka"}),

    ingridient: z.string({
        required_error: "Kolom Bahan - Bahan tidak boleh kosong",
    }),

    timeCook: z.string({
        required_error: "Kolom Waktu Masak tidak boleh kosong",
    })
        .min(1)
        .max(999, {message: "Kolom Hanya Boleh Berisi Angka 1 - 999"}),

    howToCook: z.string({
        required_error: "Kolom Cara Masak tidak boleh kosong"
    }),

    categories: z.object({
        categoryId: z.string({required_error: "Kolom Categories tidak boleh kosong"}),
        categoryName: z.string(),
    }),

    levels: z.object({
        levelId: z.string({
                required_error: "Kolom Tingkat Kesulitan tidak boleh kosong"
            }),
        levelName: z.string(),
    })

})