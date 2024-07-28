import React, { useState, useEffect } from "react";
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import ChatMessage from "./ChatMessage";
import axios from 'axios';
import "./css/ChatScreen.css";

const ChatScreen = ({ roomId, key }) => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const loginInfo = useSelector(state => state.loginSlice);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/chat/${roomId}/getHistory`);
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setMessages([]);
                }
            } catch (error) {
                console.error("Failed to fetch chat history", error);
                setMessages([]);
            }
        };

        fetchMessages();

        if (client && client.connected) {
            client.deactivate();
        }

        const newClient = new Client({
            brokerURL: "ws://plick.shop:8080/ws",
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        newClient.onConnect = () => {
            console.log("WebSocket connected");
            setClient(newClient);

            newClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
                handleMessage(message);
            });
        };

        newClient.onStompError = (error) => {
            console.error("WebSocket error:", error);
        };

        newClient.activate();

        return () => {
            if (newClient && newClient.connected) {
                newClient.deactivate();
            }
        };
    }, [roomId, key]);

    const handleMessage = (message) => {
        console.log("Received message: ", message.body);
        const body = JSON.parse(message.body);
        setMessages(prevMessages => Array.isArray(prevMessages) ? [...prevMessages, body] : [body]);
    };

    const sendMessage = () => {
        if (client && client.connected) {
            const chatMessage = {
                type: "MESSAGE",
                content: inputMessage,
                sender: loginInfo ? loginInfo.nickname : 'Anonymous',
                time: new Date().toISOString()
            };

            console.log("Sending message: ", chatMessage);
            client.publish({
                destination: `/pub/chat/${roomId}/sendMessage`,
                body: JSON.stringify(chatMessage),
            });
            setInputMessage("");
        } else {
            console.error("STOMP connection failed");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            <div className="chat-screen">
                <div className="chat-messages">
                    {Array.isArray(messages) && messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            nickname={message.sender}
                            message={message.content}
                            time={new Date(message.time).toLocaleString()}
                        />
                    ))}
                </div>
            </div>

            <div className="chat-input-wrapper">
                <div className="chat-input">
                    <input
                        className="chat-input-box"
                        type="text"
                        placeholder="Enter your message."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="chat-input-button"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatScreen;
