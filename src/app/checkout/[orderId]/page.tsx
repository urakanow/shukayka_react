"use client"
import { useAuth } from "@/components/AuthContext";
import { OrderStatus } from "@/enums/OrderStatus";
import useApi from "@/hooks/UseApi";
import { useParams } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

function CheckoutPage() {
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const { orderId } = useParams<{ orderId: string }>();
    const [isPaid, setIsPaid] = useState<boolean>(false);

    useEffect(() => {
        fetchOrderStatus();
    }, [])

    return (
        <>
        {orderId}
        </>
    );

    async function fetchOrderStatus(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/order/status/${orderId}`,
                method: 'get',
            })

            if(response.status === 200){
                // const data = await response.json();

                if(response.data === OrderStatus.Unpaid){
                    console.log("unpaid")
                }
                else if(response.data === OrderStatus.Paid){
                    console.log("paid")
                }
                else{
                    console.log("dunno")
                }
                // router.push(`/checkout/${response.data.id}`)
            }
        } catch(err){
            console.error("failed to fetch order status: ", err)
        }
    }
}

export default CheckoutPage;