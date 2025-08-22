"use client"
import { OfferPreview } from "@/models/OfferPreview";
import Offer from "./Offer";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";

function OffersTab() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [offers, setOffers] = useState<OfferPreview[]>([]);
    
    useEffect(() => {
        fetchOffers();
    }, [])
    
    return (
        <div className="vertical_container">
            {offers.map((offer, index) => (
                <Offer data={offer} key={index} onDelete={(id) => {
                    setOffers(prev => prev.filter(offer => offer.id !== id));
                }} />
            ))}
        </div>
    );
    
    async function fetchOffers(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/admin/offers`
            })
            
            if(response.status === 200){
                console.log(response.data)
                setOffers(response.data)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch offers:", err);
        }
    }
}

export default OffersTab;