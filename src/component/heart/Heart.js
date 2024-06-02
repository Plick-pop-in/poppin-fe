import React, { useState } from "react";
import axios from "axios";
import useCustomLogin from '../myPage/module/useCustomLogin';

const Heart = (item) =>{
    //스타일
    const imgStyle = {
        marginRight: '5px',
        verticalAlign: 'middle',
        width: '18px',
        cursor: "pointer"
    };
    
    //
    const [isLiked, setIsLiked] = useState(false);
    const { isLogin, moveToLogin, moveToPath } = useCustomLogin()

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