import React, { useEffect, useState } from "react";
import axios from "axios";
import useCustomLogin from '../myPage/module/useCustomLogin';
import {useSelector} from "react-redux";


const Heart = (item) =>{
    //스타일
    const imgStyle = {
        marginRight: '5px',
        verticalAlign: 'middle',
        width: '18px',
        cursor: "pointer"
    };

    const [isLiked, setIsLiked] = useState(false);
    const { isLogin, moveToLogin, moveToPath } = useCustomLogin();
    const loginInfo = useSelector(state => state.loginSlice);

    useEffect(() => {
        const userId = loginInfo.id;
        console.log('User ID:', userId);
    }, [loginInfo]);

    useEffect(() => {
        // 초기 렌더링 시 좋아요 상태를 서버에서 가져와 설정
        axios.get("/api/like/status", { popupId: item.popupId })
            .then(response => {
                setIsLiked(response.data.isLiked);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [item.popupId]);


    useEffect(()=>{

    }, []);

    const handleClick = () => {
        if(!isLogin){
            moveToLogin();
            return;
        }

       
    };

    
    // 유저 로그인시 아닐시 차이 있게
    return(
        <div className="heart">
            <img src={isLiked ? require("../../assets/images/heartColor.png") : require("../../assets/images/heart.png")} style={imgStyle} onClick={handleClick}/>
            {item.heart > 999 ? (<span>999+</span>) : (<span>{item.heart}</span>)}
        </div>
    );

};

export default Heart;