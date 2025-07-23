"use client"
import { ChangeEvent, useRef, useState } from "react";

interface PhotoProps {
    onFilesSelect: (file: File, index: number) => void,
    index: number,
    photoUrl: string | null,
}

function PhotoElement({ onFilesSelect, index, photoUrl }: PhotoProps) {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click(); // Trigger hidden input
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // console.log(files) // Pass files to parent
            // const reader = new FileReader();
            // reader.onload = (e) => setPreview(e.target.result);
            // reader.readAsDataURL(files[0]);
            onFilesSelect(files[0], index);
        }
    };

    return (
        <div className="add_photo_wrapper">
            <input type="file" className="photo_input" ref={fileInputRef} onChange={handleFileChange}/>   
            {!photoUrl && <button className="photo" onClick={handleClick}>Додати фото</button>}

            {photoUrl && <img className="photo" id="photo" onClick={handleClick} src={photoUrl}/>}
        </div>
     );
}

export default PhotoElement;