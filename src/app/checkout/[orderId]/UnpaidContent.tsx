import RegularSubmit from "@/components/RegularSubmit";
import TextInputField from "@/components/TextInputField";
import { useState, ChangeEvent } from "react";

interface PaymentData {
    cardNumber: string,
    cardOwner: string,
    cvv: string,
    expiration: string
}

function UnpaidContent() {
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: "",
        cardOwner: "",
        cvv: "",
        expiration: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <form className="green_rectangle" onSubmit={(e) => {
            e.preventDefault();
            console.log("payment data: ", paymentData)
        }}>
            <TextInputField id="cardNumber" label="card number" onChange={handleChange} />
            <TextInputField id="cardOwner" label="card owner" onChange={handleChange} />
            <TextInputField id="cvv" label="cvv" onChange={handleChange} />
            <TextInputField id="expiration" label="expiration" onChange={handleChange} />
            <RegularSubmit text="pay" />
        </form>
    );
}

export default UnpaidContent;