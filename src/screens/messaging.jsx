import { useState } from "react"
import "./../styles/messaging.css"

export const Messaging = () => {
    const conversations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const [selectedConversation, setSelectedConversation] = useState(null)
    const handleMessageCardClick = (conversationId) => {
        setSelectedConversation(conversationId)
    }
    return (
        <div id="Messaging">
            <div className="message-cards-window">
                {
                    conversations.map((conversation) => 
                        <div key={conversation} className="message-card" onClick={() => handleMessageCardClick(conversation)}>conversation - {conversation}</div>
                    )
                }
            </div>
            <div className="messages-window">
                {selectedConversation ? <></> : <>Choose a conversation to see the messages</>}
            </div>
        </div>
    )
}