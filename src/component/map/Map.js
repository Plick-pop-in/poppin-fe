import React, { useState, useEffect } from "react";
import "./css/Map.css";

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
        // 조회 기능 추가
        console.log("조회 버튼 클릭됨");
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
                                onClick={() => handleRegionSelection(null)}
                            >
                                전체
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "Seoul" ? "selected" : "")}
                                onClick={() => handleRegionSelection("Seoul")}
                            >
                                서울특별시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "Gyeonggi" ? "selected" : "")}
                                onClick={() => handleRegionSelection("Gyeonggi")}
                            >
                                경기도
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "Incheon" ? "selected" : "")}
                                onClick={() => handleRegionSelection("Incheon")}
                            >
                                인천광역시
                            </button>
                            <button
                                className={"region-button " + (selectedRegion === "Busan" ? "selected" : "")}
                                onClick={() => handleRegionSelection("Busan")}
                            >
                                부산광역시
                            </button>
                        </div>
                    </div>

                    {selectedRegion === "Seoul" && (
                        <div className="subregion">
                            <div className="subregion-buttons">
                                <button
                                    className={"subregion-button " + (selectedSubregion === "Gangnam" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("Gangnam")}
                                >
                                    강남구
                                </button>
                                <button
                                    className={"subregion-button " + (selectedSubregion === "Gwanak" ? "selected" : "")}
                                    onClick={() => handleSubregionSelection("Gwanak")}
                                >
                                    관악구
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
                                onClick={() => handleCategorySelection(null)}
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

