import { Photo } from "./Photo"

export interface Offer{
    images: Photo[],
    category: number,
    state: number,
    description: string,
    address: string,
    creationDate: string,
    title: string,
    price: number,
    contacter: string,
    email: string,
    phoneNumber: string
}