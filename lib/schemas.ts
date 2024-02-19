import * as z from "zod";
 
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong."
    })
    .max(100, {
      message: "Username tidak boleh lebih dari 100 karakter."
    })
    .refine((value) => !/\s/.test(value), {
      message: "Format username belum sesuai."
    }),
  fullname: z
    .string()
    .min(1, {
      message: "Kolom nama lengkap tidak boleh kosong."
    })
    .max(255, {
      message: "Nama tidak boleh lebih dari 255 karakter"
    })
    .refine((value) => /^[a-zA-Z0-9\s]*$/.test(value), {
      message: "Format nama lengkap belum sesuai. (Tidak menggunakan special character dan maksimal 255 charackter)."
    }),
  password: z
    .string()
    .min(6, {
      message: "Kata sandi tidak boleh kurang dari 6 karakter."
    })
    .max(50, {
      message: "Kata sandi tidak boleh lebih dari 50 karakter"
    })
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value), {
      message:
        "Kata sandi harus memiliki minimal 6 karakter kombinasi angka/huruf.",
    }),
  retypePassword: z
    .string()
    .min(1, {
      message: "Kolom Konfirmasi Kata Sandi tidak boleh kosong"
    }),
}).refine((data) => data.password === data.retypePassword, {
  message: "Konfirmasi kata sandi tidak sama dengan kata sandi",
  path: ["retypePassword"]
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Kolom username tidak boleh kosong."
    })
    .max(100)
    .refine((value) => !/\s/.test(value), {
      message: "Format username belum sesuai."
    }),
  password: z
    .string()
    .min(1, {
      message: "Kata sandi tidak boleh kosong."
    })
    .max(50),
});

export const filterSchema = z.object({
  difficulty: z.string().optional(),
  category: z.string().optional(),
  time: z.string().optional(),
  sort: z.string().optional()
});