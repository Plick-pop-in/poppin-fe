import React, { useState, useEffect } from "react";
import './css/ChatBox.css';
import axios from "axios";

const ChatBox = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data..."); // 데이터를 가져오는 시작 시점에 로그 출력
            try {
                const response = await axios.get("http://localhost:8080/v1/chat/userchatlist", {
                    params: { userId: 1 }
                });
                console.log("API response - 유저 채팅 리스트 불러오기:", response.data); // API 응답 데이터 로그 출력
                setChatList(response.data.data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching user chat list:", error); // 에러 발생 시 로그 출력
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chat-message-list">
            {chatList.map((chat, index) => (
                <div key={index} className="chat-message-box">
                    <div className="blue-rectangle">
                        <div className="white-inner-rectangle">
                            <img className="message-image" src={require('../../assets/images/ic_message.png')} alt="message-image" />
                            <div className="user-popup-title">
                                {chat.popupName}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* 주석처리된 부분 시작 */}
            <div className="chat-new-box">
                <div className="blue-rectangle">
                    <div className="white-inner-rectangle">
                        <img className="new-message-image" src={require('../../assets/images/ic_new_message.png')} alt="new-message-image" />
                        <div className="user-popup-title">
                            눈사람 눙눙이 팝업스토어
                        </div>
                    </div>
                </div>
            </div>
            {/* 주석처리된 부분 끝 */}
        </div>
    );
};

export default ChatBox;
