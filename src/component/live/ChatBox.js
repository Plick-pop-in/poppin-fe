import React, { useState, useEffect } from "react";
import './css/ChatBox.css';
import axios from "axios";
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import apiURLs from "../../apiURL";
import { useSelector } from 'react-redux'; 

const ChatBox = () => {
    const loginState = useSelector(state => state.loginSlice);

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching user chat list...");
            try {
                const response = await axios.get(apiURLs.chatList, {
                    params: { userId: loginState.id }
                });
                console.log("API response - user chat list:", response.data);
                setChatList(response.data.data);
            } catch (error) {
                console.error("Error fetching user chat list:", error);
            }
        };

        fetchData();
    }, [loginState.id]);

    return (
        <div className="chat-message-list">
            {chatList.map((chat, index) => (
                <Link key={index} to={`/chat?chatboxname=${encodeURIComponent(chat.popupName)}`} className="chat-message-box">
                    <div className="blue-rectangle">
                        <div className="white-inner-rectangle">
                            <img className="message-image" src={require('../../assets/images/ic_message.png')} alt="message-image" />
                            <div className="user-popup-title">
                                {chat.popupName}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ChatBox;
