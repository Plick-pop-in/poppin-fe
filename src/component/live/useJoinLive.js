import React, { useEffect, useState } from "react";
import useCustomLogin from "../myPage/module/useCustomLogin";
import {useSelector} from "react-redux";
import axios from "axios";
import apiURLs from "../../apiURL";

const useJoinLive=(popupId)=>{
    const { isLogin, moveToLogin } = useCustomLogin();
    const loginInfo = useSelector(state => state.loginSlice);

    const postAPI= async() =>{
        //알람창 띄우기
        
            //await axios.post("http://localhost:8080/v1/chat/joinLive", new URLSearchParams({ userId: loginInfo.id, popupId: parseInt(popupId), minusPoint:100 }))
            await axios.post(apiURLs.joinLive, new URLSearchParams({ userId: loginInfo.id, popupId: parseInt(popupId), minusPoint:100 }))
            .then((response) => {
                console.log("response", response);
                alert('포인트 차감이 완료되었습니다.');
            })
            .catch(error => {
                console.error("Error:", error);
                alert('결제 에러 발생');
            });
    }

    const JoinLive = () =>{
        //로그인 안했으면 로그인 창으로 이동
        if(!isLogin){
            moveToLogin();
        }else if(loginInfo.id){
            if(window.confirm("[ Live 채팅 안내 ]\nLive 채팅방에 참여하시려면 100포인트가 차감됩니다. \n참여 하시겠습니까?")){
                postAPI();
            }else{

            }
        }
    }

    return JoinLive;
   
};

export default useJoinLive;