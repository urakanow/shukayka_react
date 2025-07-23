import RegularButton from '@/components/RegularButton';
import { CldImage } from 'next-cloudinary';

interface Data {
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
    const profile_picture = "profile_picture_default_icon_t9kx9b";
    const green_arrow_image = "green_arrow_icon_rmvcna";
    const ukrpost_image = "ukrpost_icon_rxne6a";
    const novapost_image = "nova_post_icon_coq0n8";

    function getFormattedDate(isoDate: string) {
        const date = new Date(isoDate);
        
        // Extract date components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        
        // Extract time components
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}.${month}.${year} о ${hours}:${minutes}`;
    }

    return (
        <div className='green_rectangle vertical_container ' id='offer_page_buy_section'>
            <span className='small_text' id='published_at'>Опубліковано {getFormattedDate(data.creationDate)}</span>

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
                <input type='text' className='text_input' placeholder="Зв'язатися з продавцем"/>
                <CldImage src={green_arrow_image} alt='' width={58} height={58} id="form_text_input_image"/>
            </div>

            <RegularButton className='buy_now_button' text='Купити зараз' onClick={buyNow} />

            <h3 className='small_heading'>Спосіб доставки</h3>
            
            <div className='delivery horizontal_container'>
                <div className='vertical_container'>
                    <h3 className='small_heading'>Укрпошта</h3>
                    <span className='small_text'>
                        безкоштовно, доставка<br />
                        протягом 2-5 днів
                    </span>
                </div>
                <CldImage src={ukrpost_image} alt='' width={58} height={58} />
            </div>

            <div className='delivery horizontal_container'>
                <div className='vertical_container'>
                    <h3 className='small_heading'>У відділення Нова пошта</h3>
                    <span className='small_text'>
                        від 60 грн, доставка<br />
                        протягом 1-3 днів
                    </span>
                </div>
                <CldImage src={novapost_image} alt='' width={58} height={58} />
            </div>

            <div className='delivery horizontal_container'>
                <div className='vertical_container'>
                    <h3 className='small_heading'>Кур'єром Нова пошта</h3>
                    <span className='small_text'>
                        від 95 грн, доставка<br />
                        протягом 1-3 днів
                    </span>
                </div>
                <CldImage src={novapost_image} alt='' width={58} height={58} />
            </div>

            <div className='delivery horizontal_container'>
                <div className='vertical_container'>
                    <h3 className='small_heading'>Нова Пошта у Польщу</h3>
                    <span className='small_text'>
                        від 350 грн, доставка<br />
                        протягом 2-5 д alt='' width={58} height={58}нів
                    </span>
                </div>
                <CldImage src={novapost_image} alt='' width={58} height={58} />
            </div>

        </div>
     );
    function buyNow(){
        console.log("buy now clicked");
    }
}

export default BuySection;