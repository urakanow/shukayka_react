import useApi from '@/hooks/UseApi';
import { useAuth } from '@/components/AuthContext';
import IOfferElement from '@/components/IOfferElement';
import { OfferPreview } from '@/models/OfferPreview';
import { CldImage } from 'next-cloudinary';
import styles from './styles.module.css';

interface FavoriteOfferElementProps {
    offerData: OfferPreview,
    onFavoriteClick: ((id: number) => void)
}

function FavoriteOfferElement({ offerData, onFavoriteClick }: FavoriteOfferElementProps) {
    const favorite_selected_image = "favorite_icon_selected_fj3vta";
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi()

    const handleFavoriteClick = async () => {
        deleteFavorite();
        onFavoriteClick(offerData.id);
    };

    return (
        <IOfferElement offerData={offerData} linkUrl={"/offers"}>
            <CldImage className={styles.favorite_button} src={favorite_selected_image}
            alt='' width={30} height={26}
            onClick={handleFavoriteClick} />
        </IOfferElement>
    );

    async function deleteFavorite(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/favorite/delete-favorite`,
                data: JSON.stringify(offerData?.id)
            })

            if(response.status === 200){
                console.log("favorite deleted", offerData.id)
            }
        } catch(err) {
            console.error("failed to delete favorite: ", err)
        }
    }
}

export default FavoriteOfferElement;