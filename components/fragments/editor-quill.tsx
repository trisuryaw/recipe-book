import ReactQuill, {ReactQuillProps} from "react-quill";
import React from "react";
import "../../public/css/editor-quill.css"

interface QuillProps {
    className?: string,
    onChange: ReactQuillProps['onChange'],
    value?: string
}

const EditorQuill = ({className, onChange, value}: QuillProps) => {
    return <ReactQuill className={className}
                       onChange={onChange}
                       value={value}/>
}

export default EditorQuill