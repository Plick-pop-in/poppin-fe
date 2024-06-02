import React, { useEffect, useState } from "react";
import "./css/Live.css";
import LiveBox from "./LiveBox.js";
import axios from "axios";
import apiURLs from "../../apiURL.js";

const Live = () => {
    const [live, setLive] = useState([]);
    const [keywordValue, setKeywordValue] = useState(""); // 검색 값

    //<----------------------------------------------------------->//
    // Live 가져오는 함수
    const getLive = async () => {
        try {
            const requestData = {
                keyword: keywordValue,
            };
            
            const url = `${apiURLs.live}?keyword=${keywordValue}`;
            console.log("Fetching URL:", url);
            const response = await axios.get(url);
            setLive(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error: fetching live data", error);
        }
    };

    // 검색 버튼 클릭 시 함수 호출
    const onChangeKeyword = () => {
        const keywordInput = document.getElementById('keywordValue').value;
        setKeywordValue(keywordInput);
        sessionStorage.setItem("keywordValue", keywordInput);
        getLive();
    };

    //<----------------------------------------------------------------->//
    useEffect(() => {
        const savedKeywordValue = sessionStorage.getItem("keywordValue");
        if (savedKeywordValue) {
            setKeywordValue(savedKeywordValue);
        }
        getLive();
    }, []); 

    useEffect(() => {
        if (live.length === 0) {
            console.log("No live list");
        }
    }, [live]);

    return (
        <div className="live-page">
            <div className="live-chat-title">
                <strong style={{ fontSize: '36px' }}>Live Chat</strong>
                <br /><br />
                <strong style={{ fontSize: '24px' }}>관심있는 팝업 스토어의 현장 엿보기 !</strong>
            </div>
            {/* search 창 */}
            <div className="list-top">
                <span>
                    <img src={require("../../assets/images/search.png")} alt="Search Icon" />
                </span>
                <input
                    className="list-search"
                    placeholder="search for anything"
                    id="keywordValue"
                    value={keywordValue} // 입력된 키워드 표시
                    onChange ={onChangeKeyword}
                ></input>
                <button className="searchBtn" type="button" onClick={onChangeKeyword}> {/* 2. 검색 버튼 클릭 시 API 호출 */}
                    <img src={require("../../assets/images/searchBtn.png")} alt="Search Button" />
                </button>
            </div>
            {/* search 창 */}

            {/* Live-list */}
            <div className="live-list">
                <div className="list-space">
                    <div className="list-container">
                        {live.map((popup) => (
                            <div className="list-box">
                                <LiveBox
                                    image={popup.popupImage}
                                    name={popup.popupName}
                                    location={popup.popupLocation}
                                    city={popup.popupCity}
                                    local={popup.popupLocal}
                                    period={popup.popupPeriod}
                                    joinedPeople={popup.joinedPeopleCnt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Load more 100+ 버튼 */}
                <div className="list-bottom">
                    <button className="moreBtn">Load more +</button>
                </div>
                {/* Load more 100+ 버튼 */}
                {/* LiveList */}
            </div>
        </div>
    );
};

export default Live;
