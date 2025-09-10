"use client"
import { OrderStatus } from "@/enums/OrderStatus";
import { OrderPreview } from "@/models/OrderPreview";
import Link from "next/link";

interface OrderProps {
    data: OrderPreview,
}

function Order({ data }: OrderProps) {
    function getLinkHref(): string{
        switch(data.status){
            case OrderStatus.Unpaid:
                return `checkout/${data.orderId}`;
            case OrderStatus.Paid:
                return `orders/${data.orderId}`;
            default:
                return "my-orders";
        }
    }

    return (
        <Link href={getLinkHref()}>
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