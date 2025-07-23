"use client"
import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import Error from '@/components/Error';
import AuthInputField from '../AuthInputField';
import AuthPage from '../AuthPage';
import GoogleLoginComponent from '@/components/GoogleLoginComponent';
import { useRouter } from 'next/navigation';

function SignUpPage() {
    const login_image = "login_icon_h5yruj";
    const email_image = "restore_password_icon_qdzoys";
    const phone_image = "phone_number_icon_lnxjlg";
    const password_image = "password_icon_vilhyw";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const { baseUrl } = useAuth();
    const [error, setError] = useState("");

    // const navigate = useNavigate();
    const router = useRouter();

    const [isRegistered, setIsRegistered] = useState(false);

    return (
        <AuthPage title='Реєстрація'>
            {!isRegistered ? (
                <>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signup();
                    }}>
                        <div className='auth_input_container vertical_container'>
                            <AuthInputField type="text" cldImg={login_image}
                            minLength={3} maxLength={20} placeholder="Логін"
                            onChange={(e) => setUsername(e.target.value)} />

                            <AuthInputField type="email" cldImg={email_image} placeholder="Ел. пошта"
                            onChange={(e) => setEmail(e.target.value)} />

                            <AuthInputField type="tel" cldImg={phone_image} placeholder="Номер тел."
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern="^(\+38|38)?\s?(0\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$"
                            />

                            <AuthInputField type="password" cldImg={password_image}
                            minLength={8} maxLength={20} placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <input type='submit' className='auth_button auth_medium_heading' value={"Створити"} />

                        {error && <Error text={error} />}
                    </form>

                    <span className='auth_medium_text'>Вже є аккаунт? <Link href={"/auth/login"} className='change_auth_link'>Увійти</Link></span>

                    <GoogleLoginComponent />
                </>
            ) : (
                <>
                    <span className='auth_medium_text'>
                        На вашу електронну пошту було надіслано лист.<br />
                        Слідуйте наведеним там інструкціям<br />
                        для верифікації електронної адреси
                    </span>

                    <button className='auth_button auth_medium_heading' onClick={() => router.push("/auth/login")}>Назад до входу</button>
                </>
            )}
        </AuthPage>
    );

    async function signup() {
        const response = await fetch(`${baseUrl}/user/signup`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({ username, email, phoneNumber, password }),
            credentials: "include"
        });

        await handleResponse(response);
    }

    async function handleResponse(response: Response) {
        if (response.ok) {
            setError("");
            setIsRegistered(true);
        }
        else if(response.status === 409){
            const data = await response.json();
            setError(data.message)
        }
        else {
            setError("Unexpected error. please try again later");
        }
    }
}

export default SignUpPage;