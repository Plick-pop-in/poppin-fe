import React, { useEffect, useState } from "react";
import useCustomLogin from "../myPage/module/useCustomLogin";
import {useSelector} from "react-redux";
import axios from "axios";

const useJoinLive=()=>{
    const { isLogin, moveToLogin } = useCustomLogin();
    const loginInfo = useSelector(state => state.loginSlice);


    const JoinLive = async(popupId) =>{
        //로그인 안했으면 로그인 창으로 이동
        if(!isLogin){
            moveToLogin();
            
        }else{
            //알람창 띄우기
            if(window.confirm("[알림] Live 채팅방에 입장하시려면 100포인트가 차감됩니다. \n 입장 하시겠습니까?")){
                const url = "";
                await axios
                .post(url, new URLSearchParams({ popupId, userId: loginInfo.id, minusPoint:100 }) )
                .then(response => {
                    console.log("response", response);
                    alert('포인트 차감이 완료되었습니다.');
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert('결제 에러 발생');
                });
            }else{

            }
        }
    }

    return JoinLive;
   
};

export default useJoinLive;