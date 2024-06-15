import React from "react";
import "./css/Chat.css";
import ChatBox from "./ChatBox";
import ChatScreen from "./ChatScreen";
import { useLocation } from "react-router-dom";

const Chat = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatboxname = queryParams.get("chatboxname");
    const joinedPeople = queryParams.get("joinedPeople") || 100; // 기본값을 100으로 설정

    console.log("chatboxname:", chatboxname);
    console.log("joinedPeople:", joinedPeople);

    return (
        <div className="chat-page-background">
            <div className="chat-page-top">
                <div className="chat-title">
                    {chatboxname ? chatboxname : "눈사람 눙눙이 팝업 스토어"}
                </div>
                <div className="chat-join-info">
                    <img className="chat-ic-person" src={require('../../assets/images/ic_person.png')} alt="person icon" />
                    <div className="chat-person">{joinedPeople}명이 와글와글</div>
                </div>
            </div>
            <div className="chat-white-background">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="user-chat-list">
                        <div className="user-chat-container">
                            <ChatBox />
                        </div>
                    </div>
                    <div style={{ marginLeft: "40px", marginTop: "33px" }}>
                        <ChatScreen />
                    </div>
                </div>
                <div className="footer-margin" style={{ marginBottom: "20px" }} /> {/* 여기에 마진을 추가 */}
            </div>
        </div>
    );
};

export default Chat;
