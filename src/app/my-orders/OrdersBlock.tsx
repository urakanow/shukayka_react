"use client"
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { OrderPreview } from "@/models/OrderPreview";
import { useState, useEffect } from "react";
import Order from "./Order";

function OrdersBlock() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    const [orders, setOrders] = useState<OrderPreview[]>([]);
    
    useEffect(() => {
        fetchMyOrders();
    }, [])

    useEffect(() => {
        console.log("orders: ", orders)
    }, [orders])
    
    return (
        <>
            {orders.map((order, index) => (
                <Order data={order} key={index}/>
            ))}
        </>
    );
    
    async function fetchMyOrders(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/order/my-orders`
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

export default OrdersBlock;