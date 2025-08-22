"use client"
import AdminRoute from "@/components/AdminRoute";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TabState } from "./Tabstate";
import { useState } from "react";
import CurrentTab from "./CurrentTab";

function AdminPanel() {
    const [tabState, setTabState] = useState<TabState>(TabState.Users)

    return (
        <ProtectedRoute>
            <AdminRoute>

                <div className="horizontal_container">
                    <button onClick={() => setTabState(TabState.Users)}>users</button>
                    <button onClick={() => setTabState(TabState.Offers)}>offers</button>
                    <button onClick={() => setTabState(TabState.Orders)}>orders</button>
                </div>
                
                <CurrentTab state={tabState} />
            </AdminRoute>
        </ProtectedRoute>
    );
}

export default AdminPanel;