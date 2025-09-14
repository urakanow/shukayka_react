"use client"
import { ChangeEvent, useState } from "react";
import useApi from "@/hooks/UseApi";
import { useAuth } from "@/components/AuthContext";
import TextInputField from "@/components/TextInputField";
import page from './page.module.css';
import typography from '@/styles/typography.module.css';
import { PersonalData } from "@/models/PersonalData";

interface PersonalDataBlockProps {
    data: PersonalData
}

function PersonalDataBlock({ data }: PersonalDataBlockProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const [isChanged, setIsChanged] = useState(false);

    const [formData, setFormData] = useState({
        city: data.city,
        postCode: data.postCode,
        address: data.address,
        apartmentNumber: data.apartmentNumber,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!isChanged){
            setIsChanged(true);
        }

        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    return (
        <div className={`${page.personal_data} card`}>
            <h1 className={typography.semi_large}>Дані доставки</h1>
            <TextInputField value={formData.city} onChange={handleChange} id="city" label="Місто" />

            <TextInputField value={formData.postCode} onChange={handleChange} id="postCode" label="Поштовий індекс" />

            <TextInputField value={formData.address} onChange={handleChange} id="address" label="Адреса" />

            <TextInputField value={formData.apartmentNumber} onChange={handleChange} id="apartmentNumber" label="Номер квартири(якщо присутній)" />

            {isChanged && <button className={`primary-button`} onClick={editUserData} value="">Зберегти</button>}
        </div>
     );

     async function editUserData() {
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/edit-personal-data`,
                method: "put",
                data: JSON.stringify(formData)
            })

            if(response.status === 200){
                setIsChanged(false);
                // setUserData(response.data);
                console.log(response.data.message);
            }
        } catch(err) {
            console.error("failed to fetch user: ", err);
        }
     }
}

export default PersonalDataBlock;