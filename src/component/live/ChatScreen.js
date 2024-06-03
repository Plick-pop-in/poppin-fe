import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Client } from '@stomp/stompjs';
import "./css/ChatScreen.css";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const [inputMessage, setInputMessage] = useState("");

    const handleMessage = (message) => {
        console.log("받은 메시지: ", message.body); // 메시지 확인용 로그
        const body = JSON.parse(message.body);
    
        // ID를 사용하여 중복 확인
        const existingMessage = messages.find(msg => msg.id === body.id);
        if (!existingMessage) {
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, body];
                console.log("업데이트된 messages 상태: ", updatedMessages); // 상태 업데이트 확인용 로그
                return updatedMessages;
            });
        }
    };

    useEffect(() => {
        if (!client) {
            const newClient = new Client({
                brokerURL: "ws://localhost:8080/ws",
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

                newClient.subscribe('/sub/public', (message) => {
                    handleMessage(message);
                });
            };

            newClient.onStompError = (error) => {
                console.error("웹소켓 연결 에러:", error);
            };

            newClient.activate();
        }

        return () => {
            if (client && client.connected) {
                client.deactivate();
            }
        };
    }, [client]);

    useEffect(() => {
        console.log("렌더링된 messages 상태: ", messages); // 상태 변화 확인용 로그
    }, [messages]);

    const sendMessage = () => {
        if (client && client.connected) {
            const chatMessage = {
                type: "MESSAGE",
                content: inputMessage,
                sender: "사용자 닉네임",
                time: new Date().toISOString()
            };

            console.log("보내는 메시지: ", chatMessage); // 메시지 전송 확인용 로그
            client.publish({
                destination: '/pub/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
            setInputMessage("");
        } else {
            console.error("STOMP 연결 실패");
        }
    };

    return (
        <div className="chat-screen">
            <div className="chat-messages">
                {messages.map((message, index) => {
                    console.log("렌더링할 메시지: ", message); // 렌더링 확인용 로그
                    return (
                        <ChatMessage
                            key={index}
                            nickname={message.sender}
                            message={message.content}
                            time={new Date(message.time).toLocaleString()} // ISO 8601 형식을 파싱하여 표시
                        />
                    );
                })}
            </div>
            <div className="chat-input">
                <input
                    className="chat-input-box"
                    type="text"
                    placeholder="메시지를 입력하세요."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                    className="chat-input-button"
                    aria-label="전송"
                    onClick={sendMessage}
                >
                    
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
