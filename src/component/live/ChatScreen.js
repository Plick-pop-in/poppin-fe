import React from "react";
import "./css/ChatScreen.css"; 

const ChatScreen = () => {
    return (
        <div className="chat-screen">
            {/* 채팅이 진행되는 부분을 구현합니다. */}
            <div className="chat-messages">
                {/* 채팅 메시지가 표시될 곳입니다. */}
                {/* 예를 들어, 실시간으로 동적으로 생성되는 채팅 메시지를 여기에 표시합니다. */}
            </div>
            {/* 채팅 입력 창을 구현합니다. */}
            <div className="chat-input">
                <input type="text" placeholder="메시지를 입력하세요..." />
                <button>전송</button>
            </div>
        </div>
    );
};

export default ChatScreen;
