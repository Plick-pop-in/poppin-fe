import React from "react";
import "./css/ChatMessage.css"; 

const ChatMessage = ({ nickname, message, time }) => {
    return (
        <div className="chat-message">
            <span className="user-nickname">{nickname}</span>
            <div className="message-bubble">{message}</div>
            <span className="message-time">{time}</span>
        </div>
    );
};

export default ChatMessage;
