import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import axios from "axios";
import "swiper/swiper-bundle.css";
import "./css/Main.css";
import TpBox from "./TpBox";
import WpBox from "./WpBox";
import apiURLs from "../../apiURL";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Autoplay]);

const Main = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [top3Popups, setTop3Popups] = useState([]);
  const [inProgressPopups, setInProgressPopups] = useState([]); // 진행중인 팝업 데이터 저장용 상태

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(apiURLs.randomImages);
        console.log("API response:", response.data); // 디버깅을 위해 응답을 출력합니다.
        if (response.data && response.data.data && Array.isArray(response.data.data.popupImgUrls)) {
          setImages(response.data.data.popupImgUrls);
        } else {
          console.error("잘못된 데이터 형식", response.data);
        }
      } catch (error) {
        console.error("응답 가져오기 실패", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchTop3Popups = async () => {
      try {
        const response = await axios.get(apiURLs.top3);
        console.log("Top3 API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setTop3Popups(response.data.data);
        } else {
          console.error("잘못된 데이터 형식", response.data);
        }
      } catch (error) {
        console.error("응답 가져오기 실패", error);
      }
    };

    fetchTop3Popups();
  }, []);

  useEffect(() => {
    const fetchInProgressPopups = async () => {
      try {
        const response = await axios.get(apiURLs.inProgress);
        console.log("In-Progress Popups API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setInProgressPopups(response.data.data);
        } else {
          console.error("잘못된 데이터 형식", response.data);
        }
      } catch (error) {
        console.error("응답 가져오기 실패", error);
      }
    };

    fetchInProgressPopups();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const swiper = new SwiperCore(".image-slider", {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        spaceBetween: 0,
        touch: true,
      });

      return () => {
        swiper.destroy();
      };
    }
  }, [images]);

  return (
    <div className="main-container">
      {/* 이미지 슬라이더 영역 */}
      <div className="image-slider swiper-container" style={{ width: "100%", height: "594px", flexShrink: 0 }}>
        <div className="swiper-wrapper">
          {images.map((image, index) => (
            <div key={index} className="swiper-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 진행중인 팝업 영역 */}
      <div className="popup-text">
        <strong>진행중인 팝업 TOP3</strong>
      </div>
      <div className="popup-text">사람들에게 인기 있는 팝업</div>
      <div className="popup-section" style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "30px" }}>
        {top3Popups.map((popup, index) => (
          <TpBox
            key={index}
            popupId={popup.popupId} // popupId를 전달
            imgSrc={popup.popupImage}
            productName={popup.popupName}
            popupPeriod={popup.popupPeriod}
            likeCount={popup.likeCount}
            style={{ marginRight: index < top3Popups.length - 1 ? "32px" : "0" }}
          />
        ))}
      </div>

      {/* 진행중인 전국 팝업 정보 */}
      <div className="continue-text" style={{ marginTop: "30px", marginLeft: "56px", textAlign: "left" }}>
        <strong>진행중인 전국 팝업 정보</strong>
        <div>진행중인 전국 팝업을 둘러보세요.</div>
      </div>
      <div className="whbox-section" style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "30px" }}>
        {inProgressPopups.slice(0, 5).map((popup, index) => (
          <WpBox
            key={index}
            imgSrc={popup.popupImageUrl}
            productName={popup.popupName}
            popupPeriod={popup.popupPeriod}
            style={{ marginRight: index < 4 ? "111px" : "0" }}
          />
        ))}
      </div>
      <div className="main-bottom">
        <button className="mainBtn" onClick={()=>{navigate("/popup");}}>Load more</button>
      </div>
    </div>
  );
};

export default Main;
