"use client"
import { useEffect, useState } from "react";
import useApi from "@/hooks/UseApi";
import { useAuth } from "@/components/AuthContext";
import { Grid } from "@mui/material";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "./styles.module.css";
import OfferElement from "@/components/OfferElement";
import router from "next/router";

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
        <ProtectedRoute>
            {/* <OffersDisplayPage title="Вибрані">
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
            </OffersDisplayPage> */}
        
            <div className={styles.offers_block}>
                <h1 className="text-xl">Вибрані</h1>

                <Grid container spacing={2} className={styles.offers_grid}>
                    {favorites.map((favorite, index) =>
                        <OfferElement key={index} offerData={favorite} />
                    )}
                </Grid>
            </div>
        </ProtectedRoute>
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