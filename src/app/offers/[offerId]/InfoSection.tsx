import { useAuth } from "@/components/AuthContext";
import DescriptionBlock from "./DescriptionBlock";
import PhotoBlock from "./PhotoBlock";
import { Photo } from '@/models/Photo';
import { CldImage } from 'next-cloudinary';

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
        <div className='vertical_container' id='info_section'>
            <PhotoBlock photos={data.photos} />

            <div className='green_rectangle horizontal_container' id='info_bar'>
                <div>Приватна особа</div>
                <div>Стан: Вживане</div>
                <div>{categories[data.category]}</div>
            </div>

            <DescriptionBlock data={{
                description: data.description,
                id: data.id
            }}/>

            <div className='green_rectangle horizontal_container' id='location_container'>
                <CldImage src={location_image} alt='' width={40} height={40} id="location_image" />
                <span className='small_text'>Місцезнаходження: {data.address}</span>
            </div>
        </div>
     );
}

export default InfoSection;