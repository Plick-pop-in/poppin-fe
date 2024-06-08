import React from 'react';
import './css/Header.css';
import {useSelector} from "react-redux"
import LogoutComponent from '../myPage/module/LogoutComponenet';
import useCustomLogin from '../myPage/module/useCustomLogin';

const Header = () => {
  const { isLogin, moveToLogin, moveToPath } = useCustomLogin()
  const handleLogoClick = () => {
    window.location.href = '/main'; 
  };

  const handleClickLogin = (e) => {
    moveToLogin()
  }

  const handleClickJoin = (e) => {
    moveToPath("/Signup")
  }

  //이메일이 있을 때와 없을 때(공백)
  const loginState = useSelector(state => state.loginSlice)
  const isPopupPage = useSelector(state => state.currentPage === 'popup');

  console.log("loginState : ", loginState)

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
          <a href="/popup" className="header-button">Popup</a>
          <a href="/map" className="header-button">Map</a>
          <a href="/live" className={`header-button ${!isLogin ? 'with-margin' : ''}`}>Live</a>
          {isLogin && <a href="/UserInfo" className="header-button with-margin">Mypage</a>}
        </div>
        {loginState.email ?
        <><LogoutComponent></LogoutComponent></> :
        <div className="header-buttons">
          <button className="header-button special-button" onClick={handleClickLogin}><strong>Sign In</strong></button>
          <button className="header-button special-button" onClick={handleClickJoin}><strong>Join</strong></button>
        </div>
        }
      </div>
    </header>
  );
};
export default Header;
