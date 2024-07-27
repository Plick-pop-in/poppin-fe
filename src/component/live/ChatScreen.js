import React, { useState, useEffect } from "react";
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import ChatMessage from "./ChatMessage";
import "./css/ChatScreen.css";

const ChatScreen = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const loginInfo = useSelector(state => state.loginSlice);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
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
            console.log("웹소켓 연결 성공");
            setClient(newClient);

            // 각 채팅방에 대한 고유 주제를 구독
            newClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
                handleMessage(message);
            });
        };

        newClient.onStompError = (error) => {
            console.error("웹소켓 연결 에러:", error);
        };

        newClient.activate();

        return () => {
            if (newClient && newClient.connected) {
                newClient.deactivate();
            }
        };
    }, [roomId]); // roomId가 변경될 때마다 useEffect 다시 실행

    useEffect(() => {
        console.log("렌더링된 messages 상태: ", messages);
    }, [messages]);

    const handleMessage = (message) => {
        console.log("받은 메시지: ", message.body);
        const body = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, body]);
    };

    const sendMessage = () => {
        if (client && client.connected) {
            const chatMessage = {
                type: "MESSAGE",
                content: inputMessage,
                sender: loginInfo ? loginInfo.nickname : 'Anonymous',
                time: new Date().toISOString()
            };

            console.log("보내는 메시지: ", chatMessage);
            client.publish({
                destination: `/pub/chat/${roomId}/sendMessage`, // 각 채팅방에 맞는 주제에 메시지 전송
                body: JSON.stringify(chatMessage),
            });
            setInputMessage("");
        } else {
            console.error("STOMP 연결 실패");
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
                    {messages.map((message, index) => (
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
                        placeholder="메시지를 입력하세요."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="chat-input-button"
                        onClick={sendMessage}
                    >
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatScreen;
