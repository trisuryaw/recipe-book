import React, {useEffect, useState} from "react";

interface FoodImage {
    id: number,
    name: string,
    url: string,
}

const useFoodImage = () => {
    const generateId = (): number => Date.now()
    const [image, setImage] = useState<FoodImage>()

    const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                const newPhoto: FoodImage = {
                    id: generateId(),
                    name: reader.result as string,
                    url: ""
                }
                setImage(newPhoto)
            }
        }

    }

    const setDefaultImage = (img: string) => {
        const newPhoto: FoodImage = {
            id: generateId(),
            name: img,
            url: ""
        }
        setImage(newPhoto)
    }

    return {
        image,
        setDefaultImage,
        addImage,
        setImage
    }
}

export {
    useFoodImage
}