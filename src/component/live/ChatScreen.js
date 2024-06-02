import React from "react";
import "./css/ChatScreen.css"; 

const ChatScreen = () => {
    return (
        <div className="chat-screen">
            <div className="chat-messages">
                {/* 채팅 메시지가 표시될 곳입니다. */}
            </div>
            <div className="chat-input">
                <input className="chat-input-box" type="text" placeholder="메시지를 입력하세요..." />
                <button className="chat-input-button" aria-label="전송">
                    <img src="//src/assets/images/ic_chat_send.png" alt="" />
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
