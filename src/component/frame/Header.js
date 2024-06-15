import React, { useState } from 'react';
import './css/Header.css';
import { useSelector } from "react-redux";
import LogoutComponent from '../myPage/module/LogoutComponenet';
import useCustomLogin from '../myPage/module/useCustomLogin';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isLogin, moveToLogin, moveToPath } = useCustomLogin();
  const loginState = useSelector(state => state.loginSlice);

  const [activeButton, setActiveButton] = useState('');

  const handleLogoClick = () => {
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
        <div className="header-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', gap: '20px' }}>
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
          </div>
          {isLogin && (
            <div className="header-buttons" style={{ display: 'flex', alignItems: 'center', gap: '160px' }}>
              <Link to="/UserInfo" className="header-button with-margin">Mypage</Link>
              <LogoutComponent />
            </div>
          )}
          {!loginState.email && (
            <div className="header-buttons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button className="header-button special-button" onClick={handleClickLogin}>
                <strong>Sign In</strong>
              </button>
              <button className="header-button special-button" onClick={handleClickJoin}>
                <strong>Join</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
