import React, { useEffect, useState } from "react";
import "./css/PopupFilter.css";

const PopupFilter = ({onFilterChange}) => {
  //<-------------------------------checkBox(카테고리) 처리------------------------------>
  const category = {
    fashion: "패션",
    beauty: "뷰티",
    food: "음식",
    celeb: "연예",
    digital: "가전/디지털",
    character: "캐릭터",
    living: "리빙",
    game: "게임",
  };

  //여러 개의 체크 박스 상태 저장 useState hook 사용
  const [checkboxStates, setCheckBoxStates] = useState(()=> {
    const savedCategory = sessionStorage.getItem("category");
    if (savedCategory) {
      return JSON.parse(savedCategory);
    } else {
      // 저장된 값이 없으면 기본 상태를 반환합니다.
      return {
        fashion: true,
        beauty: true,
        food: true,
        celeb: true,
        digital: true,
        character: true,
        living: true,
        game: true,
      };
    }

  });

  //체크 박스 변경 이벤트 핸들러
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target; //이벤트 발생한 요소에 접근

    // checkboxStates상태 변경
    setCheckBoxStates((prevState) => ({
      //prevState: 이전 상태 (React Hook에서 제공하는 기능)
      ...prevState,
      [name]: checked,
    }));
    console.log(name, ": ", checked);
  };

  //체크박스 렌더링 함수
  const renderCheckBox = () => {
    return Object.keys(checkboxStates).map((key) => (
      <div
        className={`filter-check ${checkboxStates[key] ? "on" : ""}`}
        id="checkBoxDiv"
      >
        <input
          type="checkbox"
          id={key}
          name={key}
          checked={checkboxStates[key]}
          onChange={handleCheckboxChange}
        />
        <label for={key}>{category[key]}</label>
      </div>
    ));
  };

  //<--------------------------------------------라디오 버튼(기간) 처리 ------------------------------------------->
  //선택된 라디오 버튼 상태
  const period = [
    { id: 0, name: "all", label: "모든 팝업" },
    { id: 1, name: "open", label: "현재 진행 중인 팝업" },
    { id: 2, name: "will", label: "오픈 전 팝업" },
    { id: 3, name: "close", label: "종료된 팝업" },
  ];

  const [selectedRadio, setSelectedRadio] = useState(() => {
    const savedPeriod = sessionStorage.getItem("period");
    if (savedPeriod) {
      return savedPeriod;
    } else {
      // 저장된 값이 없으면 기본값을 반환합니다.
      return "open";
    }
  });
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
    console.log(event.target.id, ": ", event.target.value);
  };

  const renderRadioButton = () => {
    return period.map((period) => (
      <div
        className={`filter-check ${selectedRadio === period.name ? "on" : ""}`}
        key={period.id}
        id="radioDiv"
      >
        <input
          type="radio"
          name="period"
          id={period.name}
          checked={selectedRadio === period.name}
          onChange={handleRadioChange}
        />
        <label for={period.name}>{period.label}</label>
      </div>
    ));
  };

  //<--------------------------------------토글 숨기기 처리------------------------------------------>
  const [hiddenState, setHiddenStates] = useState({
    checkBox: false,
    radio: false,
  });

  const onClickToggle = (event) => {
    const { id } = event.target;
    setHiddenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    Object.keys(hiddenState).map((key) => {
      const divBlock = document.querySelectorAll(`#${key}Div`);
      const srcImg = document.querySelector(`#${key}`);
      divBlock.forEach((divBlock) => {
        if (hiddenState[key]) {
          divBlock.classList.remove("appear"); // appear
          divBlock.classList.add("disappear"); // disappear 클래스 추가
          setTimeout(() => {
            divBlock.style.display = "none";
            srcImg.src = require("../../assets/images/down.png");
          }, 150); // disappear 클래스 추가
        } else {
          divBlock.classList.remove("disappear"); // disappear 클래스 제거
          divBlock.style.display = "flex";
          divBlock.classList.add("appear"); // appear 클래스 추가
          setTimeout(() => {
            srcImg.src = require("../../assets/images/up.png");
          }, 150); // disappear 클래스 추가
        }
      });
    });
  }, [hiddenState]);

  //필터 변경 시 부모 컴포넌트로 전달
  useEffect(()=>{
    // 필터링 값이 변경될 때마다 세션 스토리지에 저장합니다.
    sessionStorage.setItem("category", JSON.stringify(checkboxStates));
    sessionStorage.setItem("period", selectedRadio);

    onFilterChange({ checkboxStates, selectedRadio });
  },[checkboxStates, selectedRadio])

  //<-----------------------[렌더링]------------------------>
  return (
    <div className="filter-container">
      <div>
        {/* 카테고리 */}
        <div className="filter-inner">
          <div className="filter-location bold">
            Category
            <img
              className="filter-img right"
              id="checkBox"
              src={require("../../assets/images/up.png")}
              onClick={onClickToggle}
            />
          </div>
          {renderCheckBox()}
        </div>

        {/* 기간 */}
        <div className="filter-inner">
          <div className="filter-location bold">
            Period
            <img
              className="filter-img right"
              id="radio"
              src={require("../../assets/images/up.png")}
              onClick={onClickToggle}
            />
          </div>
          {renderRadioButton()}
        </div>
      </div>
    </div>
  );
};

export default PopupFilter;
