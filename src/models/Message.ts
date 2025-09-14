export interface Message {
    id: string;
    chatId: number;
    senderId: number;
    text: string;
    sendingTimeUTC: Date;
}