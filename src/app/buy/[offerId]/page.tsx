"use client"
import { useAuth } from "@/components/AuthContext";
// import RegularButton from "@/components/RegularButton";
import RegularSubmit from "@/components/RegularSubmit";
import TextInputField from "@/components/TextInputField";
import useApi from "@/hooks/UseApi";
import { DeliveryData } from "@/models/DeliveryData";
import { Offer } from "@/models/Offer";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DepartmentDropdown from "./DepartmentDropdown";
import styles from './styles.module.css';

function BuyPage() {
    const { authorizedRequest } = useApi();
    const { baseUrl, accessToken } = useAuth();
    const { offerId } = useParams<{ offerId: string }>();
    const [offerData, setOfferData] = useState<Offer>()
    const [userData, setUserData] = useState<DeliveryData>({
        lastName: '',
        firstName: '',
        email: '',
        phoneNumber: '',
        city: '',
        department: ''
    });

    // const [departmentNumber, setDepartmentNumber] = useState('');
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isDepartment, setIsDepartment] = useState<boolean>(true);//false is postomat

    const router = useRouter();

    // const handleDepartmentNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { value } = e.target;
    //     setDepartmentNumber(value);
        
    //     // Clear any existing timeout
    //     if (debounceTimeoutRef.current) {
    //         clearTimeout(debounceTimeoutRef.current);
    //     }
        
    //     // Only set new timeout if field isn't empty
    //     if (value.trim() !== '') {
    //         debounceTimeoutRef.current = setTimeout(() => {
    //             console.log('User finished typing department number:', value);
    //             if(!userData.city){
    //                 console.log("city is required for the department search")
    //                 return
    //             }
    //             fetchNovaPostDepartments(value);
    //             // Here you would call your actual action (e.g., fetchNovaPostDepartments)
    //         }, 2000); // 2 second delay
    //     }
    // };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    useEffect(() => {
        console.log("department", userData.department)
    }, [userData.department])

    useEffect(() => {
        fetchUserData();
    }, [accessToken])
    
    useEffect(() => {
        fetchOfferData();
    }, [offerId])
    
    useEffect(() => {
        console.log("is department: ", isDepartment)
    }, [isDepartment])
    
    return (
        <div className={`${styles.container} card`}>
            {offerData?.title}
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                proceedToCheckout();
            }}>
                <TextInputField label="Last name" id="lastName" value={userData.lastName} onChange={handleChange} />
                <TextInputField label="First name" id="firstName" value={userData.firstName} onChange={handleChange} />
                <TextInputField label="Email" id="email" value={userData.email} onChange={handleChange} />
                <TextInputField label="Phone number" id="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
                <TextInputField label="City" id="city" value={userData.city} onChange={handleChange} />
                
                <div className="horizontal_container">
                    <input type="radio" name="deliveryType" className={styles.radio}
                    // checked={isDepartment ? true : false }
                    checked={isDepartment}
                    onChange={() => setIsDepartment(!isDepartment)}
                    />Department
                </div>
                
                <div className="horizontal_container">
                    <input type="radio" name="deliveryType" className={styles.radio}
                    // checked={!isDepartment ? true : false } 
                    checked={!isDepartment}
                    onChange={() => setIsDepartment(!isDepartment)}
                    />Postomat
                </div>
                
                <DepartmentDropdown city={userData.city} isDepartment={isDepartment}
                onSelect={(department: string) => {
                    setUserData(prev => ({
                        ...prev,
                        ["department"]: department
                    }));
                }}/>
                
                <RegularSubmit text="Next" />
            </form>
        </div>
    );
    
    async function proceedToCheckout(){
        console.log("proceed to checkout: ", userData)
        createOrder();
    }

    async function createOrder(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/order/create`,
                method: 'post',
                data: JSON.stringify({
                    offerId: offerId,
                    deliveryAddress: userData.city + ", " + userData.department
                })
            })

            if(response.status === 200){
                // const data = await response.json();

                console.log("new order: ", response)
                router.push(`/checkout/${response.data.id}`)
            }
        } catch(err){
            console.error("failed to create order: ", err)
        }
    }
    
    async function fetchOfferData() {
        try{
            const response = await fetch(`${baseUrl}/offer/offer/${offerId}`, {
                method: 'get',
            })

            if(response.status === 200){
                const data = await response.json();

                setOfferData(data);
            }
        } catch(err){
            console.error("failed to fetch offer data: ", err)
        }
    }

    // async function fetchNovaPostDepartments(query: string) {
    //     try{
    //         const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    //             method: 'post',
    //             body: JSON.stringify({
    //                 "apiKey": "374d971fa3b5e69039dd30184a3b5c6e",
    //                 "modelName": "AddressGeneral",
    
    //                 "calledMethod": "getWarehouses",
    //                 "methodProperties": {
    //                     "FindByString" : `${query}`,
    //                     "CityName" : `${userData.city}`,
    //                     "Language" : "UA",
    //                     "TypeOfWarehouseRef" : "841339c7-591a-42e2-8233-7a0a00f0ed6f"
    //                 },
    //             })
    //         })

    //         if(response.status === 200){
    //             const data = await response.json();

    //             var length = data.data.length
    //             if(length > 20){
    //                 console.log("more specific request required")
    //                 return
    //             }
    //             console.log("nova post departments: ", data)
    //         }
    //     } catch(err){
    //         console.error("failed to fetch offer data: ", err)
    //     }
    // }

    async function fetchUserData(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/user`,
                method: 'get',
            })

            if(response.status === 200){
                // const data = await response.json();

                console.log("personal data: ", response.data)
                setUserData({
                    lastName: response.data.lastName,
                    firstName: response.data.firstName,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    city: response.data.city,
                    department: ''
                });
            }
        } catch(err){
            console.error("failed to fetch user data: ", err)
        }
    }
}

export default BuyPage;