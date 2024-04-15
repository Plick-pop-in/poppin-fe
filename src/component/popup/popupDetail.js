import React from "react";
import './PopupDetail.css';

function PopupDetail (){
    return(
        <div className="popupDetail">
            <div>
                <div className="detail-heart"><img src={require('../../assets/images/heart.png')}/> 999+</div>
                <div className="display-flex">
                    <div className="detail-name">눈사람 눙눙이 팝업스토어</div>
                    <div className="detail-live"><button>Live chat</button></div>
                </div>
                <div className="detail-date">24.03.01 - 24.03.31</div>
                <div className="detail-lo"><img src={require('../../assets/images/location.png')}/>서울특별시 성동구 연무장길 13 1층</div>
            </div>

                {/* 슬라이드배너 */}

                <br/>
                <div>
                    <div className="detail-title">운영시간</div>
                    <div className="detail-content">
                        월: 11:30 ~ 20:00<br/>
                        화: 11:30 ~ 20:00<br/>
                        수: 11:30 ~ 20:00<br/>
                        목: 11:30 ~ 20:00<br/>
                        금: 11:30 ~ 20:00<br/>
                        토: 11:30 ~ 20:00<br/>
                        일: 11:30 ~ 20:00 
                    </div>
                </div>
                
                <br/>
                <div>
                    <div className="detail-title">팝업스토어 소개</div>
                    <div className="detail-content2">
                        Matin Kim SPECIAL STORE OPEN
                        <br/><br/> 마똉킴의 시그니처 액세서리 아이템을 만나볼 수 있는 성수 스페셜 스토어가 오픈기념 다양한 혜택과 이벤트를 만나보세요!
                        <br/><br/> OPENING HOURS AM 11:30 - PM 8:00 OPEN PROMOTION 
                        <br/>✔오픈 기념 전 제품 10% 할인 혜택 (3/1-3/10) 
                        <br/>10% OFF ALL PRODUCTS 
                        <br/>✔입점고객 대상 ‘Matin Kim STICKER’ 증정 
                        <br/>FREE GIFT 'Matin Kim STICKER'
                        <br/>✔️ 구매고객 대상 ‘MATIN HEART KEY RING’ 증정 
                        <br/>SPECIAL GIFT 'MATIN HEART KEY RING'
                    </div>
                </div>

                <br/>
                <div>
                    <div className="detail-title">브랜드 페이지 링크</div>
                    <div className="detail-content">
                       <a href="https://matinkim.com/">마뗑킴 (mathinkim.com)</a>
                    </div>
                </div>
        </div>
        
    );
}

export default PopupDetail;
