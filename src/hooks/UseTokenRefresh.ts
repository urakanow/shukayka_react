import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/components/AuthContext';

export const useTokenRefresh = () => {
    const { setAccessToken, accessToken, baseUrl } = useAuth();
    
    const refreshToken = async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/refresh`, null, {
                withCredentials: true
            });
            setAccessToken(res.data.accessToken);
            return res.data.accessToken;
        } catch (err) {
            setAccessToken(null);
            throw new Error("Unable to refresh token");
        }
    };

    const isTokenExpired = () => {
        if (accessToken === null) return true;
        
        try {
            const { exp } = jwtDecode(accessToken);
            const currentUtcTime = Math.floor(Date.now() / 1000);
            if (exp !== undefined) {
                return currentUtcTime >= exp;
            }
        } catch (error) {
            console.error('Invalid token:', error);
            return true;
        }
    };

    const tryToRefreshToken = async () => {
        if (isTokenExpired()) {
            try {
                await refreshToken();
                return { success: true };
            } catch (err) {
                return { success: false, expired: true };
            }
        }

        return { success: true };
    };

    return { tryToRefreshToken };
};