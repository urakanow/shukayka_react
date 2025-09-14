"use client"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext';
// import { useLocation, useNavigate } from 'react-router';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// const basename = process.env.REACT_APP_BASENAME;

function GoogleLoginComponent() {
    const { baseUrl, setAccessToken } = useAuth();
    
    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || '/';
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get('redirect') || '/';   
    
    function onError(){
        console.log("error")
    }

    return (
        <div className={`${styles.google_button} small-card`}>
            <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            />
        </div>
    );
    
    async function onSuccess(response: CredentialResponse){
        console.log("success, ", response)
        try{
            const apiResponse = await fetch(`${baseUrl}/googleauth/authorize`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(response.credential),
                credentials: "include"
            });

            const data = await apiResponse.json();
            console.log(data);
            if (apiResponse.ok) {
                setAccessToken(data.accessToken);
                // navigate(from, {replace: true})
                router.replace(from);
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export default GoogleLoginComponent;