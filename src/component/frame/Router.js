import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from "../myPage/Login.js";
import Main from "../main/Main.js";
import PopupList from "../popup/PopupList";
import PopupDetail from "../popup/PopupDetail";
import Signup from "../myPage/Signup";
import Map from "../map/Map";
import KakaoMap from "../map/KakaoMap";
import Live from "../live/Live";
import Chat from "../live/Chat";
import Mypage from "../myPage/MyPage";
import WishList from "../myPage/WishList";
import MyChat from "../myPage/Mychat";
import UserInfo from "../myPage/UserInfo";
import Header from "./Header.js";
import Footer from "./Footer.js";
import KakaoRedirect from "../myPage/KakaoRedirect.js"


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/popup" element={<PopupList />} />
                <Route path="/popupdetail/:popupId" element={<PopupDetail />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/Main" element={<Main />} />
                <Route path="/KaKaoMap" element={<KakaoMap />} />
                <Route path="/Live" element={<Live />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/UserInfo" element={<UserInfo />} />
                <Route path="/WishList" element={<WishList />} />
                <Route path="/MyChat" element={<MyChat />} />
                <Route path="KakaoRedirect" element={<KakaoRedirect/>} />
                <Route path="/" element={<Navigate to="/Main" />} /> {/* '/'로 접속 시 '/main'으로 이동 */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default AppRouter;