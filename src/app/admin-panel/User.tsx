import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { UserPreview } from "@/models/UserPreview";

interface UserProps {
    data: UserPreview,
    onDelete: (id: number) => void
}

function User({ data, onDelete }: UserProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    
    return (
        <div className="horizontal_container">
            <span>{data.username}</span>
            <button onClick={deleteUser}>delete</button>
        </div>
    );

    async function deleteUser(){
        console.log("user deleted")
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/admin/delete-user/${data.id}`
            })
            
            if(response.status === 200){
                console.log(response)
                onDelete(data.id)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch users:", err);
        }
    }
}

export default User;