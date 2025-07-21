"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Grid } from "@mui/material";
import { OfferPreview } from "@/models/OfferPreview";
import { Filters } from "@/models/Filters";
import OfferElement from "@/components/OfferElement";
import OffersDisplayPage from "@/components/OffersDisplayPage";

function CategoryPage() {
    const { categoryId } = useParams();
    const categoryIdNumber = parseInt(categoryId?.toString() || "");
    const { baseUrl, categories } = useAuth();

    const [offers, setOffers] = useState<OfferPreview[]>();

    useEffect(() => {
        fetchCategoryOffers({
            categoryIndex: categoryIdNumber,
            pageSize: 20
        })
    }, [])
    return (
        <OffersDisplayPage title={categories[categoryIdNumber]}>
            {offers ? (
                <div className="offers_block">
                    <Grid container spacing={2} className="offers_grid">
                        {offers.map((offer, index) =>
                            <OfferElement key={index} offerData={offer} />
                        )}
                    </Grid>
                </div>
            ) : (
                <>
                    loading...
                </>
            )}
        </OffersDisplayPage>
    );

    async function fetchCategoryOffers(filters: Filters){
        try{
            const params = new URLSearchParams();
                
            if (filters.categoryIndex !== undefined) params.append('categoryId', filters.categoryIndex.toString());
            else { return; }
            if (filters.pageIndex !== undefined) params.append('page', filters.pageIndex.toString());
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize.toString());

            const response = await fetch(`${baseUrl}/offer/filtered-offers?${params.toString()}`, {
                method: 'get',
            })


            if (response.status === 200) {
                const data = await response.json();
                setOffers(data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default CategoryPage;