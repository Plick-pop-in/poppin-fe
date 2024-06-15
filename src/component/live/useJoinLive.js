import React, { useEffect, useState } from "react";
import useCustomLogin from "../myPage/module/useCustomLogin";
import {useSelector} from "react-redux";
import axios from "axios";
import apiURLs from "../../apiURL";

const useJoinLive=(popupId)=>{
    const { isLogin, moveToLogin } = useCustomLogin();
    const loginInfo = useSelector(state => state.loginSlice);

    const postAPI= async() =>{
        //await axios.post("http://localhost:8080/v1/chat/joinLive", new URLSearchParams({ userId: loginInfo.id, popupId: parseInt(popupId), minusPoint:100 }))
        await axios.post(apiURLs.joinLive, new URLSearchParams({ userId: loginInfo.id, popupId: parseInt(popupId), minusPoint:100 }))
        .then((response) => {
            console.log("response", response);
            const message = response.data.message;
            
            if( !response.data.data.isJoin && response.data.data.isMoney){   //결제 완료
                const leftPoint = response.data.data.leftPoint;
                alert(message + "\n 남은 포인트는 " + leftPoint + " points 입니다.");
            }else{
                alert(message);
            }
            
            //여기에 redirect 페이지로 이동하면 될듯~!!

        })
        .catch(error => {
            console.error("Error:", error);
            alert('요청 에러 발생');
        });
    }

    const JoinLive = () =>{
        //로그인 안했으면 로그인 창으로 이동
        if(!isLogin){
            moveToLogin();
        }else if(loginInfo.id){
            if(window.confirm("[ Live 채팅 안내 ]\nLive 채팅방에 참여하시려면 100포인트가 차감됩니다. \n참여 하시겠습니까?")){
                postAPI();
            }
        }
    }

    return JoinLive;
   
};

export default useJoinLive;