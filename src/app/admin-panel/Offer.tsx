import { useAuth } from "@/components/AuthContext";
import useApi from "@/hooks/UseApi";
import { OfferPreview } from "@/models/OfferPreview";

interface OfferProps {
    data: OfferPreview,
    onDelete: (id: number) => void
}

function Offer({ data, onDelete }: OfferProps) {
    const { baseUrl } = useAuth();
    const { authorizedRequest } = useApi();

    return (
        <div className="horizontal_container">
            <span>{data.title}</span>
            <button onClick={deleteOffer}>delete</button>
        </div>
    );
    
    async function deleteOffer(){
        try{
            const response = await authorizedRequest({
                method: 'delete',
                url: `${baseUrl}/admin/delete-offer/${data.id}`
            })
            
            if(response.status === 200){
                console.log(response)
                onDelete(data.id)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch users:", err);
        }
    }
}

export default Offer;