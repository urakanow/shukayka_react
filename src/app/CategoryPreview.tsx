import { CldImage } from "next-cloudinary";
import styles from './page.module.css';

interface CategoryPreviewProps {
    imgUrl: string,
    categoryName: string,
    styleId?: string
}

function CategoryPreview({ imgUrl, categoryName, styleId}: CategoryPreviewProps) {
    const image = imgUrl;

    return (
        <div className={`${styles.category_preview} card`}>
            {/* <CldImage className={styles.category_preview_img} src={image} alt="" height={72} width={72}/> */}
            <CldImage className={styles.category_preview_img} src={image} alt="" height={64} width={64}/>
            <div className={styles.category_preview_separator} />
            <span className={`${styleId} ${styles.category_preview_span}`}>{categoryName}</span>
        </div>
     );
}

export default CategoryPreview;