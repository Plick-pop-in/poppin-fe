import React from "react";
import "./css/PopupBox.css";
import { useNavigate } from "react-router-dom";
import Heart from "../heart/Heart";

const PopupBox = (popup) => {
  const navigate = useNavigate();

  const clickPopupButton = (item) => {
    navigate("/popupdetail/" + item.id);
  };

  return (
    <div className="pbox">
      <img
        className="box-img"
        src={popup.image}
        alt={`${popup.image}`}
      />
      <div className="box-heart">
        <Heart
          heart={popup.heart}
          popupId={popup.popupId}
        />
      </div>
      <div className="box-inner">
        <div className="box-name">{popup.name}</div>
        <div className="box-date">
          팝업 기간 {popup.period}
        </div>
        <button className="box-btn" onClick={() => clickPopupButton(popup)}>
          상세보기
        </button>
      </div>
    </div>
  );
};

export default PopupBox;
