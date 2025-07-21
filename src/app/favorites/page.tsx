"use client"
import { useEffect, useState } from "react";
import useApi from "@/hooks/UseApi";
import { useAuth } from "@/components/AuthContext";
import { Grid } from "@mui/material";
import FavoriteOfferElement from "./FavoriteOfferElement";
import OffersDisplayPage from "@/components/OffersDisplayPage";

interface OfferPreview{
    id: number,
    previewImageUrl: string,
    title: string,
    price: number,
}

function FavoritesPage() {
    const { baseUrl } = useAuth();
    const [favorites, setFavorites] = useState<OfferPreview[]>([]);
    const { authorizedRequest } = useApi()

    useEffect(() => {
        fetchFavorites();
    }, [])

    useEffect(() => {
        console.log(favorites);
    }, [favorites])

    return (
        <OffersDisplayPage title="Вибрані">
            {favorites ? (
                <>
                    {favorites.length == 0 && <span className="small_text">Вибрані оголошення з'являтимуться тут</span>}
                    <div className="offers_block">
                        <Grid container spacing={2} className="offers_grid">
                            {favorites.map((offer, index) =>
                                <FavoriteOfferElement key={index} offerData={offer} onFavoriteClick={(id) => {
                                    console.log("favorite clicked", id)
                                    setFavorites(prev => prev.filter(offer => offer.id !== id))
                                }} />
                            )}
                        </Grid>
                        
                    </div>
                </>
            ) : (
                <>
                    loading...
                </>
            )}
        </OffersDisplayPage>
     );

     async function fetchFavorites() {
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/favorite/get-user-favorites`
            })

            if(response.status === 200){
                setFavorites(response.data)
            }
        } catch(err) {
            console.error("failed to fetch favorites: ", err)
        }
     }
}

export default FavoritesPage;