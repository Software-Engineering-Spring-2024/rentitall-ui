import { useEffect, useState, useRef } from "react";
import "./../styles/messaging.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { collection, addDoc, onSnapshot, query, where, setDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useUser } from "../hooks/UserContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const Messaging = () => {
    const { user, loginData } = useUser();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const conversationsRef = collection(db, 'conversations');
    const [sendToUser, setSendToUser] = useState('');
    const [otherUserDetails, setOtherUserDetails] = useState([]);
    const [userStatuses, setUserStatuses] = useState({}); // Stores the online status of users

    const handleMessageCardClick = (conversationId) => {
        setSelectedConversation(conversationId);
        setNewMessage('');
    };

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
        await getUserConversations(sendToUser);
    };

    const getUserConversations = async (secondUserId) => {
        const conversationsQuery = query(conversationsRef, where('users', 'array-contains', user.user_id));
        const unsubscribe = onSnapshot(conversationsQuery, (querySnapshot) => {
            const conversationsArray = [];
            let isNewChat = true;
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                if (secondUserId && docData.users.includes(secondUserId)) {
                    isNewChat = false;
                    setSelectedConversation(docData);
                }
                conversationsArray.push(docData);
            });
            setConversations(conversationsArray);
            if (secondUserId && isNewChat) {
                const newConversation = {
                    users: [user.user_id, secondUserId],
                    messagesId: uuidv4(),
                    isNew: true
                };
                setSelectedConversation(newConversation);
                setConversations(prevConversations => [...prevConversations, newConversation]);
            }
        });

        return () => unsubscribe();
    };

    const getEachOtherUserDetailById = (id) => {
        // Enhance this function to also return online status
        const userDetails = otherUserDetails.find(u => u.user_id === id);
        const onlineStatus = userStatuses[id] ? "Online" : "Offline";
        return { ...userDetails, onlineStatus };
    };

    useEffect(() => {
        const getAllUserDetailsById = async () => {
            let userIds = [];
            conversations.forEach(conversation => {
                conversation.users.forEach(u => {
                    if (u !== user.user_id) {
                        userIds.push(u);
                    }
                });
            });
            const response = await axios.post(`${process.env.REACT_APP_LOGIN_SERVICE}/get-multiple-user-details-by-id`, {
                userIds: userIds
            });
            setOtherUserDetails(response.data.userDetails);

            // Fetch online status for each user
            userIds.forEach(userId => {
                const statusRef = doc(db, "userStatus", userId);
                onSnapshot(statusRef, (doc) => {
                    const data = doc.data();
                    setUserStatuses(prevStatuses => ({
                        ...prevStatuses,
                        [userId]: data?.online
                    }));
                });
            });
        };

        if (conversations.length > 0) {
            getAllUserDetailsById();
        }
    }, [conversations]);

    useEffect(() => {
        if (selectedConversation) {
            const unsubscribe = onSnapshot(doc(db, "messages", selectedConversation.messagesId), (doc) => {
                const data = doc.data();
                if (data && data.messages) {
                    setMessages(data.messages);
                }
            });

            return () => unsubscribe();
        }
    }, [selectedConversation]);

    useEffect(() => {
        const user_id = searchParams.get('user_id');
        if (loginData.isLoggedIn) {
            getUserConversations(user_id);
        }
    }, [loginData.isLoggedIn]);

    if (!loginData.isLoggedIn) {
        return <>Please sign in</>;
    }

    return (
        <div id="Messaging">
            <div className="message-cards-window-wrapper">
                <div className="message-cards-window">
                    {conversations.map((conversation) =>
                        conversation?.users?.length > 2 ? (
                            <div className="message-card" onClick={() => handleMessageCardClick(conversation)}>Group Chat id: {conversation.messagesId}</div>
                        ) : (
                            conversation?.users && 
                            <div
                                key={conversation.messagesId}
                                className={"message-card " + (selectedConversation?.messagesId === conversation?.messagesId ? 'selected' : '')}
                                onClick={() => handleMessageCardClick(conversation)}
                            >
                                {getEachOtherUserDetailById(conversation.users.filter(u => u !== user.user_id)[0]).username + " (" + getEachOtherUserDetailById(conversation.users.filter(u => u !== user.user_id)[0]).onlineStatus + ")"}
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="messages-window-wrapper">
                {/* Messages and other components */}
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
    );
};
