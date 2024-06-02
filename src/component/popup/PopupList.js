import React, { useState, useEffect } from "react";
import "./css/PopupList.css";
import PopupBox from "./PopupBox";
import PopupFilter from "./PopupFilter";
import axios from "axios";
import apiURLs from "../../apiURL";

const PopupList = () => {
  const [popup, setPopup] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // 검색 값 상태
  const [filterValues, setFilterValues] = useState({
    category: {},
    period: "",
  });

  //<----------------------------[함수]------------------------------>
  //팝업 가져오는 함수
  const getPopupAPI = async () => {
    try {
      const requestData = {
        categories: Object.keys(filterValues.category)
          .map((key) =>`${encodeURIComponent(key)}=${encodeURIComponent(filterValues.category[key])}`)
          .join("&"),
        period: filterValues.period,
        search: searchValue,
      };

      const url = `${apiURLs.popuplist}?${requestData.categories}&period=${requestData.period}&search=${requestData.search}`;
      const response = await axios.get(url);
      setPopup(response.data.data);
      //console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching popup detail!!!!:", error);
    }
  };


  //필터링 값 변경시 마다 호출되는 콜 백 함수
  const handleFilterChange = (newFilterValues) => {
    setFilterValues({
      category: newFilterValues.checkboxStates,
      period: newFilterValues.selectedRadio,
    });
  };

  //검색 버튼 클릭시 호출되는 함수
  const onChangeSearch = () => {
    const inputValue= document.getElementById('searchValue').value;
    setSearchValue(inputValue);
    sessionStorage.setItem("searchValue", inputValue);
    getPopupAPI();
  };

  // <-----------------------[useEffect]-------------------------->
  
  // 페이지가 로드될 때 세션 스토리지에서 검색어를 가져옴
  useEffect(() => {
    const savedSearchValue = sessionStorage.getItem("searchValue");
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }
  }, []);

  useEffect(() => {
    console.log("category", filterValues.category);
    getPopupAPI();
  }, [filterValues, searchValue]);

  if (popup.length == 0) {
    console.log("NO Popup DATA!!!!!!!");
  }

  return (
    <div>
      <div className="popupList">
        <div className="list-top">
          <span>
            <img src={require("../../assets/images/search.png")} alt="search" />
          </span>
          <input
            className="list-search"
            placeholder="search for anything"
            id="searchValue"
            value={searchValue}
            onChange={onChangeSearch}
          ></input>
          {/* <button className="searchBtn" type="button">
            <img
              src={require("../../assets/images/searchBtn.png")}
              alt="searchBtn"
              onClick={onClickSearch}
            />
          </button> */}
        </div>
        <div className="list-container-wrapper">
          {popup.length > 0 ? (
            <div className="list-container">
              {popup.map((popup) => (
                <PopupBox
                  id={popup.popupId}
                  name={popup.popupName}
                  period={popup.popupPeriod}
                  image={popup.popupImage}
                  heart={popup.likeCount}
                />
              ))}
              <div className="list-bottom">
                <button className="moreBtn">Load more +</button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="list-right right">
            <PopupFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupList;
