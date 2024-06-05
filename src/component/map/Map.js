import React, { useState, useEffect } from "react";
import "./css/Map.css";
import apiURLs from "../../apiURL";

const Map = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleRegionSelection = (region) => {
        setSelectedRegion(region);
    };

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategorySelection = (category) => {
        // 이미 선택된 카테고리인지 확인
        const index = selectedCategories.indexOf(category);

        if (index === -1) {
            // 선택된 목록에 추가
            setSelectedCategories([...selectedCategories, category]);
        } else {
            // 선택된 목록에서 제거
            const newCategories = [...selectedCategories];
            newCategories.splice(index, 1);
            setSelectedCategories(newCategories);
        }
    };

    const [selectedSubregion, setSelectedSubregion] = useState(null);
    const handleSubregionSelection = (subregion) => {
        setSelectedSubregion(subregion);
    };

    const handleSearch = () => {
        // 선택된 정보 수집
        const searchData = {
            fashion: selectedCategories.includes("fashion"),
            beauty: selectedCategories.includes("beauty"),
            food: selectedCategories.includes("food"),
            celeb: selectedCategories.includes("celeb"),
            digital: selectedCategories.includes("digital"),
            character: selectedCategories.includes("character"),
            living: selectedCategories.includes("living"),
            game: selectedCategories.includes("game"),
            local: selectedSubregion,
            city: selectedRegion,
            period: selectedDate
        };
    
        // API 요청 생성
        const queryParams = new URLSearchParams(searchData).toString();
        const apiUrl = `${apiURLs.map}?${queryParams}`;

        // API 요청 보내기
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // 받아온 데이터를 활용하여 필요한 작업 수행
                console.log("API 응답 데이터:", data);
            })
            .catch(error => {
                console.error("API 요청 오류:", error);
            });
    };
    
    

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=744f339bbcbfcf5e57970eef6e98d373&libraries=services";
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);
            });
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
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
                                className={"date-button " + (selectedDate === null ? "selected" : "")}
                                onClick={() => handleDateSelection(null)}
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
                                onClick={() => handleRegionSelection("")}
                            >
                                전체
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "서울특별시" ? "selected" : "")}
                                onClick={() => handleRegionSelection("서울특별시")}
                            >
                                서울특별시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "경기도" ? "selected" : "")}
                                onClick={() => handleRegionSelection("경기도")}
                            >
                                경기도
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "인천광역시" ? "selected" : "")}
                                onClick={() => handleRegionSelection("인천광역시")}
                            >
                                인천광역시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "부산광역시" ? "selected" : "")}
                                onClick={() => handleRegionSelection("부산광역시")}
                            >
                                부산광역시
                            </button>
                        </div>
                    </div>

                    {selectedRegion === "서울특별시" && (
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
                                className={"category-button " +  (selectedCategories.length === 0 ? "selected" : "")}
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
                                className={"category-button " + (selectedCategories.includes("music") ? "selected" : "")}
                                onClick={() => handleCategorySelection("music")}
                            >
                                음악
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
                                className={"category-button " + (selectedCategories.includes("character") ? "selected" : "")}
                                onClick={() => handleCategorySelection("character")}
                            >
                                캐릭터
                            </button>
                            <button
                                className={"category-button " + (selectedCategories.includes("digital") ? "selected" : "")}
                                onClick={() => handleCategorySelection("digital")}
                            >
                                가전/디지털
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

