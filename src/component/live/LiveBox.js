import React from "react";
import "./css/LiveBox.css";
import { useNavigate } from "react-router-dom";

const LiveBox = (props) => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate(`/chat?chatboxname=${encodeURIComponent(props.name)}&joinedPeople=${props.joinedPeople}`);
    };

    return (
        <div className="list-box">
            <img className="chat-box-img" src={props.image} />
            <div className="chat-box-content">
                <div className="chat-box-basic-info">
                    <div className="chat-box-name"><strong>{props.name}</strong></div>
                    <div className="chat-box-date">{props.period}</div>
                    <div className="chat-box-address">{props.city} {props.local} {props.location}</div>
                </div>
                <div className="chat-box-join-info">
                    <div className="chat-box-liked-content">
                        <img className="chat-box-ic-liked" src={require('../../assets/images/ic_person.png')} />
                        <div className="chat-box-liked">{props.joinedPeople}명이 와글와글</div>
                    </div>
                    <div className="chat-box-point">Ⓒ100P</div>
                    <button className="join-button" onClick={handleJoinClick}><strong>JOIN</strong></button>
                </div>
            </div>
        </div>
    );
};

export default LiveBox;
