import { ReactNode } from "react";

interface AuthPageProps {
    children: ReactNode,
    title: string
}

function AuthPage({ children, title }: AuthPageProps) {
    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">{title}</h1>
                {/* <span className='auth_medium_text'>
                    Вам на пошту буде надіслано інструкцію<br/>
                    з відновлення пароля
                </span> */}
                {children}
            </div>
        </div>
    );
}

export default AuthPage;