"use client"
import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { OrderInfo } from "@/models/OrderInfo";
import { DateUtil } from "@/utils/DateFormatter";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function OrderPage() {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();
    
    const {orderId} = useParams();
    const [orderData, setOrderData] = useState<OrderInfo>();

    useEffect(() => {
        fetchOrderData();
    }, [orderId])

    return (
        <ul>
            <li>offer title: {orderData?.offerTitle}</li>
            <li>offer price: {orderData?.offerPrice} uah</li>
            <li>delivery address: {orderData?.deliveryAddress}</li>
            <li>payed at: {DateUtil.getDateTime(orderData?.payedAt || "")}</li>
        </ul>
    );

    async function fetchOrderData() {
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/order/order/${orderId}`
            })
            
            if(response.status === 200){
                console.log(response.data)
                setOrderData(response.data)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch order data:", err);
        }
    }
}

export default OrderPage;