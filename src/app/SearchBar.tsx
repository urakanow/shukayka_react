// import { AdvancedImage } from '@cloudinary/react';
import { KeyboardEvent, RefObject, useContext, useEffect, useRef } from 'react';
// import { useAuth } from '../../Shared/AuthContext/AuthContext';
// import { useLocation, useNavigate } from 'react-router';
// import { useSearchParams } from "react-router";

function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);
    // const { baseUrl } = useAuth();
    // const { cld } = useAuth();
    // const search_image = cld.image("search_icon_etyytt");
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
        <div className='search_bar'>
            {/* <AdvancedImage cldImg={search_image} /> */}
            <input ref={inputRef} type='search' placeholder='Пошук...' id='search_input' 
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