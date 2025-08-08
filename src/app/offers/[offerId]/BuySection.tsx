import { useAuth } from '@/components/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RegularButton from '@/components/RegularButton';
import useApi from '@/hooks/UseApi';
import { DateUtil } from '@/utils/DateFormatter';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import DeliveryOptionsBlock from './DeliveryOptionsBlock';

interface Data {
    offerId: number,
    creationDate: string,
    title: string,
    price: number,
    username: string,
    phoneNumber: string
}

interface BuySectionProps{
    data: Data
}

function BuySection({ data }: BuySectionProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const router = useRouter();

    const profile_picture = "profile_picture_default_icon_t9kx9b";
    const green_arrow_image = "green_arrow_icon_rmvcna";

    return (
        <div className='green_rectangle vertical_container ' id='offer_page_buy_section'>
            <span className='small_text' id='published_at'>Опубліковано {DateUtil.getDateTime(data.creationDate)}</span>

            <h1 className='large_heading' id='offer_page_title'>{data.title}</h1>

            <h2 className='medium_heading'>{data.price} грн.</h2>

            <div className='user'>
                <CldImage src={profile_picture} alt='' width={58} height={58} />
                <div className='vertical_container' id='user_info'>
                    <h2 className='medium_heading'>{data.username}</h2>
                    <span className='small_text'>{data.phoneNumber}</span>
                </div>
            </div>

            <div className='horizontal_container' id='send_message'>
                {/* <input type='text' className='text_input' placeholder="Зв'язатися з продавцем"/> */}
                <RegularButton className='text_input' text="Зв'язатися з продавцем" onClick={contactSeller} />
                <CldImage src={green_arrow_image} alt='' width={58} height={58} id="form_text_input_image"/>
            </div>

            <ProtectedRoute>
                <RegularButton className='buy_now_button' text='Купити зараз' onClick={buyNow} />
            </ProtectedRoute>

            <DeliveryOptionsBlock />
        </div>
     );
    function buyNow(){
        console.log("buy now clicked")
        router.push(`/buy/${data.offerId}`)
    }
    
    async function contactSeller(){
        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/chat/create-chat`,
                data: data.offerId
            })
            
            if(response.status === 200){
                console.log("success")
                const chatId = response.data;
                router.push(`/chat/${chatId}`);
            }
        } catch(err: unknown) {
            console.error("Failed to send message:", err);
        }
    }
}

export default BuySection;