import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Heart from "../heart/Heart";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./css/PopupDetail.css";
import apiURLs from "../../apiURL";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const PopupDetail = () => {
  // swiper 파라미터
  const params = {
    spaceBetween: 10,
    slidesPerView: "1",
    centerSlides: true,
    loop: true,
    speed: 600,
    navigation: true,
    pagination: {
      clickable: true,
      type: "bullets",
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    watchOverflow: true, //슬라이드 1개 일 때, pager, button 숨김 여부 설정
    autoHeight: false,
    touchRatio: 0, //드래그 막는 기능
    breakpoints: {
      //화면 사이즈에 따라 보여지는 이미지 개수 조절
      "@1.5": {
        slidesPerView: 2,
        spaceBetween: 2,
      },
    },
    style: {
      "--swiper-pagination-color": "#47ABD9",
      "--swiper-navigation-color": "#47ABD9",
    },
  };

  //url에서 id 값 가져오기
  const { popupId } = useParams();
  const [popup, setPopup] = useState(null);

  //JSON 파일에서 해당 데이터 불러오기
  useEffect(() => {
    const fetchPopupDetail = async () => {
      console.log("popupId :" + popupId);
      if (!popupId) {
        console.error("Popup ID is not defined");
        return;
      }

      try {
        const response = await axios.get(apiURLs.popupdetail + popupId);
        setPopup(response.data.data);
      } catch (error) {
        console.error("Error fetching popup detail:", error);
      }
    };
    fetchPopupDetail();
  }, [popupId]);

  //데이터가 없는 경우 처리
  if (!popup) {
    console.log("NO Popup DATA!!!!!!!");
    return <div>Loading. . . . . . </div>;
  }

  console.log(popupId);
  return (
    <div>
      <div className="popupDetail">
        <div>
          <div className="detail-heart">
            <Heart heart={popup.likeCount} />
          </div>
          <div className="display-flex">
            <div className="detail-name">{popup.popupName}</div>
            <div className="detail-live">
              <button>Live chat</button>
            </div>
          </div>
          <div className="detail-date">{popup.popupPeriod}</div>
          <div className="detail-lo">
            <img src={require("../../assets/images/location.png")} />
            {popup.popupCity} {popup.popupLocal} {popup.popupLocation}
          </div>
        </div>

        <br />
        {/* 슬라이드 배너 */}
        <div className="swiper-container">
          <Swiper {...params}>
            {popup.popupImgUrls.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  className="swiper-img"
                  src={imageUrl}
                  alt={`Image ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="detailBox">
          <div className="detail-title">운영시간</div>
          <div className="detail-content">{popup.popupTime}</div>
        </div>

        <div className="detailBox">
          <div className="detail-title">팝업스토어 소개</div>
          <div className="detail-content dbox">{popup.popupIntro}</div>
        </div>

        <div className="detailBox">
          <div className="detail-title">브랜드 페이지 링크</div>
          <div className="detail-content">
            <a href={popup.popupPageLink}>{popup.popupName}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetail;
