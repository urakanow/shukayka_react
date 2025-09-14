"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import Error from "@/components/Error";
import AuthInputField from "../../AuthInputField";
import AuthPage from "../../AuthPage";
import { useRouter, useSearchParams } from "next/navigation";
import auth_styles from "../../page.module.css";

function RestorePasswordPage() {
    const { baseUrl } = useAuth();
    const password_image = "password_icon_vilhyw";

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");

    const [sendingStatus, setSendingStatus] = useState("not sent");

    const [error, setError] = useState("");

    useEffect(() => {
        if(token == undefined){
            console.log("undefined")
        }
        validateToken();
    }, [])


    return (
        <AuthPage title="Створення пароля">
            <small className='auth_medium_text'>
                {sendingStatus === "unauthorized" ? (
                <>
                    Виникла проблема з вашим запитом.<br />
                    Будь ласка поверніться до сторінки входу<br />
                    та слідуйте інструкціям
                </>
                ) : ( sendingStatus === "success" ? (
                    <>
                        Ваш пароль відновлено.<br />
                        Повертайтеся на сторінку входу
                    </>
                ) : (
                    <>
                        введіть новий пароль
                    </>
                )
                )}
            </small>

            {sendingStatus === "unauthorized" || sendingStatus === "success"? (
                <button className='auth_button auth_medium_heading' onClick={() => router.push("/auth/login")}>Повернутися</button>
            ) : (
                <form className={auth_styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    setSendingStatus("sending")
                    restorePassword();
                }}>
                    <AuthInputField type="password" cldImg={password_image} placeholder="Новий пароль"
                    onChange={(e) => setNewPassword(e.target.value)} />
        
                    <div className={auth_styles.field_small_container}>
                        <input type='submit' disabled={sendingStatus === "sending"} className={`primary-button ${sendingStatus === "sending" ? "disabled_button" : ""}`} value={"Змінити пароль"}></input>

                        {sendingStatus !== "unauthorized" && sendingStatus !== "success" && <small className={`${auth_styles.link} `}><Link href={"/auth/login"}>Назад до входу</Link></small>}
                    </div> 
                    
                    {error && <Error text={error} />}
                </form>
            )}

        </AuthPage>
    );

    async function validateToken() {
        try{
            const response = await fetch(`${baseUrl}/user/validate-restore-token`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(token)
            });

            if(response.ok){
                const data = await response.json();
                setSendingStatus("validated")
            }
            else if(response.status === 401){
                setError("token invalid or expired");
                setSendingStatus("unauthorized");
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setSendingStatus("error");
            setError("unexpected error. please try again later");
        }
    }

    async function restorePassword(){
        try{
            const response = await fetch(`${baseUrl}/user/restore-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify({ token, newPassword })
            });

            if(response.ok){
                setSendingStatus("success")
            }
            else if(response.status === 401){
                setError("token invalid or expired");
                setSendingStatus("unauthorized");
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setSendingStatus("error");
            setError("unexpected server error. please try again later");
        }
    }    
}

export default RestorePasswordPage;