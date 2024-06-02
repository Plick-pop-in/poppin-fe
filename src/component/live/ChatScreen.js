import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage"; // ChatMessage 컴포넌트를 가져옵니다.
import { Client } from '@stomp/stompjs'; // 필요한 모듈만 가져옵니다.
import "./css/ChatScreen.css"; 

const ChatScreen = () => {
    const [messages, setMessages] = useState([]); // 채팅 메시지를 저장할 상태 변수
    let client; // client 변수를 선언합니다.

    useEffect(() => {
        // STOMP 클라이언트 생성
        client = new Client({
            brokerURL: "ws://localhost:8080/ws", // WebSocket 서버 URL을 지정합니다.
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 5초 후 재연결 시도
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        // 연결이 성공하면 실행될 콜백 함수
        const onConnected = () => {
            console.log("Connected to WebSocket");
        };

        // 연결이 실패하면 실행될 콜백 함수
        const onError = (error) => {
            console.error("Error connecting to WebSocket:", error);
        };

        // STOMP 클라이언트에 콜백 함수 등록
        client.activate();

        // 컴포넌트가 언마운트될 때 연결 해제
        return () => {
            client.deactivate();
        };
    }, []);

    // 메시지 전송 함수
    const sendMessage = (message) => {
        // STOMP 클라이언트를 통해 메시지 전송
        // 이 부분은 실제로 서버로 메시지를 전송하는 코드입니다.
        // 서버에서 메시지를 받으면 해당 메시지를 다시 받아올 수 있습니다.
        client.publish({
            destination: '/pub/chat.sendMessage', // 메시지를 보낼 엔드포인트 지정
            body: JSON.stringify(message), // 메시지를 JSON 형태로 변환하여 전송
        });
    };

    return (
        <div className="chat-screen">
            <div className="chat-messages">
                {/* 채팅 메시지가 표시될 곳 */}
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        nickname={message.nickname}
                        message={message.content}
                        time={message.time}
                    />
                ))}
            </div>
            <div className="chat-input">
                <input className="chat-input-box" type="text" placeholder="메시지를 입력하세요." />
                <button
                    className="chat-input-button"
                    aria-label="전송"
                    onClick={() => {
                        const message = {
                            nickname: "사용자 닉네임", // 사용자의 닉네임
                            content: "입력된 메시지", // 입력된 메시지
                            time: new Date().toISOString(), // 현재 시간을 ISO 포맷으로
                        };
                        sendMessage(message); // sendMessage 함수 호출하여 메시지 전송
                    }}
                >
                    <img src="/src/assets/images/ic_chat_send.png" alt="" />
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
