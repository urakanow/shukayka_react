"use client"
import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import Error from '@/components/Error';
import AuthInputField from '../AuthInputField';
import AuthPage from '../AuthPage';
import GoogleLoginComponent from '@/components/GoogleLoginComponent';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import auth_styles from "../page.module.css";

function LoginPage() {
    const login_image = "login_icon_h5yruj";
    const password_image = "password_icon_vilhyw";
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl, setAccessToken } = useAuth();
    const [error, setError] = useState("");

    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || '/';
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get('redirect') || '/';   
    
    return (
        <AuthPage title="Вхід">
            <form className={auth_styles.form} onSubmit={(e) => {
                e.preventDefault();
                signin();
            }}>
                <AuthInputField type="text" cldImg={login_image}
                minLength={3} maxLength={20} placeholder="Логін"
                onChange={(e) => setLogin(e.target.value)} />

                <div className={auth_styles.field_small_container}>
                    <AuthInputField type="password" cldImg={password_image}
                    minLength={8} maxLength={20} placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)} />

                    <small className={`${auth_styles.link} `}><Link href={"/auth/forgot-password"}>Забули пароль?</Link></small>
                </div>

                <div className={auth_styles.field_small_container}>
                    <input className='primary-button' type='submit' value={"Увійти"} />

                    <small className={`${auth_styles.link} `}><Link href={"/auth/signup"} className='change_auth_link'>Немає аккаунта? Створити</Link></small>
                </div>

                {error && <Error text={error} />}
            </form>

            <GoogleLoginComponent />
        </AuthPage>
    );

    async function signin(){
        console.log("signing in");
        try{
            const response = await fetch(`${baseUrl}/user/signin`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });

            await handleResponse(response);
        }
        catch(err){
            console.error(err);
        }
    }
    
    async function handleResponse(response: Response) {
        const data = await response.json();
        if (response.ok) {
            setAccessToken(data.accessToken);
            setError("");
            // navigate(from, {replace: true})
            router.replace(from);
        }
        else {
            setError(data.message);
        }
    }
}

export default LoginPage;