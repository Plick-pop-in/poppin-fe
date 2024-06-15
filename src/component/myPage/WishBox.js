import React from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../heart/Heart";
import "./css/WishBox.css";

const WishBox = (props) => {
    const navigate = useNavigate();

    const clickPopup = (item) => {
        navigate(`/PopupDetail/${item.popupId}`); // 백틱(`)을 사용하여 변수 삽입
    }

    const handleHeartClick = () => {
        window.location.reload();
    }

    return (
        <div className="wish-box">
            <div className="wish-box-content">
                <div className="wish-box-basic-info">
                    {/* <img className="wish-box-ic-liked" src={require('../../assets/images/heartColor.png')} alt="heart_ic" /> */}
                    <span className="heart-box" onClick={handleHeartClick}>
                        <Heart
                            likeCount={props.heart}
                            popupId={props.popupId}
                        />
                    </span>
                    <span className="wish-box-name">{props.name}</span>
                </div>
                <img className="wish-box-img" src={props.image} onClick={() => clickPopup(props)} alt="popup_image"/>
            </div>
        </div>
    );
}


export default WishBox;
