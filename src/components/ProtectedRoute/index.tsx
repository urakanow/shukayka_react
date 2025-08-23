// import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useTokenRefresh } from '@/hooks/UseTokenRefresh';
import { usePathname, useRouter } from 'next/navigation';
import { AccessState } from '@/enums/AccessState';

function ProtectedRoute({ children }: { children: ReactNode})  {
    const { accessToken } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const { tryToRefreshToken } = useTokenRefresh();
    const [ accessState, setAccessState ] = useState<AccessState>(AccessState.Checking);

    useEffect(() => {
        const checkToken = async () => {
        setAccessState(AccessState.Checking)
        const refreshResult = await tryToRefreshToken();
        if (refreshResult.success) {
            setAccessState(AccessState.Enabled);
        } else if(refreshResult.expired){
            setAccessState(AccessState.Denied);
        }
        };

        checkToken();
    }, [accessToken])

    useEffect(() => {
        if (accessState === AccessState.Denied) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname || '/')}`);
        }
    }, [accessState, router, pathname]);

    switch(accessState){
        case AccessState.Enabled:
            return children;
        case AccessState.Denied:
        //   return <Navigate to="/login" state={{ from: location }} replace />;
            return null
        default:
            return <div>Loading...</div>
    }
}

export default ProtectedRoute;