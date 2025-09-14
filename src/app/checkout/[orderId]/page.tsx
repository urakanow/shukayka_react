"use client"
import { useAuth } from "@/components/AuthContext";
import { OrderStatus } from "@/enums/OrderStatus";
import useApi from "@/hooks/UseApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaidContent from "./PaidContent";
import UnpaidContent from "./UnpaidContent";

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
            {isPaid ? (
                <PaidContent />
            ) : (
                <UnpaidContent />
            )}
        </>
    );

    async function fetchOrderStatus(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/order/status/${orderId}`,
                method: 'get',
            })

            if(response.status === 200){
                if(response.data === OrderStatus.Unpaid){
                    console.log("unpaid")
                    setIsPaid(false)
                }
                else if(response.data === OrderStatus.Paid){
                    console.log("paid")
                    setIsPaid(true)
                }
                else{
                    console.log("dunno")
                    setIsPaid(false)
                }
            }
        } catch(err){
            console.error("failed to fetch order status: ", err)
        }
    }
}

export default CheckoutPage;