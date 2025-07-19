"use client"
import { KeyboardEvent, RefObject, useContext, useEffect, useRef } from 'react';
// import { useAuth } from '../../Shared/AuthContext/AuthContext';
// import { useLocation, useNavigate } from 'react-router';
// import { useSearchParams } from "react-router";
import styles from './styles.module.css'
import { CldImage, CldOgImage } from 'next-cloudinary';

function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);
    // const { baseUrl } = useAuth();
    // const { cld } = useAuth();
    // const search_image = cld.image("search_icon_etyytt");
    const search_image = "search_icon_etyytt";
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [ searchParams, setSearchParams ] = useSearchParams();


    function isOnSearchPage(){
        return location.pathname === "/search"
    }

    // const handleFilterChange = (title: string ) => {
    //     const params = new URLSearchParams(searchParams);
        
    //     if (title) params.set("title", title);
    //     else params.delete("title");

    //     setSearchParams(params);
    // };

    return (
        <div className={styles.search_bar}>
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
            // handleFilterChange(query);
        }
        else{
            // navigate(`/search?${new URLSearchParams({title: query})}`)
            console.log("is on main page")
            // window.href = `/search`;
            // navigate("/search")
        }
        
    }
}

export default SearchBar;