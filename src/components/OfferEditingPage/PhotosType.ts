import { Photo } from "@/models/Photo";

export type PhotosType = {
    [index: number]: string | Photo | null; 
};