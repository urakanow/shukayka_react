"use client"
import { OfferPreview } from "@/models/OfferPreview";
import Offer from "./Offer";
import { Dispatch, SetStateAction, useEffect } from "react";

interface OffersTabProps {
    offers: OfferPreview[],
    setOffers: Dispatch<SetStateAction<OfferPreview[]>>
}

function OffersTab({ offers, setOffers }: OffersTabProps) {
    useEffect(() => {
        console.log("offers changed offerstab: ", offers)
    }, [offers])
    return (
        <div className="vertical_container">
            {offers.map((offer, index) => (
                <Offer data={offer} key={index} onDelete={(id) => {
                    // console.log("new offers list", offers.filter(offer => offer.id !== id))
                    setOffers(prev => prev.filter(offer => offer.id !== id));
                }} />
            ))}
        </div>
    );
}

export default OffersTab;