import { ChangeEvent, useEffect } from "react";
import useApi from "@/hooks/UseApi";
import { useAuth } from "../AuthContext";
import TextInputField from "../TextInputField";
import styles from './styles.module.css';

interface FormData {
    contacter: string,
    email: string,
    phoneNumber: string,
    address: string,   
}

interface ContactDataBlockProps {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

function ContactDataBlock({formData, setFormData}: ContactDataBlockProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    useEffect(() => {
        fetchPersonalData();
    }, []);

    return (
        <div className={styles.create_offer_page_section}>
            <h1 className="section_heading">Контактні дані</h1>

            <TextInputField value={formData.contacter} onChange={handleChange} id="contacter" label="Контактна особа" />
            
            <TextInputField value={formData.email} onChange={handleChange} id="email" label="Ел. Пошта" />

            <TextInputField value={formData.phoneNumber} onChange={handleChange} id="phoneNumber" label="Номер Телефону" />

            <TextInputField value={formData.address} onChange={handleChange} id="address" label="Місце знаходження" />
        </div>
    );

    async function fetchPersonalData(){
        try {
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/user/get-personal-data`,
            });
    
            if (response.status === 200) {
                var data = response.data;

                if(!formData.contacter){
                    setFormData(prev => ({
                        ...prev,
                        ["contacter"]: `${data.firstName} ${data.lastName}`
                    }));
                }

                if(!formData.email){
                    setFormData(prev => ({
                        ...prev,
                        ["email"]: data.email
                    }));
                }

                if(!formData.phoneNumber){
                    setFormData(prev => ({
                        ...prev,
                        ["phoneNumber"]: data.phoneNumber
                    }));
                }

                if(!formData.address){
                    if(data.address && data.apartmentNumber && data.city && data.postCode){
                        setFormData(prev => ({
                            ...prev,
                            ["address"]: `${data.address}${data.apartmentNumber && ` кв. ${data.apartmentNumber}`}, м. ${data.city} ${data.postCode}`
                        }));//вул. Тараса Шевченка 14 кв. 2, м. Дніпро 42069
                    }
                }
            }
        } catch (err) {
            console.error('Failed to fetch personal data:', err);
        }
    }
}

export default ContactDataBlock;