import { useEffect, useState } from "react"
import "./../styles/messaging.css"
import { useSearchParams } from "react-router-dom"

export const Messaging = () => {
    const conversations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const handleMessageCardClick = (conversationId) => {
        setSelectedConversation(conversationId)
    }

    useEffect(() => {
        const user_id = searchParams.get('user_id')
        console.log(user_id)
    }, [])

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
                {selectedConversation ? <>{selectedConversation}</> : <>Choose a conversation to see the messages</>}
            </div>
        </div>
    )
}