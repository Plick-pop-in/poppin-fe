import React from 'react';
import SidebarComponent from './module/sidebarComponent';
import UserInfo from './UserInfo';
import './css/Mypage.css';

class Mypage extends React.Component {
  render() {
    return (
      <div className="mypage">
        <SidebarComponent />
        <div className="main-content">
            <UserInfo />
        </div>
      </div>
    );
  }
}

export default Mypage;
