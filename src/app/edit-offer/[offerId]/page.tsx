"use client"
import OfferEditingPage from "@/components/OfferEditingPage";
import { useParams } from "next/navigation";

function EditOfferPage() {
    const { offerId } = useParams();
    const offerIdNumber = parseInt(offerId?.toString() || "") || -1;

    return (
        <OfferEditingPage id={offerIdNumber} />
    );
}

export default EditOfferPage;