import Image from "next/image";
import React, {useEffect} from "react";
import {useFoodImage} from "@/hooks/use-food-image";
import {LabelImage} from "@/components/custom/label-image";

interface File {
    name: string
}

interface FoodImagesProps {
    img?: string,
    onChange?: (file: File) => void
}

const FoodImage = ({img, onChange}: FoodImagesProps) => {
    const {image, addImage, setDefaultImage} = useFoodImage()

    useEffect(() => {
        (img) ? setDefaultImage(img) : ''
    }, [img]);

    return <>
        {image && (
            <div className="p-5">
                <div className="min-w-40 min-h-40 relative" key={image.id}>
                    <Image src={image.name} alt="" fill className="h-full w-full object-cover"/>
                    <label htmlFor="food-image"
                           className="absolute bottom-4 right-4 hover:fill-[#a3a3a3] cursor-pointer"
                           title="Change Image">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="20"
                             width="15">
                            <path fill="#ffffff"
                                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z"/>
                        </svg>
                    </label>
                </div>

            </div>
        )}

        {!image && (
            <div
                className="p-5 flex flex-col justify-center border border-gray-300 border-dashed rounded-md text-xs text-center text-gray-500">
                <LabelImage htmlFor="food-image"/>
            </div>
        )}

        <input type="file" id="food-image" className="hidden"
               onChange={(e) => {
                   addImage(e)
                   if (e.target.files && e.target.files.length > 0) {
                       if (onChange) {
                           onChange(e.target.files[0])
                       }
                   }
               }}/>
    </>
}

export {
    FoodImage
}