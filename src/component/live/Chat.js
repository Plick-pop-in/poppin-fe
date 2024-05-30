import React from "react";
import "./css/Chat.css";
import ChatBox from "./ChatBox";
import ChatScreen from "./ChatScreen"; // ChatScreen 컴포넌트를 import합니다.

const Chat = () => {
    return (
        <div className="chat-page-background">
            <div className="chat-page-top">
                <div className="chat-title">
                    눈사람 눙눙이 팝업 스토어
                </div>
                <div className="chat-join-info">
                    <img className="chat-ic-person" src={require('../../assets/images/ic_person.png')} alt="person icon" />
                    <div className="chat-person">100명이 와글와글</div>
                </div>
            </div>
            <div className="chat-white-background">
                <div className="user-chat-list">
                    <div className="user-chat-container">
                        <ChatBox />
                    </div>
                </div>
                <div style={{ marginLeft: "40px" }}> {/* ChatScreen을 오른쪽으로 40px 이동시킵니다. */}
                    <ChatScreen />
                </div>
            </div>
        </div>
    );
};

export default Chat;
