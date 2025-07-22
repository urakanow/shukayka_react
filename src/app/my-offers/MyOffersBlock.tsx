"use client"
import { Grid, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { OfferPreview } from "@/models/OfferPreview";
import MyOfferElement from "./MyOfferElement";

function MyOffersBlock() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [offers, setOffers] = useState<OfferPreview[]>([])

    useEffect(() => {
        fetchMyOffers()
    }, [])

    return (
        <div className="offers_block">
            <Grid container spacing={2} className="offers_grid">
                {offers.map((offer, index) =>
                    <MyOfferElement key={index} id={offer.id} offerData={offer}
                    onDelete={(id) => setOffers(prev => prev.filter(offer => offer.id !== id))} />
                )}
            </Grid>
        </div>
    );

    async function fetchMyOffers(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/my-offers`,
                method: "get"
            })

            if (response.status === 200) {
                setOffers(response.data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default MyOffersBlock;