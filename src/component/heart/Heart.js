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
    const [likeCount, setlikeCount] = useState("");
    const { isLogin, moveToLogin } = useCustomLogin();
    const loginInfo = useSelector(state => state.loginSlice);

    const fetchisLiked = async () => {
        try {
            const userId = loginInfo.id;
            console.log('User ID:', userId);

            if(isLogin && loginInfo.id){
                const url = `http://localhost:8080/v1/heart/isLike?popupId=${item.popupId}&userId=${loginInfo.id}`;
                const response = await axios.get(url);
                console.log("islike", response.data.data);
                setIsLiked(response.data.data);
            }
        } catch (error) {
          console.error("Error fetching is Liked:", error);
        }
    };

    const addHeart = async()=>{
        await axios.post("http://localhost:8080/v1/heart/addHeart", new URLSearchParams({ popupId: item.popupId, userId: loginInfo.id }) )
        .then(response => {
            setlikeCount(response.data.data.likeCount); //heart 수 다시 가져오는거 해야함 ㅋ..
            console.log("likeCount", likeCount);
            setIsLiked(true);
            alert('찜 목록에 추가되었습니다.');
        })
        .catch(error => {
            console.error("Error:", error);
            alert('찜 추가 에러 발생');
        });
    }
        
    // 좋아요 해제 요청
    const deleteHeart = async()=>{
        await axios.delete(`http://localhost:8080/v1/heart/deleteHeart?popupId=${item.popupId}&userId=${loginInfo.id}` )
        .then(response => {
            setlikeCount(response.data.data.likeCount);
            setIsLiked(false);
            alert('찜 목록에서 해제되었습니다.');
        })
        .catch(error => {
            console.error("Error:", error);
            alert('찜 해제 에러 발생');
        });
    }

    //초기 렌더링 시 좋아요 상태를 서버에서 가져와 설정
    useEffect(() => {
        fetchisLiked();
        setlikeCount(item.likeCount);
    }, [loginInfo, item.popupId, item.likeCount]);

    const handleClick = () => {
        if(!isLogin){
            moveToLogin();
            return;
        }

        console.log("isLiked",isLiked);

        if(isLiked){
            //좋아요 true 일때 -> 찜 취소 요청
           deleteHeart();
        }else{
           //좋아요 false 일 때 -> 찜 요청
           addHeart();
        }
    };

    
    // 유저 로그인시 아닐시 차이 있게
    return(
        <div className="heart">
            <img src={isLiked ? require("../../assets/images/heartColor.png") : require("../../assets/images/heart.png")} style={imgStyle} onClick={handleClick}/>
            {likeCount > 999 ? (<span>999+</span>) : (<span>{likeCount}</span>)}
        </div>
    );

};

export default Heart;