"use client"
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "131530890468-fh6f28mtkb04gs02hva387frkbvieqs1.apps.googleusercontent.com";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    authErrorMessage: string;
    setAuthErrorMessage: (message: string) => void;
    baseUrl: string;
    categories: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children } : {children: ReactNode}) {
    const categories = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];
    const baseUrl:string = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const [accessToken, setAccessToken] = useState<string | null>(null)
    
    useEffect(() => {
        console.log("authcontext baseUrl: ", process.env.NEXT_PUBLIC_BASE_URL)
        setAccessToken(sessionStorage.getItem('accessToken'))
        sessionStorage.setItem('baseUrl', baseUrl);
    }, [])
    
    const [authErrorMessage, setAuthErrorMessage] = useState("");

    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem('accessToken', accessToken);
        } else {
            sessionStorage.removeItem('accessToken');
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{
        accessToken,
        setAccessToken,
        authErrorMessage,
        setAuthErrorMessage,
        baseUrl,
        categories,
        }}>
            <GoogleOAuthProvider clientId={clientId}>
                {children}
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;