import { UserPreview } from "@/models/UserPreview";
import User from "./User";
import { Dispatch, SetStateAction } from "react";

interface UsersTabProps {
    users: UserPreview[],
    setUsers: Dispatch<SetStateAction<UserPreview[]>>
}

function UsersTab({ users, setUsers }: UsersTabProps) {
    return (
        <div className="vertical_container">
            {users.map((user, index) => (
                <User data={user} key={index} onDelete={(id) => {
                    setUsers(prev => prev.filter(user => user.id !== id))
                }}/>
            ))}
        </div>
    );
}

export default UsersTab;