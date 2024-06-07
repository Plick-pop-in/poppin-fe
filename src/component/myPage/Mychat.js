import React from 'react';
import SidebarComponent from './module/sidebarComponent';
import ChatBox from '../live/ChatBox'; // UserInfo를 import합니다.
import './css/Mychat.css';

class Mychat extends React.Component {
  render() {
    return (
      <div className="mychat">
        <SidebarComponent />
        <div className="main-content">
        <div className="my-chat-title">
                <strong style={{ fontSize: '36px' }}>구매한 채팅방 목록</strong>
                <br /><br />
                <strong style={{ fontSize: '24px' }}>클릭 시 채팅 화면으로 이동합니다.</strong>
            </div>
            < ChatBox/>
        </div>
      </div>
    );
  }
}

export default Mychat;

