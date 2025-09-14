import { Photo } from "@/models/Photo";
import InputLabel from "../InputLabel";
import { PhotosType } from "./PhotosType";
import PhotoElement from "./PhotoElement";
import styles from './styles.module.css';

interface PhotosBlockProps {
    photos: PhotosType,
    setPhotos: React.Dispatch<React.SetStateAction<PhotosType>>
}

function PhotosBlock({ photos, setPhotos }: PhotosBlockProps) {
    const getFirstEmptyIndex = () => {
        for (let i = 0; i < 8; i++) {
            if (photos != null && photos[i] == null) return i;
        }
        return null; // All slots are full
    };

    const handlePhotoUpload = (file: File, index: number) => {
        const firstEmptyIndex = getFirstEmptyIndex();
        
        if (firstEmptyIndex === null) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
               const result = e.target?.result;
            if (typeof result !== 'string') return; // Skip if not a Data URL

            setPhotos((prev) => {
                const updatedPhotos = { ...prev }; // Safely spread (works even if `prev` is null)
                const targetIndex = index > firstEmptyIndex ? firstEmptyIndex : index;
                updatedPhotos[targetIndex] = result; // Store Data URL
                return updatedPhotos;
            });
        };
        reader.readAsDataURL(file);
    };

    function getPhotoUrl(photo: string | Photo | null): string | null {
        if (photo === null) {
            // Handle null case
            console.log("No photo available");
            return null;
        }
        
        if (typeof photo === 'string') {
            // Handle string case
            console.log("Photo URL:", photo);
            return photo;
        }
        
        if ('url' in photo) {  // TypeScript will know this must be { url: string } here
            console.log("Photo object URL:", photo.url);
            return `https://res.cloudinary.com/dxvwnanu4/image/upload/${photo.url}?_a=DAJCyJB3ZAA0`;
        }
        
        throw new Error("Invalid photo type");
    }

    return (
        <div className={styles.create_offer_page_section}>
            <h1 className="section_heading">Фото</h1>

            <InputLabel htmlFor="photos_container" text="Максимально покажіть всі деталі або дефекти, перше фото буде на обкладинці" id="photos_label" />
            <div className={styles.photos_container} id="photos_container">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className={styles.photos_container_row}>
                        {Array.from({ length: 2 }).map((_, j) => (
                            <PhotoElement key={j} onFilesSelect={handlePhotoUpload}
                            photoUrl={getPhotoUrl(photos[i * 4 + j])} index={i * 4 + j} />
                        ))}
                    </div>//TODO: getphotourl runs with every rerender on every photo(rerender problem, fixable with react compiler)
                ))}
            </div>
        </div>
    );
}

export default PhotosBlock;