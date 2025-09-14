"use client"
import { useAuth } from "@/components/AuthContext";
import { Offer } from "@/models/Offer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BuySection from "./BuySection";
import InfoSection from "./InfoSection";
import styles from "./page.module.css";

function OfferPage() {
    const { offerId } = useParams<{ offerId: string }>();
    const [offerData, setOfferData] = useState<Offer>()
    const { baseUrl } = useAuth();

    useEffect(() => {
        fetchOfferData();
        console.log(offerData);
    }, [offerId])

    useEffect(() =>{
        console.log(offerData);
    }, [offerData])
    
    if (!offerId) {
        return <div>Error: Missing offer ID</div>;
    }

    return ( 
        <div className={`${styles.offer_page_container}`}>
            {offerData ? (
                <>
                    <InfoSection data={{
                        photos: offerData.images,
                        category: offerData.category,
                        description: offerData.description,
                        id: parseInt(offerId),
                        address: offerData.address
                    }}/>
    
                    <BuySection data={{
                        offerId: parseInt(offerId),
                        creationDate: offerData.creationDate,
                        title: offerData.title,
                        price: offerData.price,
                        username: offerData.contacter,
                        phoneNumber: offerData.phoneNumber
                    }} />
                </>
            ) : (
                <>
                    loading...
                </>
            )}
        </div>
    );

    async function fetchOfferData() {
        try{
            const response = await fetch(`${baseUrl}/offer/offer/${offerId}`, {
                method: 'get',
            })

            if(response.status === 200){
                const data = await response.json();

                setOfferData(data);
            }
        } catch(err){
            console.error("failed to fetch offer data: ", err)
        }
    }
}

export default OfferPage;