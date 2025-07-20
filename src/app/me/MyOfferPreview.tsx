import { AdvancedImage } from '@cloudinary/react';
import { CldImage } from 'next-cloudinary';
import styles from './page.module.css';

interface OfferPreview{
    id: number,
    previewImageUrl: string,
    title: string,
    price: number,
}

interface MyOfferPreviewProps {
    offer: OfferPreview
}

function MyOfferPreview({ offer }: MyOfferPreviewProps) {
    const image = offer.previewImageUrl;

    return (
        <div className={styles.my_offer_preview}>
            <div className={styles.image_wrapper}>
                <CldImage src={image} alt='' fill={true} className={styles.offer_preview_image} />
            </div>
            <h1>{offer.title}</h1>
            <span>{offer.price} грн.</span>
            <span>Активно</span>
        </div>
    );
}

export default MyOfferPreview;