import { CldImage } from "next-cloudinary";

interface DeliveryOptionProps {
    title: string,
    price: string,
    deliveryTime: string,
    image: string
}

function DeliveryOption({ title, price, deliveryTime, image}: DeliveryOptionProps) {
    const ukrpost_image = "ukrpost_icon_rxne6a";
    const novapost_image = "nova_post_icon_coq0n8";
    
    return (
        <div className='delivery horizontal_container'>
            <div className='vertical_container'>
                <h3 className='small_heading'>{title}</h3>
                <span className='small_text'>
                    {price}, доставка<br />
                    протягом {deliveryTime}
                </span>
            </div>
            <CldImage src={image} alt='' width={58} height={58} />
        </div>
    );
}

export default DeliveryOption;