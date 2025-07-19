import axios, { AxiosProxyConfig, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { useAuth } from '@/components/AuthContext';
import { useTokenRefresh } from './UseTokenRefresh';

export default function useApi() {
    const { accessToken, setAccessToken, baseUrl } = useAuth();
    const { tryToRefreshToken } = useTokenRefresh();

    // const refreshToken = async () => {
    //     try {
    //         const res = await axios.post(`${baseUrl}/user/refresh`, null, {
    //             withCredentials: true // needed to send the cookie
    //         });
    //         setAccessToken(res.data.accessToken);
    //         return res.data.accessToken;
    //     } catch (err) {
    //         setAccessToken(null);
    //         throw new Error("Unable to refresh token");
    //     }
    // };

    // const isTokenExpired = (token: string) => {
    //     if (!token) return true;

    //     try {
    //         const { exp } = jwtDecode(token);
    //         const currentUtcTime = Math.floor(Date.now() / 1000); // Current time in UTC seconds
    //         if(exp !== undefined){
    //             return currentUtcTime >= exp; // Compare as UNIX timestamps
    //         }
    //     } catch (error) {
    //         console.error('Invalid token:', error);
    //         return true;
    //     }
    // };

    // function tryToRefreshToken(accessToken: string | null | undefined) {
    //     if(accessToken === null || accessToken === undefined){
    //         refreshToken();
    //         return;
    //     }

    //     if(isTokenExpired(accessToken)){
    //         refreshToken();
    //     }
    // }

    const authorizedRequest = async (config: AxiosRequestConfig) => {
        // tryToRefreshToken(accessToken);
        
        // if (!token) {
        //     // Return a rejected Promise with an error object
        //     return Promise.reject({
        //         response: {
        //             status: 401,
        //             data: { message: "Unauthorized: No access token available" },
        //             config
        //         },
        //         isAxiosError: true
        //     });
        // }
        
        // if (token === null || isTokenExpired(token)) {
        //     try {
        //         token = await refreshToken();
        //     } catch (refreshError) {
        //         return Promise.reject({
        //             response: {
        //                 status: 401,
        //                 data: { message: "Session expired. Please login again." },
        //                 config
        //             },
        //             isAxiosError: true
        //         });
        //     }
        // }
        const result = await tryToRefreshToken();
        if(result.success){
            console.log("token refreshed succesfully")
        } else if(result.expired){
            return Promise.reject({
                response: {
                    status: 401,
                    data: { message: "Session expired. Please login again." },
                    config
                },
                isAxiosError: true
            });
        }

        const headers: RawAxiosRequestHeaders = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        };

    
        // If not FormData, default to JSON
        if (!(config.data instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
    
        const response = await axios({
            ...config,
            headers,
            withCredentials: true,
        });
        return response;
    };

    return { authorizedRequest };
}
