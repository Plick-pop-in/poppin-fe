import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import WishBox from "./WishBox.js";
import axios from "axios";
import apiURLs from "../../apiURL.js";
import "./css/WishList.css"
import SidebarComponent from './module/sidebarComponent';

const WishList = () => {
    const loginInfo = useSelector(state => state.loginSlice);
    const [wish, setWish] = useState([]);

    // 찜 목록 가져오는 함수
    const getWish = async (userId) => {
        try {
            const url = `${apiURLs.wishlist}?find=${userId}`;
            //const url = `http://localhost:8080/v1/popup/wishlist?find=${userId}`;
            console.log("Fetching URL:", url);
            const response = await axios.get(url);
            setWish(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error: fetching wishlist data", error);
        }
    };

    useEffect(() => {
        const userId = loginInfo.id;
        console.log('User ID:', userId);
        if (userId) {
            getWish(userId); // userId를 전달하여 getWish 함수 호출
        }
    }, [loginInfo]);

    useEffect(() => {
        if (wish.length === 0) {
            console.log("No wish list");
        }
    }, [wish]);

    return (
        <div className="wishlist-page">
            <SidebarComponent /> 
            <div className="main-content" style={{textAlign: 'left'}}>
            <strong className="wish-list-title" style={{ fontSize: '30px' , textAlign: 'left'}}>나의 찜 목록</strong>

            {/* wishlist */}
            <div className="wish-list">
                <div className="list-space">
                    <div className="list-container">
                        {wish.map((popup) => (
                            <div className="wish-box">
                                <WishBox
                                    popupId={popup.popupId}
                                    image={popup.popupImage}
                                    name={popup.popupName}
                                    heart={popup.heart}
                            />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* WishList */}
            </div>
        </div>
    );
};

export default WishList;
