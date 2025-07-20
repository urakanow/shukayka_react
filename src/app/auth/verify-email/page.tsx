"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import AuthPage from "../AuthPage";
import { useSearchParams, useRouter } from "next/navigation";

enum VerificationStatus{
    Sending = "sending",
    Verified = "verified",
    Error = "error"
}

function VerifyEmailPage() {
    const { baseUrl } = useAuth();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    // const navigate = useNavigate();
    const router = useRouter();
    
    const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.Sending);

    useEffect(() => {
        validateToken();
    }, [])
    
    const getVerificationContent = () => {
        switch (status) {
            case VerificationStatus.Verified:
            return (
                <>
                Акаунт верифіковано успішно.<br />
                Тепер можете продовжувати покупки.<br /><br />
                Команда Шукайка бажає вам <br />
                приємного та вигідного шопінгу!<br />
                <button className='auth_button auth_medium_heading' onClick={() => router.push("/auth/login")}>До Входу</button>
                </>
            );
            
            case VerificationStatus.Error:
            return (
                <>
                Виникла проблема з верифікацією.<br />
                Будь ласка, спробуйте пізніше
                </>
            );
            
            case VerificationStatus.Sending:
            return <>Зачекайте...</>;
            
            default:
            return null; // or some default content
        }
    };
    
    return (
        <AuthPage title="Верифікація">
            <span className='auth_medium_text'>
                {getVerificationContent()}
            </span>
        </AuthPage>
    );

    async function validateToken(){
        try{
            const response = await fetch(`${baseUrl}/user/verify-email`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(token)
            });

            if(response.ok){
                setStatus(VerificationStatus.Verified);
                console.log("success")
            }
            else{
                setStatus(VerificationStatus.Error);
                console.log("error")
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setStatus(VerificationStatus.Error); 
        }
    }
}

export default VerifyEmailPage;