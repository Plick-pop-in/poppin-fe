import React, { useState, useEffect } from "react";
import './css/ChatBox.css';
import axios from "axios";
import apiURLs from "../../apiURL";

const ChatBox = ({ userId }) => { // userId를 props로 받도록 수정
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching user chat list..."); // 데이터를 가져오는 시작 시점에 로그 출력
            try {
                const response = await axios.get(apiURLs.chatList, {
                    params: { userId }
                });
                console.log("API response - user chat list:", response.data); // API 응답 데이터 로그 출력
                setChatList(response.data.data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching user chat list:", error); // 에러 발생 시 로그 출력
            }
        };

        fetchData();
    }, [userId]); // userId가 변경될 때마다 fetchData 호출

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

        </div>
    );
};

export default ChatBox;
