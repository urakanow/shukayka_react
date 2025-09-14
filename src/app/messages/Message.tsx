"use client"
import { CldImage } from "next-cloudinary";
import styles from './page.module.css';
import typography from '@styles/typography.module.css';
import { ChatPreview } from "@/models/ChatPreview";
import Link from "next/link";
import { DateUtil } from "@/utils/DateFormatter";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { chatService } from "@/utils/ChatService";

interface MessageProps {
    unread?: boolean,
    chat: ChatPreview
}

function Message({ unread = false, chat }: MessageProps) {
    const { accessToken } = useAuth();
    const profile_picture = "profile_picture_default_icon_t9kx9b";

    // useEffect(() => {
    //     console.log("chat id: ", chat.id)
    //     if(accessToken == null)
    //         return

    //     if(chat.id == null)
    //         return
        
    //     const setupChat = async () => {
    //         try {
    //             await chatService.ensureConnection(accessToken);
    //             await chatService.joinChatRoom(chat.id, accessToken);
    //             chatService.registerReceiveMessageHandler((newMessage) => {
    //                 // setMessages(prev => [...prev, newMessage]);
    //                 chat.isUnread = true;
    //                 chat.lastMessage = newMessage;
    //                 console.log("chat: ", chat)
    //             });
    //         } catch (err) {
    //             console.error('Chat initialization failed:', err);
    //         }
    //     };

    //     setupChat();

    //     return () => {
    //         chatService.stopConnection();
    //     };
    // }, [chat.id, accessToken]);

    return (
        <Link href={`/chat/${chat.id}`}>
            <div className={`${styles.message} ${unread && styles.unread_message} small-card`} style={{zIndex: 5}}>
                {unread && <div className={styles.unread_marker} />}

                <div className="horizontal_container">
                    <CldImage src={profile_picture} alt="" height={60} width={60}/>
                    <div className="vertical_container">
                        <h3 className={typography.small}>{chat.senderName}</h3>
                        <h3 className={typography.small}>{chat.offerTitle}</h3>
                        <span>{chat.lastMessage?.text}</span>
                    </div>
                </div>

                <span className={typography.small_text}>{getLastMessageSendTime()}</span>
            </div>
        </Link>
    );

    function getLastMessageSendTime(){
        if(chat.lastMessage === undefined)
            return ""

        const sendTime = chat.lastMessage.sendingTimeUTC;
        
        if(DateUtil.isToday(sendTime.toString()))
            return DateUtil.getTime(sendTime.toString())
        
        if(DateUtil.isToday((new Date(sendTime).getDate() + 1).toString()))
            return "вчора"
        
        return DateUtil.getDate(sendTime.toString())
    }
}

export default Message;