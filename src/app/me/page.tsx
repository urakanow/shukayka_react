"use client"
import PersonalDataBlock from './PersonalDataBlock';
import MyOffersBlock from './MyOffersBlock';
import MessagesBlock from '../messages/MessagesBlock';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/UseApi';
import { useAuth } from '@/components/AuthContext';
import RegularButton from '@/components/RegularButton';
import { OfferPreview } from '@/models/OfferPreview';
import ProtectedRoute from '@/components/ProtectedRoute';
import styles from './page.module.css'
import { PersonalData } from '@/models/PersonalData';
import DeliveryDataBlock from './DeliveryDataBlock';

interface UserData {
    address?: string,
    personalData: PersonalData,
    offers: OfferPreview[]
}

function Me() {
    const [userData, setUserData] = useState<UserData>();
    const { authorizedRequest } = useApi();
    const { baseUrl, setAccessToken } = useAuth();

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <ProtectedRoute>
            <div className={`${styles.personal_page_wrapper} horizontal_container`}>
                {userData ? (
                    <>
                        <PersonalDataBlock data={{
                            username: userData.personalData.username,
                            firstName: userData.personalData.firstName,
                            lastName: userData.personalData.lastName,
                            city: userData.personalData.city,
                            postCode: userData.personalData.postCode,
                            address: userData.personalData.address,
                            apartmentNumber: userData.personalData.apartmentNumber,
                            email: userData.personalData.email,
                            phoneNumber: userData.personalData.phoneNumber,
                            profilePicture: userData.personalData.profilePicture
                        }}/>

                        <div className={`${styles.personal_page_right_section} vertical_container`}>
                            {/* <MyOffersBlock offers={userData.offers} /> */}
                            <DeliveryDataBlock data={{
                                username: userData.personalData.username,
                                firstName: userData.personalData.firstName,
                                lastName: userData.personalData.lastName,
                                city: userData.personalData.city,
                                postCode: userData.personalData.postCode,
                                address: userData.personalData.address,
                                apartmentNumber: userData.personalData.apartmentNumber,
                                email: userData.personalData.email,
                                phoneNumber: userData.personalData.phoneNumber,
                                profilePicture: userData.personalData.profilePicture
                            }}/>

                            {/* <MessagesBlock /> */}

                            <div className={styles.deletion_buttons_container}>
                                <button className='secondary-button' onClick={logout}>Вийти</button>
                                <button className='secondary-button' onClick={deleteAccount}>Видалити акаунт</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        loading...
                    </>
                )}
            </div>
        </ProtectedRoute>
     );

     async function fetchUserData() {
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/personal-page`,
                method: "get"
            })

            if(response.status === 200){
                setUserData(response.data);
                console.log(response.data);
            }
        } catch(err) {
            console.error("failed to fetch user: ", err);
        }
    }

    async function logout(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/logout`,
                method: "post"
            })

            if(response.status === 200){
                console.log(response.data.message);
                setAccessToken(null)
                sessionStorage.removeItem('accessToken');
            }

            console.log(response.data.message);
            setAccessToken(null)
            sessionStorage.removeItem('accessToken');
        } catch(err) {
            console.error("failed to logout: ", err);
        }
    }

    async function deleteAccount(){
        setAccessToken(null)
        sessionStorage.removeItem('accessToken');
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/user/delete-user`,
                method: "delete"
            })

            if(response.status === 200){
                console.log(response.data.message);
                setAccessToken(null)
                sessionStorage.removeItem('accessToken');
            }

            console.log(response.data.message);
            setAccessToken(null)
            sessionStorage.removeItem('accessToken');
        } catch(err) {
            console.error("failed to delete: ", err);
        }
    }
}

export default Me;