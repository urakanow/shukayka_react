"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Grid } from "@mui/material";
import { useAuth } from "@/components/AuthContext";
import { Filters } from "@/models/Filters";
import { OfferPreview } from "@/models/OfferPreview";
import { DropdownMenu } from "@/components/DropdownMenu";
import OfferElement from "@/components/OfferElement";
import OffersDisplayPage from "@/components/OffersDisplayPage";

function SearchPage() {
    const router = useRouter();
    const pathname = usePathname();

    const { baseUrl, categories } = useAuth();
    const states = ["Нове", "Вживане", "З дефектом"];
    const searchParams = useSearchParams();
    const filters: Filters = {
        title: searchParams.get('title') || '',
        categoryIndex: Number(searchParams.get('categoryId') || ''),
        state: Number(searchParams.get('state') || ''),
        minPrice: Number(searchParams.get('minPrice') || ''),
        maxPrice: Number(searchParams.get('maxPrice') || ''),
    };
    const [offers, setOffers] = useState<OfferPreview[]>([]);

    const handleFilterChange = (key: string, value: number) => {
        const params = new URLSearchParams(searchParams);
        
        // Update only changed filters
        if (value || value == 0) params.set(key, value.toString());
        else params.delete(key); // Remove empty filters

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleCategoryChange = (index: number) => {
        handleFilterChange("categoryId", index)
    }

    const handleStateChange = (index: number) => {
        console.log("state: ", index);
        handleFilterChange("state", index);
    }

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFilterChange("minPrice", Number(e.target.value));
    }
    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFilterChange("maxPrice", Number(e.target.value));
    }

    useEffect(() => {
        const currentFilters: Filters = {
            title: searchParams.get('title') || undefined,
            categoryIndex: searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
            state: searchParams.has('state') ? Number(searchParams.get('state')) : undefined,
            minPrice: Number(searchParams.get('minPrice')) || undefined,
            maxPrice: Number(searchParams.get('maxPrice')) || undefined,
        };
        search(currentFilters);
    }, [searchParams])

    return (
        <OffersDisplayPage title="Фільтри">
            <DropdownMenu
            items={categories}
            onSelect={(index) => handleCategoryChange(index)}
            initialText="Виберіть категорію"
            selectedIndex={filters?.categoryIndex ? filters?.categoryIndex : undefined}
            />

            <DropdownMenu
            items={states}
            onSelect={(index) => handleStateChange(index)}
            initialText="Виберіть стан"
            selectedIndex={filters?.state ? filters?.state : undefined}
            />

            <input type="number" min={0} defaultValue={filters.minPrice ? filters.minPrice : undefined} placeholder="від" onChange={handleMinPriceChange}/>

            <input type="number" min={1} defaultValue={filters.maxPrice ? filters.maxPrice : undefined} placeholder="до" onChange={handleMaxPriceChange}/>

            <h1 className="large_heading">Результати пошуку</h1>

            {offers ? (
                <div className="offers_block horizontal_container">
                    <Grid container direction="row" sx={{justifyContent: "flex-start"}} spacing={2} className="offers_grid">
                        {offers.map((offer, index) =>
                            <OfferElement key={index} offerData={offer} />
                        )}
                        {offers.length == 0 && <span className="small_text">Не знайдено оголошень, що відповідають пошуку</span>}
                    </Grid>
                    
                </div>
            ) : (
                <>
                    loading...
                </>
            )}
        </OffersDisplayPage>
    );

    async function search(filters: Filters ){
        try{
            const params = new URLSearchParams();
                
            if (filters.pageIndex !== undefined) params.append('page', filters.pageIndex.toString());
            if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize.toString());
            if (filters.title !== undefined) params.append('title', filters.title);
            if (filters.categoryIndex !== undefined) params.append('categoryId', filters.categoryIndex.toString());
            if (filters.state !== undefined) params.append('state', filters.state.toString());
            if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());

            const response = await fetch(`${baseUrl}/offer/filtered-offers?${params.toString()}`, {
                method: 'get',
            })


            if (response.status === 200) {
                const data = await response.json();
                setOffers(data)
                console.log(data)
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
}

export default SearchPage;