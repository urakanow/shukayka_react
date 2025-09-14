import DeliveryOption from "./DeliveryOption";

function DeliveryOptionsBlock() {
    const ukrpost_image = "ukrpost_icon_rxne6a";
    const novapost_image = "nova_post_icon_coq0n8";
    
    return (
        <>
            <h3 className='small_heading'>Спосіб доставки</h3>
            
            {/* <DeliveryOption title='Укрпошта' price='безкоштовно' deliveryTime='2-5 днів' image={ukrpost_image} /> */}

            <DeliveryOption title='У відділення Нова пошта' price='від 60 грн' deliveryTime='1-3 днів' image={novapost_image} />

            {/* <DeliveryOption title="Кур'єром Нова пошта" price='від 95 грн' deliveryTime='1-3 днів' image={novapost_image} /> */}
            
            <DeliveryOption title="Нова Пошта міжнародно" price='від 350 грн' deliveryTime='2-5 днів' image={novapost_image} />
        </>
    );
}

export default DeliveryOptionsBlock;