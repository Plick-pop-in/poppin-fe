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
            < ChatBox/>
        </div>
      </div>
    );
  }
}

export default Mychat;

