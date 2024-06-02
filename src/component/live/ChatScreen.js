import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage"; // ChatMessage 컴포넌트를 가져옵니다.
import { Client } from '@stomp/stompjs'; // 필요한 모듈만 가져옵니다.
import "./css/ChatScreen.css"; 

const ChatScreen = () => {
    const [messages, setMessages] = useState([]); // 채팅 메시지를 저장할 상태 변수
    const [client, setClient] = useState(null); // STOMP 클라이언트 상태 변수

    useEffect(() => {
        // STOMP 클라이언트 생성
        const newClient = new Client({
            brokerURL: "ws://localhost:8080/ws", // WebSocket 서버 URL을 지정합니다.
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 5초 후 재연결 시도
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        // 연결이 성공하면 실행될 콜백 함수
        newClient.onConnect = () => {
            console.log("Connected to WebSocket");
            setClient(newClient); // 연결이 성공하면 클라이언트를 상태로 설정
        };

        // 연결이 실패하면 실행될 콜백 함수
        newClient.onStompError = (error) => {
            console.error("Error connecting to WebSocket:", error);
        };

        // STOMP 클라이언트 활성화
        newClient.activate();

        // 컴포넌트가 언마운트될 때 연결 해제
        return () => {
            if (newClient && newClient.connected) {
                newClient.deactivate();
            }
        };
    }, []);

    // 메시지 전송 함수
    const sendMessage = (message) => {
        // 클라이언트가 활성화되어 있고 연결되어 있는지 확인
        if (client && client.connected) {
            // 클라이언트에서 생성한 메시지를 ChatMessage 클래스의 인스턴스로 변환
            const chatMessage = {
                type: "MESSAGE", // 메시지 타입 설정
                content: message.content, // 내용 설정
                sender: message.nickname // 발신자 설정
            };

            // STOMP 클라이언트를 통해 메시지 전송
            client.publish({
                destination: '/pub/chat.sendMessage', // 메시지를 보낼 엔드포인트 지정
                body: JSON.stringify(chatMessage), // 메시지를 JSON 형태로 변환하여 전송
            });
        } else {
            console.error("STOMP connection is not active.");
        }
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
