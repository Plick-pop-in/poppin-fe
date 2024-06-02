import React from "react";

const Heart = (item) =>{
    const imgStyle = {
        marginRight: '5px',
        verticalAlign: 'middle',
        width: '18px'
    };

    // 유저 로그인시 아닐시 차이 있게
    return(
        <div className="heart">
            <img src={require("../../assets/images/heart.png")} style={imgStyle} />
            {item.heart > 999 ? (<span>999+</span>) : (<span>{item.heart}</span>)}
        </div>
    );

};

export default Heart;