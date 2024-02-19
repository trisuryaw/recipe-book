import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axiosInterceptorInstance from "@/lib/apiConfig";
import {useUser} from "@/hooks/use-user";
import * as z from "zod"
import {formRecipeSchema} from "@/lib/form-recipe-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "@/lib/schemas";
import {useDialog} from "@/hooks/use-dialog";
import {router} from "next/client";
import {useParams, useRouter} from "next/navigation";

interface Categories {
    categoryId: string,
    categoryName: string
}

interface Levels {
    levelId: string,
    levelName: string
}

interface FormValues {
    userId: string | null,
    recipeId: number | null,
    recipeName: string,
    file: File | null,
    timeCook: number,
    ingridient: string,
    howToCook: string,
    categories: {
        categoryId: string,
        categoryName: string
    },
    levels: {
        levelId: string,
        levelName: string
    },
}

const useFormRecipe = () => {
    const {userId} = useUser();
    const dialog = useDialog();
    const form = useForm<FormValues>({
        resolver: zodResolver(formRecipeSchema)
    })

    const params = useParams<{ recipeId: string }>()
    const router = useRouter()

    const {control, handleSubmit, setValue, setError} = form
    const [categories, setCategories] = useState<Array<Categories>>([])
    const [levels, setLevels] = useState<Array<Levels>>([])
    const [img, setImg] = useState<string>("")

    useEffect(() => {
        getCategories()
        getLevels()
        setValue("userId", userId)

        if (params.recipeId) getRecipeById(params.recipeId)

    }, []);

    const getRecipeById = async (recipeId: string) => {
        axiosInterceptorInstance.get(`https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes/${recipeId}`)
            .then((res) => {
                const result = res.data.data
                setValue("recipeId", result.recipeId)
                setValue("recipeName", result.recipeName)
                setValue("timeCook", result.timeCook.toString())
                setValue("ingridient", result.ingridient)
                setValue("howToCook", result.howToCook)
                setValue("categories", {categoryId: result.categories.categoryId.toString(), categoryName: result.categories.categoryName})
                setValue("levels", {levelId: result.levels.levelId.toString(), levelName: result.levels.levelName})
                setImg(result.imageFilename)
            })
    }

    const getCategories = async () => {
        try {
            const res = await axiosInterceptorInstance.get("https://mt-springboot.cloudias79.com/api/book-recipe-masters/category-option-lists")
            setCategories(res.data.data)
        } catch (error) {
            console.info(error)
        }
    }

    const getLevels = async () => {
        try {
            const res = await axiosInterceptorInstance.get("https://mt-springboot.cloudias79.com/api/book-recipe-masters/level-option-lists")
            setLevels(res.data.data)
        } catch (error) {
            console.info(error)
        }
    }

    const setValueCategories = (value: string) => {
        const selectedCategory = categories.find((category) => category.categoryId == value)
        if (selectedCategory) {
            setValue("categories", {categoryId: selectedCategory.categoryId, categoryName: selectedCategory.categoryName})
        }
    }

    const setValueLevels = (value: string) => {
        const selectedLevel = levels.find((level) => level.levelId == value)
        if (selectedLevel) {
            setValue("levels", {levelId: selectedLevel.levelId, levelName: selectedLevel.levelName})
        }
    }

    const onSubmit = (data: FormValues) => {
        const formData = new FormData()

        if (data.file) {
            formData.append("file", data.file as File);
        }

        const requestData = {...data, file: data.file};

        const jsonData = JSON.stringify(requestData);

        formData.append('request', new Blob([jsonData], {type: 'application/json'}), 'blob');

        axiosInterceptorInstance.post("https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                dialog.type = "success";
                dialog.message = res.data.message
                dialog.onOpen();
                return router.push("/my-recipes")
            })
            .catch(error => {
                console.info(error)
            })
    }

    const updateData = (data: FormValues) => {
        const formData = new FormData()
        let requestData = data

        if (data.file) {
            formData.append("file", data.file as File)
            requestData = {...data, file: data.file}
        }

        const jsonData = JSON.stringify(requestData)

        formData.append('request', new Blob([jsonData], {type: 'application/json'}), 'blob')

        axiosInterceptorInstance.put("https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                dialog.type = "success";
                dialog.message = res.data.message
                dialog.onOpen();
                return router.push("/my-recipes")
            })
    }

    return {
        img,
        form,
        control,
        categories,
        levels,
        handleSubmit,
        onSubmit,
        updateData,
        setValueCategories,
        setValueLevels,
    }
}

export {useFormRecipe}