import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//페이지
import PopupList from "../popup/PopupList";
import PopupDetail from "../popup/PopupDetail";
import Signup from "../myPage/Signup";
import Map from "../Map/Map"
import KakaoMap from "../Map/KakaoMap";

const AppRouter = () =>{
    return(
      <Router>
        <Routes>
            <Route path="PopupList" element={<PopupList />} />
            <Route path="popupdetail/:id" element={<PopupDetail />} />
            <Route path="Signup" element={<Signup/>} />
            <Route path="Map" element={<Map/>} />
            <Route path="KaKaoMap" element={<KakaoMap/>} />
        </Routes>
      </Router>
    );
}

export default AppRouter;