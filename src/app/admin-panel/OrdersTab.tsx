"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { OrderPreview } from "@/models/OrderPreview";
import Order from "./Order";
import { OrderStatus } from "@/enums/OrderStatus";

function OrdersTab() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [orders, setOrders] = useState<OrderPreview[]>([]);
    
    useEffect(() => {
        fetchOrders();
    }, [])
    
    return (
        <div className="vertical_container">
            {orders.map((order, index) => (
                <Order data={order} key={index}
                onDelete={(id) => {
                    setOrders(prev => prev.filter(order => order.orderId !== id));
                }}
                
                onFakePay={(id) => {
                    setOrders(prevOrders => 
                        prevOrders.map(order => 
                        order.orderId === id 
                            ? { ...order, status: OrderStatus.Paid } 
                            : order
                        )
                    );
                }}
                />
            ))}
        </div>
    );
    
    async function fetchOrders(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/admin/orders`
            })
            
            if(response.status === 200){
                console.log(response.data)
                setOrders(response.data)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch orders:", err);
        }
    }
}

export default OrdersTab;