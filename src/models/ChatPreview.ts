import { Message } from "./Message";

export interface ChatPreview {
    id: string,
    isUnread: boolean,
    senderName: string,
    offerTitle: string,
    lastMessage?: Message
}