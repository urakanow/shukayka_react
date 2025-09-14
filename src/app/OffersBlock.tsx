import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { Filters } from "@/models/Filters";
import OfferElement from "@/components/OfferElement";
import DefaultOfferElement from "./DefaultOfferElement";
import styles from './page.module.css';

interface OffersBlockProps {
    categoryIndex: number
}

function OffersBlock({ categoryIndex }: OffersBlockProps) {
    const { categories: options, baseUrl } = useAuth();
    const [offers, setOffers] = useState([])

    const router = useRouter();

    const pageSize = 4;

    useEffect(() => {
        FetchFilteredOffers({
            categoryIndex: categoryIndex,
        })
    }, [categoryIndex])

    return (
        <div className={styles.offers_block}>
            {/* <h1 className={styles.category_name}>{options[categoryIndex]}</h1> */}
            <h1 className="text-xl">{options[categoryIndex]}</h1>

            <Grid container spacing={2} className={styles.offers_grid}>
                {offers.map((offer, index) =>
                    <OfferElement key={index} offerData={offer} />
                )}

                {Array.from({ length: Math.max(0, pageSize - offers.length) }).map((_, index) => (
                    <DefaultOfferElement key={index}/>
                ))}

            </Grid>

            {/* <button className={styles.see_more} onClick={() => router.push(`/categories/${categoryIndex}`)}>Див. більше</button> */}
            <button className={`${styles.see_more} text-base-link`} onClick={() => router.push(`/categories/${categoryIndex}`)}>Див. більше</button>
        </div>
    );


    async function FetchFilteredOffers(filters: Filters ){
        try{
            const params = new URLSearchParams();
                
            if (filters.categoryIndex != undefined) params.append('categoryId', filters.categoryIndex.toString());
            if (filters.pageIndex != undefined) params.append('page', filters.pageIndex.toString());
            if (filters.pageSize != undefined) params.append('pageSize', filters.pageSize.toString());

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

export default OffersBlock;