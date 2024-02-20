import Image from "next/image";
import AddPhotoIcon from "@/public/add-photo.svg";
import React from "react";

const LabelImage = ({htmlFor}: {htmlFor: string}) => {
    return <>
        <label htmlFor={htmlFor} className="cursor-pointer font-bold">
            <Image src={AddPhotoIcon} width={50} height={50} alt="Add Photo" className="inline-block"/>
        </label>
        <div className="cursor-context-menu">
            <label htmlFor={htmlFor} className="cursor-pointer font-bold">
                Click to add an image
            </label>
            or drag<br/> and drop
            <p>PNG, JPG, JPEG, (MAX 2MB)</p>
        </div>
    </>
}

export {
    LabelImage
}