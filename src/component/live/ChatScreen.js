import React, { useState, useEffect } from "react";
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import ChatMessage from "./ChatMessage";
import "./css/ChatScreen.css";

const ChatScreen = ({ key }) => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const loginInfo = useSelector(state => state.loginSlice); // Redux store에서 로그인 정보 가져오기
    const [inputMessage, setInputMessage] = useState(""); // inputMessage 상태 추가

    useEffect(() => {
        if (client && client.connected) {
            client.deactivate();
        }

        const newClient = new Client({
            brokerURL: "ws://www.plick.shop/ws", // WebSocket 주소
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

        return () => {
            if (newClient && newClient.connected) {
                newClient.deactivate();
            }
        };
    }, [key]);

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
                destination: '/pub/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
            setInputMessage(""); // 메시지 전송 후 input 비우기
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
                        value={inputMessage} // inputMessage 값 바인딩
                        onChange={(e) => setInputMessage(e.target.value)} // input 값 변경 시 inputMessage 업데이트
                        onKeyDown={handleKeyDown} // Enter 키 이벤트 핸들러 추가
                    />
                    <button
                        className="chat-input-button"
                        aria-label="전송"
                        onClick={sendMessage}
                    >
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatScreen;
