import { Grid } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { OfferPreview } from "@/models/OfferPreview";
import { CldImage } from "next-cloudinary";
import styles from './styles.module.css';

interface IOfferElementProps {
    offerData: OfferPreview,
    linkUrl: string,
    children?: ReactNode
}

function IOfferElement({ offerData, linkUrl, children }: IOfferElementProps) {
    const [image, setImage] = useState<string | null>(null);
    
    useEffect(() =>{
        if (!offerData?.previewImageUrl) {
            setImage(null); // Clear image if no valid photo
            return;
        }

        setImage(offerData.previewImageUrl)
        // console.log(offerData.images[0].url);
        // const img = cld.image(offerData.previewImageUrl)

        // const imgElement = new Image();
        // imgElement.src = img.toURL();

        // imgElement.onload = () => {
        //     setImage(img);
        // };

        // imgElement.onerror = () => {
        //     setImage(null);
        // };
    }, [offerData?.previewImageUrl])
    
    return (
        <Grid size={3} className={styles.offer_element}>
            {offerData && (
                <div className={`vertical_container ${styles.offer_element_content_wrapper}`}>
                    <Link className={styles.offer_element_content_wrapper_a} href={`${linkUrl}/${offerData.id}`}>
                        <div className="image_wrapper">
                            {image ? (
                                <CldImage className={styles.offer_preview_image} src={image}
                                alt="" fill={true}
                                //  height={250}
                                onError={() => setImage(null)}/>
                            ) : (
                                <img className={styles.offer_preview_image} src="/default_image.jpg" />
                            )}
                        </div>
                        <h1 className={styles.offer_element_h1}>{offerData.title}</h1>
                        <span className={styles.offer_element_span}>{offerData.price} грн.</span>
                    </Link>
                    {children !== undefined && children}
                </div>
            )}
        </Grid>
    );
}

export default IOfferElement;