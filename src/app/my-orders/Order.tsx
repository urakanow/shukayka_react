"use client"
import { OrderStatus } from "@/enums/OrderStatus";
import { OrderPreview } from "@/models/OrderPreview";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderProps {
    data: OrderPreview,
}

function Order({ data }: OrderProps) {
    const [href, setHref] = useState<string>("");

    useEffect(() => {
        if(!data){
            return
        }
        getLinkHref();
        console.log("data", data.status, OrderStatus.Paid);
    }, [data])
    
    useEffect(() => {
        console.log("href: ", href)
    }, [href])

    function getLinkHref(): void{
        switch(data.status){
            case 0:
                setHref(`checkout/${data.orderId}`);
                return
            case 1:
                setHref(`orders/${data.orderId}`);
                return
            
        }
    }

    return (
        <Link href={href}>
            <div className="horizontal_container">
                <div className="vertical_container">
                    <span>{data.offerTitle}</span>
                    <span>{data.orderId}</span>
                </div>

                <span>{OrderStatus[data.status]}</span>
            </div>
        </Link>
    );
}

export default Order;