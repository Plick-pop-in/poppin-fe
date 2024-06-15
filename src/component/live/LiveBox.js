import React, { useCallback } from "react";
import "./css/LiveBox.css";
import { useNavigate } from "react-router-dom";
import useJoinLive from "../live/useJoinLive";

const LiveBox = (props) => {
    const joinLive = useJoinLive(props.popupId);
    const navigate = useNavigate();

    const handleJoinClick = useCallback(async () => {
        try {
            await joinLive(); // joinLive 함수 실행

            // 예시: localStorage에 가입 정보 저장
            localStorage.setItem("joinedInfo", JSON.stringify({
                name: props.name,
                image: props.image,
                city: props.city,
                local: props.local,
                location: props.location,
                period: props.period,
                joinedPeople: props.joinedPeople
            }));

            // 채팅 페이지로 네비게이션
            navigate(`/chat?chatboxname=${encodeURIComponent(props.name)}`);

            // 선택 사항: 변경 사항이 반영된 새로 고침
            window.location.reload(true); // true는 서버에서 새로 고침을 강제로 실행합니다.
        } catch (error) {
            console.error("라이브 참여 중 오류 발생:", error);
            // 오류 처리 방법에 따라 필요한 대로 처리합니다.
        }
    }, [joinLive, navigate, props]);

    return (
        <div className="list-box">
            <img className="chat-box-img" src={props.image} alt="라이브 이미지" />
            <div className="chat-box-content">
                <div className="chat-box-basic-info">
                    <div className="chat-box-name"><strong>{props.name}</strong></div>
                    <div className="chat-box-date">{props.period}</div>
                    <div className="chat-box-address">{props.city} {props.local} {props.location}</div>
                </div>
                <div className="chat-box-join-info">
                    <div className="chat-box-liked-content">
                        <img className="chat-box-ic-liked" src={require('../../assets/images/ic_person.png')} alt="좋아요 아이콘" />
                        <div className="chat-box-liked">{props.joinedPeople}명이 참여 중</div>
                        <div className="chat-box-point">Ⓒ100P</div>
                    <button className="join-button" onClick={handleJoinClick}><strong>JOIN</strong></button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LiveBox;
