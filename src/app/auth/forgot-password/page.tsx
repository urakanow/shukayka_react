"use client"
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import Countdown from 'react-countdown';
import Error from '@/components/Error';
import AuthInputField from '../AuthInputField';
import AuthPage from '../AuthPage';

function ForgotPasswordPage() {
    const restore_password_image = "restore_password_icon_qdzoys";
    const { baseUrl } = useAuth();
    const [email, setEmail] = useState("");

    const [sendingStatus, setSendingStatus] = useState("not sent");

    const [buttonText, setButtonText] = useState("Надіслати інструкцію");

    const [error, setError] = useState("");
    
    interface RendererProps {
        minutes: number,
        seconds: number,
        completed: boolean
    }
    
    const renderer = ({ minutes, seconds, completed }: RendererProps) => {
        if (completed) {
            // Render a completed state
            setSendingStatus("send again");
            return;
        } else {
            // Render a countdown
            return <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>;
        }
    };


    useEffect(() => {
        if(sendingStatus === "not sent"){
            return;
        }

        if(sendingStatus === "sending"){
            setButtonText("Надсилання...");
        } else if(sendingStatus === "blocked"){
            setButtonText("Надіслати повторно");
        } else if(sendingStatus === "unauthorized"){
            setError("this email is not registered");
        } else if(sendingStatus === "error"){
            setError("unexpected error. please try again later");
            setButtonText("Надіслати повторно");
        }
    }, [sendingStatus])

    return (
        <AuthPage title='Відновлення пароля'>
            <span className='auth_medium_text'>
                Вам на пошту буде надіслано інструкцію<br/>
                з відновлення пароля
            </span>

            <form onSubmit={(e) => {
                e.preventDefault();
                setSendingStatus("sending")
                forgotPassword();
            }}>
                <AuthInputField type="email" cldImg={restore_password_image} placeholder="Ел. пошта"
                onChange={(e) => setEmail(e.target.value)} />
    
                <div id='send_email_button' className="horizontal_container" style={sendingStatus === "blocked" ? {filter: 'grayscale()'} : undefined}>
                    {sendingStatus === "blocked" && 
                        <div className="auth_input_image_wrapper vertical_container">
                            <Countdown date={Date.now() + 1 * 60 * 1000} renderer={renderer}/>
                        </div>
                    }
                    <input type='submit' disabled={sendingStatus === "blocked" || sendingStatus === "sending"} className={`auth_button auth_medium_heading ${sendingStatus === "blocked" || sendingStatus == "sending"? "disabled_button" : ""}`} value={buttonText}></input>

                </div>
                
                {error && <Error text={error} />}
            </form>


            <span className='auth_medium_text'><Link href={"/auth/login"}>Назад до входу</Link></span>
        </AuthPage>
    );

    async function forgotPassword() {
        try{
            const response = await fetch(`${baseUrl}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(email)

            });

            if(response.ok){
                setSendingStatus("blocked")
                setError("");
            } else if(response.status === 401){
                setSendingStatus("unauthorized")
            }
        }
        catch(err){
            console.error("error: ", err);
            setSendingStatus("error")
        }
    }
}

export default ForgotPasswordPage;