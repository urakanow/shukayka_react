"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/UseApi";
import { useAuth } from "../AuthContext";
import ContactDataBlock from "./ContactDataBlock";
import PhotosBlock from "./PhotosBlock";
import GeneralDataBlock from "./GeneralDataBlock";
import { Offer } from "@/models/Offer";
import RegularButton from "../RegularButton";
import Error from "../Error";
import { GeneralData } from "./GeneralData";
import { PhotosType } from "./PhotosType";
import styles from './styles.module.css';
import ProtectedRoute from "../ProtectedRoute";

interface OfferEditingPageProps {
    id?: number
}

function OfferEditingPage({ id }: OfferEditingPageProps) {
    const router = useRouter();
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const [error, setError] = useState("");

    const[generalData, setGeneralData] = useState<GeneralData>({
        title: "",
        description: "",
        category: null,
        price: 0,
        state: null
    });

    const [photos, setPhotos] = useState<PhotosType>({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null
    });

    const [contactData, setContactData] = useState({
        contacter: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        if(id){
            console.log("fetching");
            fetchMyOffer();
        }
    }, [id])

    return (
        <ProtectedRoute>
            <div className={`card ${styles.create_offer_page_container}`}>
                <GeneralDataBlock setGeneralData={setGeneralData} generalData={id ? generalData : undefined}/>

                <PhotosBlock photos={photos} setPhotos={setPhotos}/>

                <ContactDataBlock formData={contactData} setFormData={setContactData} />

                <button className="primary-button" onClick={id ? editOffer : createOffer}>{id ? "Зберегти" : "Додати Оголошення"}</button>

                {error && <Error text={error} />}
            </div>
        </ProtectedRoute>
    );

    function initializeData(offerData: Offer){
        console.log(offerData.title)
        setGeneralData({
            title: offerData.title,
            description: offerData.description,
            category: offerData.category,
            price: offerData.price,
            state: offerData.state
        })

        setPhotos(
            Array.from({ length: 8 }, (_, index) => offerData.images[index] || null)
            .reduce((acc, img, idx) => ({ ...acc, [idx]: img }), {})
        );

        setContactData({
            contacter: offerData.contacter,
            email: offerData.email,
            phoneNumber: offerData.phoneNumber,
            address: offerData.address,
        })
    }

    async function fetchMyOffer() {
        try{
            console.log(id);
            const response = await authorizedRequest({
                url: `${baseUrl}/offer/my-offer/${id}`,
                method: "get",
            })

            if (response.status === 200) {
                console.log("offer data: ", response.data)
                initializeData(response.data);
            }

        } catch(err){
            console.error("failed to fetch offers: ", err)
        }
    }
    
    function isFilled() {
        const isGeneralDataValid = 
            generalData.title.trim() !== "" &&
            generalData.description.trim() !== "" &&
            generalData.category !== null &&
            generalData.state !== null &&
            generalData.price > 0;

        const isContactDataValid = 
            contactData.contacter.trim() !== "" &&
            contactData.email.trim() !== "" &&
            contactData.phoneNumber.trim() !== "" &&
            contactData.address.trim() !== "";

        const isPhotoValid = photos[0] !== null;

        return isGeneralDataValid && isContactDataValid && isPhotoValid;
    }

    function showError(message: string){
        console.error(message);
        setError(message);
    }

    async function createOffer(){
        if(!isFilled()){
            showError("not all fields are filled or filled incorrectly")
            return;
        }

        try {
            const formData = new FormData();
                
            Object.entries(generalData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(contactData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(photos).forEach(([key, value]) => {
                if(value == null){
                    return;
                }
                
                const matches: RegExpMatchArray | null = null;
                if(typeof value === 'string'){
                    const matches = value.match(/^data:(.+?);base64/);
                }
                else if('url' in value){
                    const matches = value.url.match(/^data:(.+?);base64/);
                }

                // Extract the real MIME type from the Data URL
                
                // const matches = value.match(/^data:(.+?);base64/);
                const mimeType = matches?.[1] || 'image/png'; // Fallback to PNG if unknown
                
                // Map MIME type to correct extension
                const extension = mimeType.split('/')[1] || 'png';
                
                // Create file with proper extension
                if(typeof value !== 'string' && 'url' in value){
                    console.log("cloudinary object");
                    return;
                }
                const file = dataURLtoFile(value, `image_${key}.${extension}`);
                formData.append("Images", file);
            });
            
            console.log("form data: ", formData);

            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/offer/create-offer`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            
            console.log("got response")
            if (response.status === 200) {
                console.log("Offer created successfully");
                router.push("/");
            }
        } catch (err) {
            console.error('Failed to create offer:', err);
        }
    }

    async function editOffer(){
        if(!isFilled()){
            showError("not all fields are filled or filled incorrectly")
            return;
        }

        try {
            if(id === undefined){
                return;
            }

            const formData = new FormData();

            formData.append("id", id.toString());
                
            Object.entries(generalData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(contactData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Object.entries(photos).forEach(([key, value]) => {
                console.log("photo ", key, " ", value);

                if(value == null){
                    return;
                }

                if (typeof value === 'string'){
                    console.log("image file")
                    const matches = value.match(/^data:(.+?);base64/);
                    const mimeType = matches?.[1] || 'image/png'; // Fallback to PNG if unknown
                    
                    // Map MIME type to correct extension
                    const extension = mimeType.split('/')[1] || 'png';
                    
                    // Create file with proper extension
                    const file = dataURLtoFile(value, `image_${key}.${extension}`);
                    // formData.append("Images", file);
                    // formData.append(`Images[${key}].FileImage`, file);
                    formData.append(
                        `Images`,
                        JSON.stringify({
                            cloudinaryImage: null,
                            FileImage: file
                        })
                        // file
                    );

                }
                else if('url' in value){
                    console.log("cloudinary object")
                    formData.append(
                        `Images`,
                        JSON.stringify({
                            id: value.id,
                            url: value.url,
                            offerId: value.offerId
                        })
                    );
                }
                else{
                    console.log("unexpected data type")
                }

                // Extract the real MIME type from the Data URL
            });
            
            console.log(formData);

            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/offer/edit-offer`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
    
            if (response.status === 200) {
                console.log("Offer edited successfully");
                // navigate("/");
            }
        } catch (err) {
            console.error('Failed to edit offer:', err);
        }        
    }

    function dataURLtoFile(dataurl: string, filename: string) {
        const arr = dataurl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/png';
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);
        
        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        
        return new File([u8arr], filename, { type: mime });
    }
}

export default OfferEditingPage;