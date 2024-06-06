import React, { useState, useEffect } from "react";
import "./css/Map.css";
import apiURLs from "../../apiURL";

const Map = () => {
    const [selectedDate, setSelectedDate] = useState(0);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleRegionSelection = (region) => {
        setSelectedRegion(region);
        setSelectedSubregion(null); // 새로운 지역 선택 시 하위 지역 초기화
    };

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategorySelection = (category) => {
        if (category === "") {
            setSelectedCategories(["fashion", "beauty", "food", "celeb", "digital", "charactor", "living", "game"]);
        } else {
            const index = selectedCategories.indexOf(category);
            if (index === -1) {
                setSelectedCategories([...selectedCategories, category]);
            } else {
                const newCategories = [...selectedCategories];
                newCategories.splice(index, 1);
                setSelectedCategories(newCategories);
            }
        }
    };

    const [selectedSubregion, setSelectedSubregion] = useState(null);
    const handleSubregionSelection = (subregion) => {
        setSelectedSubregion(subregion);
    };

    const handleSearch = () => {
        const searchData = {
            fashion: selectedCategories.includes("fashion"),
            beauty: selectedCategories.includes("beauty"),
            food: selectedCategories.includes("food"),
            celeb: selectedCategories.includes("celeb"),
            digital: selectedCategories.includes("digital"),
            charactor: selectedCategories.includes("charactor"),
            living: selectedCategories.includes("living"),
            game: selectedCategories.includes("game"),
            local: selectedSubregion !== null ? selectedSubregion : "",
            city: selectedRegion !== null ? selectedRegion : "",
            period: selectedDate !== null ? selectedDate : 0
        };

        console.log("조회 데이터:", searchData);

        const queryParams = new URLSearchParams(searchData).toString();
        const apiUrl = `${apiURLs.map}?${queryParams}`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("네트워크 응답이 올바르지 않습니다 " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("API 응답 데이터:", data);
        
            // 데이터가 객체인지 확인
            if (Array.isArray(data.data)) {
                data.data.forEach(popup => {
                    const popupAddress = `${popup.popupCity} ${popup.popupLocal} ${popup.popupLocation}`;
                    console.log("주소: ", popupAddress);       
                });
            } else {
                console.error("API 응답 데이터의 'data'가 배열이 아닙니다.");
            }
        })
        .catch(error => {
           console.error("API 요청 오류:", error);
        });
        
    }
    
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=YOUR_APP_KEY&libraries=services";
        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);
                const geocoder = new window.kakao.maps.services.Geocoder();
            });
        };
        
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    
    return (
        <div className="whole-page">
            <div className="map-page">
                <div className="standards">
                    <div className="date">
                        <div className="date-text" style={{ fontSize: "32px" }}>
                            <strong>날짜</strong>
                        </div>
                        <div className="date-buttons">
                            <button
                                className={"date-button " + (selectedDate === 0 ? "selected" : "")}
                                onClick={() => handleDateSelection(0)}
                            >
                                오늘
                            </button>
                            <button
                                className={"date-button " + (selectedDate === 7 ? "selected" : "")}
                                onClick={() => handleDateSelection(7)}
                            >
                                +7일
                            </button>
                            <button
                                className={"date-button " + (selectedDate === 14 ? "selected" : "")}
                                onClick={() => handleDateSelection(14)}
                            >
                                +14일
                            </button>
                        </div>
                    </div>
                    <div className="region">
                        <div className="region-text" style={{ fontSize: "32px" }}>
                            <strong>지역</strong>
                        </div>
                        <div className="region-buttons">
                            <button
                                className={"region-button " + (selectedRegion === null ? "selected" : "")}
                                onClick={() => handleRegionSelection(null)}
                            >
                                전체
                            </button>
                            <button
                            className={"region-button " + (selectedRegion === "서울" ? "selected" : "")}
                            onClick={() => handleRegionSelection("서울")}
                            >
                            서울특별시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "경기" ? "selected" : "")}
                                onClick={() => handleRegionSelection("경기")}
                            >
                                경기도
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "인천" ? "selected" : "")}
                                onClick={() => handleRegionSelection("인천")}
                            >
                                인천광역시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "부산" ? "selected" : "")}
                                onClick={() => handleRegionSelection("부산")}
                            >
                                부산광역시
                            </button>
                        </div>
                    </div>

                    {selectedRegion === "서울" && (
                        <div className="subregion">
                            <div className="subregion-buttons">
                                <button
                                    className={"subregion-button " + (selectedSubregion === "강남구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("강남구")}
                                >
                                    강남구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "송파구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("송파구")}
                                >
                                    송파구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "영등포구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("영등포구")}
                                >
                                    영등포구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "서초구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("서초구")}
                                >
                                    서초구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "마포구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("마포구")}
                                >
                                    마포구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "서대문구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("서대문구")}
                                >
                                    서대문구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "용산구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("용산구")}
                                >
                                    용산구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "중구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("중구")}
                                >
                                    중구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "종로구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("종로구")}
                                >
                                    종로구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "성동구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("성동구")}
                                >
                                    성동구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "동대문구" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("동대문구")}
                                >
                                    동대문구
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="category">
                        <div className="category-text" style={{ fontSize: "32px" }}>
                            <strong>카테고리</strong>
                        </div>
                        <div className="category-buttons">
                            <button
                                className={"category-button " + (selectedCategories.length === 8 ? "selected" : "")}
                                onClick={() => handleCategorySelection("")}
                            >
                                전체
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("fashion") ? "selected" : "")}
                                onClick={() => handleCategorySelection("fashion")}
                            >
                                패션
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("beauty") ? "selected" : "")}
                                onClick={() => handleCategorySelection("beauty")}
                            >
                                뷰티
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("food") ? "selected" : "")}
                                onClick={() => handleCategorySelection("food")}
                            >
                                음식
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("celeb") ? "selected" : "")}
                                onClick={() => handleCategorySelection("celeb")}
                            >
                                연예
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("digital") ? "selected" : "")}
                                onClick={() => handleCategorySelection("digital")}
                            >
                                가전/디지털
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("charactor") ? "selected" : "")}
                                onClick={() => handleCategorySelection("charactor")}
                            >
                                캐릭터
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("living") ? "selected" : "")}
                                onClick={() => handleCategorySelection("living")}
                            >
                                리빙
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("game") ? "selected" : "")}
                                onClick={() => handleCategorySelection("game")}
                            >
                                게임
                            </button>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <button
                        className={"search-button"}
                        onClick={handleSearch}
                    >
                        <img className="ic-search" src="/images/ic_search.png" alt="ic-search" />
                        조회
                    </button>
                </div>
            </div>
            <div id="map"></div>
        </div>
    );
};

export default Map;
