import { useAuth } from "@/components/AuthContext";
import { OrderStatus } from "@/enums/OrderStatus";
import useApi from "@/hooks/UseApi";
import { OrderPreview } from "@/models/OrderPreview";

interface OrderProps {
    data: OrderPreview,
    onDelete: (id: string) => void,
    onFakePay: (id: string) => void
}

function Order({ data, onDelete, onFakePay }: OrderProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();

    return (
        <div className="horizontal_container">
            <div className="horizontal_container">
                <div className="vertical_container">
                    <span>{data.offerTitle}</span>
                    <span>{data.orderId}</span>
                </div>

                <span>{OrderStatus[data.status]}</span>
            </div>
            
            {data.status === OrderStatus.Unpaid && (
                <button onClick={fakePay}>fake pay</button>
            )}
            <button onClick={deleteOrder}>delete</button>
        </div>
    );
    
    async function deleteOrder(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/admin/delete-order/${data.orderId}`
            })
            
            if(response.status === 200){
                console.log(response)
                onDelete(data.orderId)
            }
        } catch(err: unknown) {
            console.error("Failed to delete order:", err);
        }
    }

    async function fakePay(){
        try{
            const response = await authorizedRequest({
                method: 'put',
                url: `${baseUrl}/admin/fake-pay/${data.orderId}`
            })
            
            if(response.status === 200){
                console.log(response)
                onFakePay(data.orderId);
            }
        } catch(err: unknown) {
            console.error("Failed to pay order:", err);
        }
    }
}

export default Order;