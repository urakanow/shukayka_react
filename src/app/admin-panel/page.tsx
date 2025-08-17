"use client"
import AdminRoute from "@/components/AdminRoute";
import { useAuth } from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import useApi from "@/hooks/UseApi";
import { UserPreview } from "@/models/UserPreview";
import { useEffect, useState } from "react";
import User from "./User";
import { OfferPreview } from "@/models/OfferPreview";
import UsersTab from "./UsersTab";
import OffersTab from "./OffersTab";

enum TabState{
    Users = "users",
    Offers = "offers"
}

function AdminPanel() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [users, setUsers] = useState<UserPreview[]>([]);
    const [offers, setOffers] = useState<OfferPreview[]>([]);
    const [tabState, setTabState] = useState<TabState>(TabState.Users)

    useEffect(() => {
        if(tabState == TabState.Users)
            fetchUsers();
        else
            fetchOffers();
    }, [tabState])

    useEffect(() => {
        console.log("offers changed page: ", offers)
    }, [offers])

    return (
        <ProtectedRoute>
            <AdminRoute>

                <div className="horizontal_container">
                    <button onClick={() => setTabState(TabState.Users)}>users</button>
                    <button onClick={() => setTabState(TabState.Offers)}>offers</button>
                </div>
                
                {tabState == TabState.Users ? (
                    <UsersTab users={users} setUsers={setUsers}/>
                ): (
                    <OffersTab offers={offers} setOffers={setOffers} />
                )}
            </AdminRoute>
        </ProtectedRoute>
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
                setTabState(TabState.Users)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch users:", err);
        }
    }
    
    async function fetchOffers(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/admin/offers`
            })
            
            if(response.status === 200){
                console.log(response.data)
                setOffers(response.data)
                setTabState(TabState.Offers)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch offers:", err);
        }
    }
}

export default AdminPanel;