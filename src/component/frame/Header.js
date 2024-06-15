import React, { useState } from 'react'; // useState를 React에서 불러옴
import './css/Header.css';
import { useSelector } from "react-redux";
import LogoutComponent from '../myPage/module/LogoutComponenet';
import useCustomLogin from '../myPage/module/useCustomLogin';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트

const Header = () => {
  const { isLogin, moveToLogin, moveToPath } = useCustomLogin();
  const loginState = useSelector(state => state.loginSlice);
  const isPopupPage = useSelector(state => state.currentPage === 'popup');

  const [activeButton, setActiveButton] = useState(''); // useState 사용

  const handleLogoClick = () => {
    // 메인 페이지로 이동하는 경우 Link를 사용하지 않고 window.location.href로 이동
    window.location.href = '/main'; 
  };

  const handleClickLogin = () => {
    moveToLogin();
  };

  const handleClickJoin = () => {
    moveToPath("/Signup");
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // 버튼 클릭 시 Link를 사용하여 경로로 이동
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <img
          src="/images/popin.png"
          alt="Logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }} 
        />
        <img src="/images/divider.png" alt="Divider" />
        <div className="header-buttons">
          <Link
            to="/popup"
            className={`header-button ${activeButton === 'popup' ? 'active' : ''}`}
            onClick={() => handleButtonClick('popup')}
          >
            Popup
          </Link>
          <Link
            to="/map"
            className={`header-button ${activeButton === 'map' ? 'active' : ''}`}
            onClick={() => handleButtonClick('map')}
          >
            Map
          </Link>
          <Link
            to="/live"
            className={`header-button ${activeButton === 'live' ? 'active' : ''} ${!isLogin ? 'with-margin' : ''}`}
            onClick={() => handleButtonClick('live')}
          >
            Live
          </Link>
          {isLogin && (
            <Link to="/UserInfo" className="header-button with-margin">Mypage</Link>
          )}
        </div>
        {loginState.email ? (
          <LogoutComponent />
        ) : (
          <div className="header-buttons">
            <button className="header-button special-button" onClick={handleClickLogin}>
              <strong>Sign In</strong>
            </button>
            <button className="header-button special-button" onClick={handleClickJoin}>
              <strong>Join</strong>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
