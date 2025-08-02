"use client"
import useApi from '@/hooks/UseApi';
import Message from './Message';
import styles from './page.module.css'
import typography from '@/styles/typography.module.css';
import { useAuth } from '@/components/AuthContext';
import { useEffect, useState } from 'react';
import { ChatPreview } from '@/models/ChatPreview';

function MessagesBlock() {
    // const profile_picture = "profile_picture_default_icon_t9kx9b";
    const { authorizedRequest } = useApi();
    const { baseUrl } = useAuth();
    const [chats, setChats] = useState<ChatPreview[]>([]);

    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <div className={`${styles.messages} green_rectangle vertical_container`}>
            <h1 className={typography.semi_large}>Повідомлення</h1>
            {/* <Message unread/>

            <Message unread/>

            <Message />

            <Message />

            <Message /> */}
            {chats.map((chat, index) => (
                <Message chat={chat} key={index} unread={chat.isUnread ? true : undefined}/>
            ))}
        </div>
    );

    async function fetchChats(){
        try{
            const response = await authorizedRequest({
                method: 'get',
                url: `${baseUrl}/chat/chats`,
            })
            
            if(response.status === 200){
                setChats(response.data)
            }
        } catch(err: unknown) {
            console.error("Failed to fetch chats:", err);
        }
    }
}

export default MessagesBlock;