import { ReactNode } from "react";
import styles from "./page.module.css";
interface AuthPageProps {
    children: ReactNode,
    title: string
}

function AuthPage({ children, title }: AuthPageProps) {
    return (
        <div className={`${styles.auth_form} card`}>
            <h1 className="large_heading auth_page_heading">{title}</h1>
            
            {children}
        </div>
    );
}

export default AuthPage;