import { useState } from 'react';
import { Photo } from '@/models/Photo';
import { CldImage } from 'next-cloudinary';
import styles from "./page.module.css";

interface PhotoBlockProps{
    photos: Photo[]
}

function PhotoBlock({ photos }: PhotoBlockProps) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const offer_test_image = photos[photoIndex].url;
    const left_arrow_image = "left_arrow_icon_xozc74";
    const right_arrow_image = "right_arrow_icon_m9px0p";

    function moveLeft(){
        if(photoIndex === 0){
            return;
        }

        setPhotoIndex(photoIndex - 1);
    }

    function moveRight(){
        if(photoIndex === photos.length){
            return;
        }

        setPhotoIndex(photoIndex + 1);
    }

    return (
        <div className={`${styles.block} ${styles.photo_block} card`} id='photo_block'>
            <div className='carouselle horizontal_container'>
                {photoIndex > 0 &&
                    <button className='arrow_wrapper' onClick={moveLeft}>
                        <CldImage src={left_arrow_image} alt='' width={30} height={48} className="carouselle_arrow" id="left_arrow"/>
                    </button>
                }

                {photoIndex < photos.length - 1 &&
                    <button className='arrow_wrapper' onClick={moveRight}>
                        <CldImage src={right_arrow_image} alt='' width={30} height={48} className="carouselle_arrow" id="right_arrow"/>
                    </button>
                }

                <div className='image_wrapper' id='offer_photo_wrapper'>
                    <CldImage src={offer_test_image} alt='' width={460} height={315} />
                </div>
            </div>

            <div className='horizontal_container' id='carouselle_indicator_container'>
                {photos.map((value, index) => 
                    <div key={index} className='carouselle_indicator' id={index === photoIndex ? 'carouselle_indicator_selected' : undefined}/>
                )}
            </div>
        </div>
     );
}

export default PhotoBlock;