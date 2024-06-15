import React from "react";
import "./css/Chat.css";
import ChatBox from "./ChatBox";
import ChatScreen from "./ChatScreen";
import { useLocation, useParams } from "react-router-dom";

const Chat = () => {
    const location = useLocation();
    const { popupName } = useParams(); // React Router의 useParams를 사용하여 URL 파라미터를 받아옴
    const queryParams = new URLSearchParams(location.search);
    const chatboxname = popupName || queryParams.get("chatboxname") || "채팅 이름 찾을 수 없음";
    const joinedPeople = queryParams.get("joinedPeople") || 100; // 기본값을 100으로 설정

    const handleChatBoxClick = () => {
        window.location.reload(); // 페이지를 새로고침
    };

    console.log("chatboxname:", chatboxname);
    console.log("joinedPeople:", joinedPeople);

    return (
        <div className="chat-page-background">
            <div className="chat-page-top">
                <div className="chat-title">
                    {chatboxname}
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
                            <ChatBox onClick={handleChatBoxClick} /> {/* 클릭 핸들러 추가 */}
                        </div>
                    </div>
                    <div style={{ marginLeft: "40px", marginTop: "33px"}}>
                        <ChatScreen key={Date.now()} /> {/* 새로운 키 값 전달 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
