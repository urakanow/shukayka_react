"use client"
import { OrderStatus } from "@/enums/OrderStatus";
import { OrderPreview } from "@/models/OrderPreview";

interface OrderProps {
    data: OrderPreview,
}

function Order({ data }: OrderProps) {
    return (
        <div className="horizontal_container">
            <div className="vertical_container">
                <span>{data.offerTitle}</span>
                <span>{data.orderId}</span>
            </div>

            <span>{OrderStatus[data.status]}</span>
        </div>
    );
}

export default Order;