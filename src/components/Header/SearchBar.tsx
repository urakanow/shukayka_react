"use client"
import { KeyboardEvent, useRef } from 'react';
import styles from './styles.module.css'
import { CldImage, CldOgImage } from 'next-cloudinary';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);
    const search_image = "search_icon_etyytt";
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    function isOnSearchPage(){
        return pathname === "/search"
    }

    const handleFilterChange = (title: string ) => {
        const params = new URLSearchParams(searchParams);
        
        if (title) params.set("title", title);
        else params.delete("title");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={`${styles.search_bar} small-card`}>
            <CldImage src={search_image} alt='search image' width={37} height={37} angle={77} />
            <input ref={inputRef} type='search' placeholder='Пошук...' className={styles.search_input}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if(e.key === "Enter"){
                    search(e.currentTarget.value);
                }
            }}/>
        </div>
    );

    function search(query: string){
        inputRef.current?.blur();
        if(isOnSearchPage()){
            console.log("is on search page")
            handleFilterChange(query);
        }
        else{
            console.log("is on main page")
            router.push(`/search?${new URLSearchParams({title: query})}`)
        }
        
    }
}

export default SearchBar;