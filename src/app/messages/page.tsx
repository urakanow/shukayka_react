"use client"
import ProtectedRoute from "@/components/ProtectedRoute";
import MessagesBlock from "./MessagesBlock";

function ChatPage() {
    return (
        <ProtectedRoute>
            <MessagesBlock />
        </ProtectedRoute>
    );
}

export default ChatPage;