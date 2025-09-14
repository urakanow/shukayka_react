import { useAuth } from "@/components/AuthContext";
import DescriptionBlock from "./DescriptionBlock";
import PhotoBlock from "./PhotoBlock";
import { Photo } from '@/models/Photo';
import { CldImage } from 'next-cloudinary';
import styles from "./page.module.css";

interface Data{
    photos: Photo[],
    category: number,
    description: string,
    id: number,
    address: string
}

interface InfoSectionProps {
    data: Data
}

function InfoSection({ data }: InfoSectionProps) {
    const { categories } = useAuth();
    const location_image = "location_icon_szvvv8";

    return (
        <div className={`${styles.column}`} id='info_section'>
            <PhotoBlock photos={data.photos} />

            <div className={`${styles.block} ${styles.info_block} card`}>
                <div className={`${styles.info} `} id='info_bar'>
                    <div className="small-card">Приватна особа</div>
                    <div className="small-card">Стан: Вживане</div>
                    <div className="small-card">{categories[data.category]}</div>
                </div>

                <DescriptionBlock data={{
                    description: data.description,
                    id: data.id
                }}/>

                <div className={`${styles.location_container}`} id='location_container'>
                    <CldImage src={location_image} alt='' width={40} height={40} id="location_image" />
                    <small className='small_text'>{data.address}</small>
                </div>
            </div>


        </div>
     );
}

export default InfoSection;