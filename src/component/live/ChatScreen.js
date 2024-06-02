import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Client } from '@stomp/stompjs';
import "./css/ChatScreen.css";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
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

            newClient.subscribe('/topic/public', (message) => {
                console.log("받은 메시지: ", message.body); // 메시지 확인용 로그
                const body = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, body]);
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
    }, []);

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
            console.log("받는 메시지: ", chatMessage); 
            setInputMessage("");
        } else {
            console.error("STOMP 연결 실패");
        }
    };

    return (
        <div className="chat-screen">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        nickname={message.sender}
                        message={message.content}
                        time={new Date(message.time).toLocaleString()} // ISO 8601 형식을 파싱하여 표시
                    />
                ))}
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
