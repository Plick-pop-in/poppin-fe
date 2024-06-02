import React, { useEffect, useState } from "react";
import "./css/Live.css";
import LiveBox from "./LiveBox.js";
import dbjson from "../popup/popupdb.json";

const Live = () => {
    const [live, setLive] = useState(null);
    const [keyword, setKeyword] = useState(""); // 검색 값

    const getLive = async () => {
        // API 호출 시 키워드 전달
        const response = await fetch(`/api/live?keyword=${keyword}`);
        const data = await response.json();
        setLive(data); // API 응답으로 받은 데이터로 상태 업데이트
    };

    useEffect(() => {
        setLive(dbjson);
    }, []);

    if (live === null) {
        return null;
    }

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
                    <img src={require("../../assets/images/search.png")} />
                </span>
                <input
                    className="list-search"
                    placeholder="search for anything"
                    value={keyword} // 입력된 키워드 표시
                    onChange={(e) => setKeyword(e.target.value)} // 입력된 키워드 업데이트
                ></input>
                <button className="searchBtn" type="button" onClick={getLive}> {/* 2. 검색 버튼 클릭 시 API 호출 */}
                    <img src={require("../../assets/images/searchBtn.png")} />
                </button>
            </div>
            {/* search 창 */}

            {/* Live-list */}
            <div className="live-list">
                <div className="list-space">
                    <div className="list-container">
                        {live.map((popup) => (
                            <LiveBox
                                key={popup.id} // 각 항목에 고유한 키 할당
                                id={popup.id}
                                name={popup.name}
                                start_date={popup.start_date}
                                end_date={popup.start_date}
                                city={popup.city}
                                local={popup.local}
                                location={popup.location}
                                image={popup.image}
                            />
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
