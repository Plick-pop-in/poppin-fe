import React from "react";
import { useSelector } from 'react-redux';
import "./css/ChatMessage.css"; 

const ChatMessage = ({ nickname, message, time }) => {
    const currentUserNickname = useSelector(state => state.loginSlice.nickname);
    const isCurrentUser = nickname === currentUserNickname;

    return (
        <div className="chat-message">
            <span className="user-nickname">{nickname}</span>
            <div className={`message-bubble ${isCurrentUser ? 'current-user' : ''}`}>
                {message}
            </div>
            <span className="message-time">{time}</span>
        </div>
    );
};

export default ChatMessage;
