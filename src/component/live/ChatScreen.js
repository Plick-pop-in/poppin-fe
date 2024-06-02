import React from "react";
import ChatMessage from "./ChatMessage"; // ChatMessage 컴포넌트를 가져옵니다.
import "./css/ChatScreen.css"; 

const ChatScreen = () => {
    return (
        <div className="chat-screen">
            <div className="chat-messages">
                {/* 채팅 메시지가 표시될 곳 */}
                <ChatMessage nickname="사용자 닉네임" message="사용자가 보낸 메시지" time="메시지를 보낸 시간" />
                <ChatMessage nickname="사용자 닉네임" message="사용자가 보낸 메시지" time="메시지를 보낸 시간" />
            </div>
            <div className="chat-input">
                <input className="chat-input-box" type="text" placeholder="메시지를 입력하세요." />
                <button className="chat-input-button" aria-label="전송">
                    <img src="/src/assets/images/ic_chat_send.png" alt="" />
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
