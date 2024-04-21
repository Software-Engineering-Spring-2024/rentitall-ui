import { useEffect, useRef, useState } from "react"
import "./../styles/messaging.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
import { collection, addDoc, onSnapshot, query, where, setDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useUser } from "../hooks/UserContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const Messaging = () => {
    const { user, loginData } = useUser();
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const conversationsRef = collection(db, 'conversations')
    const [sendToUser, setSendToUser] = useState('')
    const [otherUserDetails, setOtherUserDetails] = useState(null)

    const handleMessageCardClick = (conversationId) => {
        setSelectedConversation(conversationId)
        setNewMessage('')
    }

    // useEffect(() => {
    //     console.log(newMessage)
    // }, [newMessage])

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);

        if (!isTyping) {
            setIsTyping(true);
        }
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage.trim() === '') return;

        if (selectedConversation.isNew) {
            await addDoc(conversationsRef, {
                users: [...selectedConversation.users],
                messagesId: selectedConversation.messagesId
            });
        }

        await setDoc(doc(db, "messages", selectedConversation.messagesId), {
            messages: [
                ...messages,
                {
                    id: uuidv4(),
                    text: newMessage,
                    createdAt: Date.now(),
                    sentBy: user.user_id,
                    sentTo: sendToUser
                }
            ]
        });

        setNewMessage('');
        setIsTyping(false);
        clearTimeout(typingTimeoutRef.current);
        await getUserConversations(sendToUser)
    };

    const getUserConversations = async (secondUserId) => {
        const conversationsQuery = query(
            conversationsRef, (where('users', 'array-contains', user.user_id))
        );
        const querySnapshot = await getDocs(conversationsQuery);
        const conversationsArray = []
        let isNewChat = true
        querySnapshot.forEach((doc) => {
            const docData = doc.data()
            if (secondUserId) {
                if (docData.users.includes(secondUserId)) {
                    isNewChat = false
                    console.log('false')
                    setSelectedConversation(docData)
                }
            }
            conversationsArray.push(docData)
        });
        console.log(conversationsArray)
        if (secondUserId) {
            setSendToUser(secondUserId)
        }
        console.log(isNewChat)
        setConversations([...conversationsArray])
        if (secondUserId && isNewChat) {
            const newConversation = {
                users: [user.user_id, secondUserId],
                messagesId: uuidv4(),
                isNew: true
            }
            setSelectedConversation({ ...newConversation })
            setConversations([newConversation])
        }
    }

    const getEachOtherUserDetailById = (id) => {
        console.log(id, otherUserDetails)
        if (otherUserDetails) {
            return otherUserDetails.find(u => u.user_id == id)
        }
        else return id
    }

    // const getName = (userDetails) => {
    //     return `${userDetails.firstName} ${userDetails.lastName}`
    // }

    useEffect(() => {
        const getAllUserDetailsById = async () => {
            let userIds = []
            conversations.forEach(conversation => {
                conversation.users.forEach(u => {
                    if (u != user.user_id) {
                        userIds.push(u)
                    }
                })
            })
            const response = await axios.post(`${process.env.REACT_APP_LOGIN_SERVICE}/get-multiple-user-details-by-id`, {
                userIds: userIds
            });
            console.log(response.data.userDetails)
            setOtherUserDetails(response.data.userDetails)
        }

        if (conversations && conversations.length > 0) {
            getAllUserDetailsById()
        }
        console.log(conversations)
    }, [conversations])

    useEffect(() => {
        const getMessages = async () => {
            if (selectedConversation) {
                if (selectedConversation?.users?.length == 2) {
                    searchParams.set('user_id', selectedConversation.users.filter(u => u != user.user_id)[0]);
                }
                const docSnap = await getDoc(doc(db, "messages", selectedConversation.messagesId))
                console.log(docSnap.data())
                const messagesData = docSnap.data()
                if (messagesData?.messages) {
                    setMessages(messagesData.messages)
                }
                navigate(`?${searchParams.toString()}`, { replace: true });
            }
        }

        getMessages()
        setNewMessage('')
    }, [selectedConversation])

    useEffect(() => {
        const user_id = searchParams.get('user_id')
        console.log(user_id)
        const getTheUserConversations = async () => {
            await getUserConversations(user_id)
        }

        if (loginData.isLoggedIn) {
            getTheUserConversations()
        }
    }, [])

    if (loginData.isLoggedIn) {
        return (
            <div id="Messaging">
                <div className="message-cards-window-wrapper">
                    <div className="message-cards-window">
                        {
                            conversations.map((conversation) =>
                                conversation.users.length > 2 ?
                                    (<div className="message-card" onClick={() => handleMessageCardClick(conversation)}>Group Chat id: {conversation.messagesId}</div>) :
                                    (<div
                                        key={conversation.messagesId}
                                        className={"message-card " +
                                            (selectedConversation?.messagesId == conversation?.messagesId ? 'selected' : '')}
                                        onClick={() => handleMessageCardClick(conversation)}
                                    >
                                        {getEachOtherUserDetailById(conversation.users.filter(u => u != user.user_id)[0]).username}
                                    </div>)
                            )
                        }
                    </div>
                </div>
                <div className="messages-window-wrapper">
                    <div className="messages-window">
                        {selectedConversation ?
                            <>
                                <div className="messages-div">
                                    {
                                        messages.map((message) =>
                                            <div key={message.id} className={"message-bubble " + (message.sentBy == user.user_id ? 'by-me' : '')}>{message.text}</div>
                                        )
                                    }
                                </div>
                                <div className="chat-input-div">
                                    <form onSubmit={handleSubmit} className='chat-input-form'>
                                        <input
                                            type='text'
                                            value={newMessage}
                                            onChange={handleNewMessageChange}
                                            className='chat-input'
                                            placeholder='Type your message here...'
                                        />
                                        <button type='submit' className='chat-submit-button'>
                                            <SendIcon color='white' />
                                        </button>
                                    </form>
                                </div>
                            </>
                            : <div className="no-conversations-msg">
                                {
                                    conversations.length > 0 ? <>Choose a conversation to see the messages</> :
                                        <>There are no conversations present</>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <>Please sign in</>
    }
}