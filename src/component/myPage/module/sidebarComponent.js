// import React from 'react';
// import '../css/Sidebar.css';

// class SidebarComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeLink: 'UserInfo' // 초기에는 '사용자 정보' 페이지가 활성화되어 있음
//     };
//   }

//   handleClick(link) {
//     this.setState({ activeLink: link });
//   }

//   render() {
//     return (
//       <div className="sidebar">
//         {console.log('state : ' + this.state.activeLink)}
//         <div className="sidebar-menu">
//           <ul>
//             <li><img src={require("../../../assets/images/ic_person.png")} alt='person icon' /><a href='./UserInfo' className={this.state.activeLink === 'UserInfo' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('UserInfo')}>사용자 정보</a></li>
//             <li><img src={require("../../../assets/images/heartColor.png")} alt='heart icon' /><a href='./WishList' className={this.state.activeLink === 'WishList' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('WishList')}>찜 목록</a></li>
//             <li><img src={require("../../../assets/images/ic_mychat.png")} alt='mail icon'/><a href='./MyChat' className={this.state.activeLink === 'MyChat' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('MyChat')}>나의 채팅</a></li> 
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// export default SidebarComponent;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 'UserInfo' // 초기에는 '사용자 정보' 페이지가 활성화되어 있음
    };
  }

  handleClick(link) {
    this.setState({ activeLink: link });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-menu">
          <ul>
            <li>
              <img src={require("../../../assets/images/ic_person.png")} alt='person icon' />
              <Link to='/UserInfo' className={this.state.activeLink === 'UserInfo' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('UserInfo')}>
                사용자 정보
              </Link>
            </li>
            <li>
              <img src={require("../../../assets/images/heartColor.png")} alt='heart icon' />
              <Link to='/WishList' className={this.state.activeLink === 'WishList' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('WishList')}>
                찜 목록
              </Link>
            </li>
            <li>
              <img src={require("../../../assets/images/ic_mychat.png")} alt='mail icon'/>
              <Link to='/MyChat' className={this.state.activeLink === 'MyChat' ? "sidebar-link active" : "sidebar-link"} onClick={() => this.handleClick('MyChat')}>
                나의 채팅
              </Link>
            </li> 
          </ul>
        </div>
      </div>
    );
  }
}

export default SidebarComponent;
