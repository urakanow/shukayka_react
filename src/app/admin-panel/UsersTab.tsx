import { UserPreview } from "@/models/UserPreview";
import User from "./User";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";

function UsersTab(){
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [users, setUsers] = useState<UserPreview[]>([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="vertical_container">
            {users.map((user, index) => (
                <User data={user} key={index} onDelete={(id) => {
                    setUsers(prev => prev.filter(user => user.id !== id))
                }}/>
            ))}
        </div>
    );
    
    async function fetchUsers(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/admin/users`
            })
            
            if(response.status === 200){
                console.log(response.data)
                setUsers(response.data)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch users:", err);
        }
    }
}

export default UsersTab;