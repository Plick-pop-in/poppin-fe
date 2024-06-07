import React from 'react';
import SidebarComponent from './module/sidebarComponent';
import ChatBox from '../live/ChatBox';
import './css/Mychat.css';

class Mychat extends React.Component {
  render() {
    return (
      <div className="mychat">
        <SidebarComponent />
        <div className="main-content">
          <div className="my-chat-title-container">
            <div>
              <strong className="my-chat-title">구매한 채팅방 목록</strong>
              <br />
              <br />
              <strong className="my-chat-subtitle">클릭 시 채팅 화면으로 이동합니다.</strong>
            </div>
          </div>
          <div className="chat-box-container">
            <ChatBox />
          </div>
        </div>
      </div>
    );
  }
}

export default Mychat;
