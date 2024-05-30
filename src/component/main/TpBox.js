import React from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useNavigate를 import
import './css/TpBox.css';

const TpBox = ({ popupId, imgSrc, productName, popupPeriod, likeCount }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleDetailClick = () => {
    navigate(`/popupdetail/${popupId}`); // 상세 페이지로 이동
  };

  return (
    <div className="tpbox">
      <img src={imgSrc} alt="Product" className="tpbox-img" />
      <div className="tpbox-heart">
        <img src={require("../../assets/images/mainboxheart.png")} alt="Heart" />
        <span>{likeCount}</span>
      </div>
      <div className="tpbox-inner">
        <div className="tpbox-name">{productName}</div>
        <div className="tpbox-date">{popupPeriod}</div>
        <button className="tpbox-btn" onClick={handleDetailClick}>상세보기</button>
      </div>
    </div>
  );
};

export default TpBox;
