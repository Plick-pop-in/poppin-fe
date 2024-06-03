import React, { useEffect, useState } from "react";
import axios from "axios";
import useCustomLogin from '../myPage/module/useCustomLogin';
import {useSelector} from "react-redux";
import apiURLs from "../../apiURL";


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

    //초기 렌더링 시 좋아요 상태를 서버에서 가져와 설정
    useEffect(() => {
        const userId = loginInfo.id;
        console.log('User ID:', userId);

        if(loginInfo){
            const url = `http://localhost:8080/v1/heart/isLike?popupId=?${item.popupId}&userId=${loginInfo.id}`;
            axios.get(url)
                .then(response => {
                    setIsLiked(response.data.isLiked);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }, [loginInfo, item.popupId]);


    const handleClick = () => {
        if(!isLogin){
            moveToLogin();
            return;
        }

        // 좋아요 해제 요청 보내기
        if(isLiked){
             axios.delete("http://localhost:8080/v1/heart/deleteHeart", { popupId: item.popupId, userId: loginInfo.id } )
             .then(response => {
                item.heart = response.data.likeCount
                 //setHeartCount(response.data.heart);    //heart 수 다시 가져오는거 해야함 ㅋ..
                 setIsLiked(false);
             })
             .catch(error => {
                 console.error("Error:", error);
             });
        }else{
            // 좋아요 추가 요청 보내기
            axios.post("http://localhost:8080/v1/heart/addHeart",{ popupId: item.popupId, userId: loginInfo.id }  )
                .then(response => {
                    //setHeartCount(response.data.heart); //heart 수 다시 가져오는거 해야함 ㅋ..
                    setIsLiked(true);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
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