"use client"
import ProtectedRoute from "@/components/ProtectedRoute";
import OrdersBlock from "./OrdersBlock";

function MyOrdersPage() {
    return (
        <ProtectedRoute>
            <div className="vertical_container">
                <span>my orders page</span>
                <OrdersBlock />
            </div>
        </ProtectedRoute>
    );
}

export default MyOrdersPage;