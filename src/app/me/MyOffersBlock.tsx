"use client"
import { useState } from 'react';
import MyOfferPreview from './MyOfferPreview';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import styles from './page.module.css';
import typography from '@/styles/typography.module.css';

interface OfferPreview{
    id: number,
    previewImageUrl: string,
    title: string,
    price: number,
}

interface MyOffersBlockProps {
    offers: OfferPreview[]
}

function MyOffersBlock({ offers }: MyOffersBlockProps) {
    const left_arrow_image = "left_arrow_icon_xozc74";
    const right_arrow_image = "right_arrow_icon_m9px0p";
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2);

    function moveRight(){
        if(lastIndex + 1 === offers.length){
            return;
        }

        setFirstIndex(firstIndex + 1);
        setLastIndex(lastIndex + 1);
    }

    function moveLeft(){
        if(firstIndex === 0){
            return;
        }

        setFirstIndex(firstIndex - 1);
        setLastIndex(lastIndex - 1);
    }

    return (
        <div className={`${styles.my_offers} green_rectangle vertical_container`}>
            <Link href={"/my-offers"}>
                <h1 className={typography.semi_large}>Мої оголошення</h1>
            </Link>

            <div className="carouselle horizontal_container">
                {firstIndex > 0 && 
                    <button className='arrow_wrapper' onClick={moveLeft}>
                        <CldImage src={left_arrow_image} alt='' height={48} width={30} className="carouselle_arrow" id="left_arrow"/>
                    </button>
                }

                <div className={`${styles.my_offers_carouselle} horizontal_container`}>
                    {offers.slice(firstIndex, lastIndex + 1).map((offer, index) => <MyOfferPreview offer={offer} key={index}/>)}
                </div>

                {lastIndex + 1 < offers.length &&
                    <button className='arrow_wrapper' onClick={moveRight}>
                        <CldImage src={right_arrow_image} alt='' height={48} width={30} className="carouselle_arrow right_arrow"/>
                    </button>
                }
            </div>
        </div>
     );
}

export default MyOffersBlock;