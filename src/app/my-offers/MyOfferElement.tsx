"use client"
import { useAuth } from '@/components/AuthContext';
import useApi from '@/hooks/UseApi';
import { OfferPreview } from '@/models/OfferPreview';
import IOfferElement from '@/components/IOfferElement';
import RegularButton from '@/components/RegularButton';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

interface MyOfferElementProps {
    id: number,
    offerData: OfferPreview,
    onDelete: (id: number) => void
}

function MyOfferElement({ id, offerData, onDelete }: MyOfferElementProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    
    const delete_image = "delete_icon_om93sn";

    const router = useRouter();
    
    return (
        <IOfferElement offerData={offerData} linkUrl="/edit-offer">
            <div id='my_offer_element_button_section' className="horizontal_container">
                <RegularButton onClick={() => router.push(`/edit-offer/${offerData.id}`)} text='Редагувати' />
                <button id="delete_button" onClick={deleteOffer}>
                    <CldImage src={delete_image} alt='' width={34} height={34} />
                </button>
            </div>
        </IOfferElement>
    );

    async function deleteOffer(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/delete-offer`,
                method: 'delete',
                data: JSON.stringify(offerData.id)
            })

            if (response.status === 200) {
                onDelete(id);
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default MyOfferElement;