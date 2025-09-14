"use client"
import useApi from "@/hooks/UseApi";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Message } from "@/models/Message";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Chat } from "@/models/Chat";
import styles from './styles.module.css';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { chatService } from "@/utils/ChatService";
import { LogLevel } from "@microsoft/signalr";

function ChatPage() {
    const { authorizedRequest } = useApi();
    const { baseUrl, accessToken } = useAuth();
    const [response, setResponse] = useState<string | null>(null);
    const { chatId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [chat, setChat] = useState<Chat | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const [offerTitle, setOfferTitle] = useState<string>("");

    useEffect(() => {
        // // Initialize connection
        if(accessToken == null)
            return

        // chatService.startConnection(accessToken);

        // // Register message handler
        // chatService.registerReceiveMessageHandler((newMessage) => {
        //     setMessages(prev => [...prev, newMessage]);
        // });

        // // Join chat room
        if(chatId == null)
            return
        
        // chatService.joinChatRoom(chatId.toString());
        const setupChat = async () => {
            try {
                await chatService.ensureConnection(accessToken);
                await chatService.joinChatRoom(chatId.toString(), accessToken);
                chatService.registerReceiveMessageHandler((newMessage) => {
                    setMessages(prev => [...prev, newMessage]);
                    tryToReadMessage(newMessage);
                });
            } catch (err) {
                console.error('Chat initialization failed:', err);
            }
        };

        setupChat();

        // Cleanup
        return () => {
            chatService.stopConnection();
        };
    }, [chatId, accessToken]);

    useEffect(() => {
        fetchMessages();
        readChat();
    }, [chatId])

    return (
        <ProtectedRoute>
            {response ? (
                <div className={`${styles.chat_page} card`}>
                    <h1>{offerTitle}</h1>
                    <div className={`${styles.chat} vertical_container`}>
                        {messages && messages.map((message, index) => (
                            <span key={index} className={`
                                small-card
                                ${styles.message}
                                ${isMyMessage(message) ? styles.my_message : styles.not_my_message}
                            `}>{message.text}</span>
                        ))}
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }} className={`${styles.send_message_container}`}>
                        <input type="text" className={`${styles.message_input} input small-card`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></input>
                        <input className="primary-button" type="submit" value={"send"} />
                    </form>
                </div>
            ) : (
                <h1>loading...</h1>
            )}
        </ProtectedRoute>
    );

    function tryToReadMessage(message: Message){
        console.log("message received: ", message)
        if(isMyMessage(message)){
            console.log("your own message - not marking as read");
            return;
        }

        readMessage(message.id);
    }

    async function readMessage(messageId: string){
        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/chat/read-message`,
                data: messageId
            })
            
            if(response.status === 200){
                console.log("message marked as read")
            }
        } catch(err: unknown) {
            console.error("Failed to read message:", err);
        }
    }

    async function readChat(){
        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/chat/read-chat`,
                data: chatId
                // data: JSON.stringify({chatId: "a8ef2824-8994-45d8-843b-7eb4d0a85e71"})
            })
            
            if(response.status === 200){
                console.log("chat read")
            }
        } catch(err: unknown) {
            console.error("Failed to read chat:", err);
        }
    }
    function isMyMessage(message : Message): boolean{
        if(accessToken == null) {
            return false;
        }
        
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentUserId = parseInt(decoded.sub || "");
        console.log(`current user id: ${currentUserId}, sender id: ${message.senderId}`)
        return message.senderId == currentUserId;
    }

    async function sendMessage(){
        try{
            const response = await authorizedRequest({
                method: 'post',
                url: `${baseUrl}/chat/${chatId}/message`,
                data: JSON.stringify({chatId, messageText: newMessage})
            })
            
            if(response.status === 200){
                console.log("success")
                setNewMessage("");
            }
        } catch(err: unknown) {
            console.error("Failed to send message:", err);
        }
    }

    async function fetchMessages(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/chat/${chatId}`,
            })
            console.log(response.status)
            if(response.status === 200){
                setResponse(response.data.message);
                setChat(response.data.chat);
                setMessages(response.data.chat.messages);
                setOfferTitle(response.data.chat.offer.title);
            }
        } catch(err: unknown) {
            if (axios.isAxiosError(err)) {
                // Type-safe access to error response
                const errorMessage = err.response?.data?.message || "Chat not found";
                setResponse(errorMessage);
                
                // Optional: Handle specific status codes
                if (err.response?.status === 404) {
                    return;
                }
            } else if (err instanceof Error) {
                console.error("Failed to fetch messages:", err.message);
                setResponse("An unexpected error occurred");
            } else {
                console.error("Unknown error occurred:", err);
                setResponse("Unknown error");
            }
        }
    }
}

export default ChatPage;