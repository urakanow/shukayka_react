import { AccessState } from "@/enums/AccessState";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/models/DecodedToken";

function AdminRoute({ children }: { children: ReactNode}) {
    const { accessToken } = useAuth();
    const [ accessState, setAccessState ] = useState<AccessState>(AccessState.Checking);

    function isAdmin(): boolean{
        if(!accessToken)
            return false;

        const role = jwtDecode<DecodedToken>(accessToken).role;
        return role == "admin";
    }

    useEffect(() => {
        if(!accessToken)
            return

        if(!isAdmin()){
            setAccessState(AccessState.Denied)
            return;
        }

        setAccessState(AccessState.Enabled)
    }, [accessToken])

    switch(accessState){
        case AccessState.Enabled:
            return children;
        case AccessState.Denied:
        //   return <Navigate to="/login" state={{ from: location }} replace />;
            // return null
            return <span>you are not admin</span>
        default:
            return <div>Loading...</div>
    }
}

export default AdminRoute;