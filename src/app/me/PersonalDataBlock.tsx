"use client"
import { ChangeEvent, useRef, useState } from "react";
import useApi from "@/hooks/UseApi";
import { useAuth } from "@/components/AuthContext";
import RegularButton from "@/components/RegularButton";
import TextInputField from "@/components/TextInputField";
import page from './page.module.css';
import typography from '@/styles/typography.module.css';
import { PersonalData } from "@/models/PersonalData";
import { CldImage } from "next-cloudinary";
import InputLabel from "@/components/InputLabel";

interface PersonalDataBlockProps {
    data: PersonalData
}

function PersonalDataBlock({ data }: PersonalDataBlockProps) {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const [isChanged, setIsChanged] = useState(false);

    const [changePPVisible, setChangePPVisible] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>(data.profilePicture);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDefaultPicture, setIsDefaultPicture] = useState<boolean>(true);

    const [formData, setFormData] = useState({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        postCode: data.postCode,
        address: data.address,
        apartmentNumber: data.apartmentNumber,
        email: data.email,
        phoneNumber: data.phoneNumber
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

    const handleButtonClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsDefaultPicture(false);
            const objectUrl = URL.createObjectURL(file);
            setPreviewSrc(objectUrl);

            console.log("Selected file:", file);
            // later: upload to server or preview it
        }
    };
    
    return (
        <div className={`${page.personal_data} card`}>
            <h1 className={typography.semi_large}>Особисті дані</h1>

                <div className="field_small_container">
                    <InputLabel htmlFor="profile_picture" text="Фото профілю" />
                    <div className={page.profile_picture_wrapper}
                    onMouseEnter={() => setChangePPVisible(true)}
                    onMouseLeave={() => setChangePPVisible(false)}
                    >
                        {changePPVisible && 
                            // <button className={page.change_profile_picture} onClick={() => setProfileImage("favorite_icon_selected_fj3vta")}/>
                            <button className={page.change_profile_picture} onClick={handleButtonClick}/>
                        }
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {isDefaultPicture ? (
                            <CldImage src={profileImage} id="profile_picture" alt="profile picture" width={100} height={100} />
                        ) : (
                            <img className={page.preview_image} src={previewSrc || ""} />
                        )}
                    </div>
                </div>

            <TextInputField value={formData.username} onChange={handleChange} id="username" label="Ім’я Користувача" />

            <TextInputField value={formData.firstName} onChange={handleChange} id="firstName" label="Ім’я" />

            <TextInputField value={formData.lastName} onChange={handleChange} id="lastName" label="Прізвище" />

            <TextInputField value={formData.phoneNumber} onChange={handleChange} id="phoneNumber" label="Номер телефону" />

            <TextInputField value={formData.email} onChange={handleChange} id="email" label="Ел. Адреса" />

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