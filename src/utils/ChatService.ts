import { Message } from '@/models/Message';
import * as signalR from '@microsoft/signalr';

class ChatService {
    private connection: signalR.HubConnection | null = null;
    private connectionPromise: Promise<void> | null = null;

    async startConnection(accessToken: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/chatHub`, {
                accessTokenFactory: () => accessToken
            })
            .withAutomaticReconnect()
            .build();

        await this.connection.start();
    }

    registerReceiveMessageHandler(callback: (message: Message) => void) {
        this.connection?.on("ReceiveMessage", callback);
        // this.connection?.on("ReceiveMessage", () => {
        //     callback;
        //     console.log("message received")
        // });
    }

    // async ensureConnection(accessToken: string) {
    //     if (!this.connection) {
    //         this.connection = new signalR.HubConnectionBuilder()
    //             .withUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/chatHub`, {
    //                 accessTokenFactory: () => accessToken,
    //                 skipNegotiation: true,  // Recommended for WebSocket-only
    //                 transport: signalR.HttpTransportType.WebSockets
    //             })
    //             .withAutomaticReconnect({
    //                 nextRetryDelayInMilliseconds: retryContext => {
    //                     return Math.min(retryContext.elapsedMilliseconds * 2, 10000);
    //                 }
    //             })
    //             .configureLogging(signalR.LogLevel.Warning)
    //             .build();

    //         this.connectionPromise = this.connection.start()
    //             .catch(err => {
    //                 console.error('SignalR Connection Error:', err);
    //                 this.connection = null;
    //                 this.connectionPromise = null;
    //                 throw err;
    //             });
    //     }

    //     return this.connectionPromise;
    // }
    async ensureConnection(accessToken: string) {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return;
        }

        if (this.connection?.state === signalR.HubConnectionState.Reconnecting || 
            this.connection?.state === signalR.HubConnectionState.Disconnected) {
            return;
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/chatHub`, {
                accessTokenFactory: () => accessToken,
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

        this.connectionPromise = this.connection.start()
            .then(() => {
                this.connectionPromise = null;
            })
            .catch(err => {
                this.connectionPromise = null;
                throw err;
            });

        return this.connectionPromise;
    }

    stopConnection() {
        if (this.connection) {
            this.connection.stop().catch(err => console.error("Stop error:", err));
            this.connection = null;
            this.connectionPromise = null;
        }
    }

    async joinChatRoom(chatId: string, accessToken: string) {
        try{
            await this.ensureConnection(accessToken);
           
            if (this.connection?.state !== signalR.HubConnectionState.Connected) {
                throw new Error('Connection not established');
            }

            await this.connection?.invoke("JoinConversation", `chat-${chatId}`);
        } catch(err) {
            console.error("Failed to join chatroom ", err)
        }
    }

    // stopConnection() {
    //     this.connection?.stop();
    // }
}

export const chatService = new ChatService();