// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal'
// import './css/Userinfo.css';
// import { useSelector, useDispatch } from 'react-redux';
// //import { modifyMember } from './api/userApi';
// import { login } from './slices/loginSlice';
// import axios from 'axios';

// const initState = {
//     id: '',
//     email: '',
//     nickname: '',
//     name: '',
//     point: '',
// }

// export default function UserInfo() {
//     const [member, setMember] = useState(initState)
//     const loginInfo = useSelector(state => state.loginSlice)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         setMember({...loginInfo})
//     }, [loginInfo]);

//     const handleChange = (e) => {
//         member[e.target.name] = e.target.value
//         setMember({...member})
//     }
    
//     const handleClickModify = async () => {
//         try {
//             const response = await axios.put("http://localhost:8080/v1/user/modify-nickname", {id: member.id, nickname: member.nickname});
//             if(response.data) {
//                 alert('회원 정보가 성공적으로 수정되었습니다.');

//                 dispatch(login(member));
    
//                 // 닉네임을 성공적으로 수정했으므로 상태를 업데이트합니다.
//                 setMember(prevState => ({
//                     ...prevState,
//                     nickname: member.nickname
                    
//                 }));
//             } else if(response.data === false) {
//                 alert('이 닉네임은 이미 사용 중입니다.');
//             } else {
//                 alert('동일한 닉네임입니다.');
//             }
//         } catch (error) {
//             console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
//             alert('회원 정보 수정 중 오류가 발생했습니다.');
//         }
//     }

//     const handlePointCharge = async () => {
//         const pointsToAdd = parseInt(prompt("충전할 포인트를 입력하세요:", "0"), 10);
//         if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
//             alert("유효한 포인트를 입력하세요.");
//             return;
//         }
    
//         try {
//             const response = await axios.put('http://localhost:8080/v1/user/charge-point', {
//                 id: member.id,
//                 pointsToAdd: pointsToAdd,
//             });
            
//             alert(`포인트가 성공적으로 충전되었습니다. 새로운 포인트: ${response.data}`);
//         } catch (error) {
//             console.error('포인트 충전 중 오류가 발생했습니다:', error);
//             alert('포인트 충전 중 오류가 발생했습니다.');
//         }
//     };
    
//     const [isOpen, setIsOpen] = useState(false); // 비밀번호 변경 팝업 창 관리

//     const openModal = () => {
//         setIsOpen(true);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const modalStyles = {
//         overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)", 
//             zIndex: "9999",
//         },
//         content: { 
//             width: "35%",
//             height: "auto",
//             margin: "auto",
//             borderRadius: "4px",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//         },
//     };

//     return (
//         <div className="userinfo-container">
//             <div className="userinfo-content">
//                 <img src={require('../../assets/images/ic_bigPerson.png')} alt='person icon' className="userinfo-image" />
//                 <span className="userinfo-nickname">{member.nickname}</span>
//             </div>
//             <div className="point-info">
//                 <div style={{ color: '#B1B5C3', fontSize: '12px', marginBottom: '10px' }}>나의 포인트</div>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <span className="point" style={{ color: '#000000', fontSize: '16px' }}>{member.point.toLocaleString()}</span>
//                     <button className="charge-btn" onClick={handlePointCharge}>충전하기</button>
//                 </div>
//             </div>
//             <div style={{ display: 'flex', width: '100%'}}>
//                 <span style={{ flex: 4 }}>
//                     <div className="infoLabel">이메일</div>
//                     <input
//                         className="infoInput"
//                         name="email"
//                         type={'text'}
//                         placeholder="이메일"
//                         value={member.email}
//                         readOnly
//                     />
//                 </span>
//                 <span style={{ flex: 1 }}></span>
//                 <span style={{ flex: 4 }}>
//                     <div className="infoLabel">이름</div>
//                     <input
//                         className="infoInput"
//                         name="name"
//                         type={'text'}
//                         placeholder="이름"
//                         value={member.name}
//                         readOnly
//                     />
//                 </span>
//             </div>
//             <div className="infoLabel">닉네임</div>
//             <div className="inputWithButton">
//                 <input
//                     className="infoInput"
//                     name="nickname"
//                     type={'text'}
//                     placeholder="닉네임"
//                     value={member.nickname}
//                     onChange={handleChange}
//                 />
//                 <button className="changeButton" onClick={handleClickModify} style={{ display: 'inline-block', marginLeft: '30px'}}>닉네임 변경</button>
//             </div>
//             <div className="infoLabel">비밀번호</div>
//             <button className="changeButton" onClick={openModal}>비밀번호 변경</button>

//             <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
//                 <span className='modalContent'>
//                 <div className='modal-cancle'>
//                     <img
//                         src={require('../../assets/images/ic_cancle.png')}
//                         alt='cancle'
//                         onClick={closeModal} // 취소 이미지에 onClick 이벤트 추가
//                         style={{ cursor: 'pointer'}} // 커서를 포인터로 변경하여 클릭 가능하다는 시각적 피드백 제공
//                     />
//                 </div>
//                 <div className='logoContainer'><img className='modal-logo' 
//                         src={require('../../assets/images/bigLogo.png')} 
//                         alt='logo'/></div>
//                 <div className="infoLabel">이메일</div>
//                 <div className="inputWithButton-m">
//                     <input
//                         className="infoInput1"
//                         name="email"
//                         type={'text'}
//                         placeholder="이메일"
//                     />
//                     <button className="checkButton">인증코드 받기</button>
//                 </div>
//                 <div className="infoLabel">인증번호</div>
//                 <div className="inputWithButton-m">
//                     <input
//                         className="infoInput1"
//                         name="email"
//                         type={'text'}
//                         placeholder="인증번호를 입력해주세요."
//                     />
//                     <button className="checkButton"
//                             style={{width: '26%'}}>확인</button>
//                 </div>
//                 <div className="infoLabel">새 비밀번호</div>
//                     <input
//                         className="infoInput2"
//                         name="pw"
//                         type={'password'}
//                         placeholder="새 비밀번호"
//                     />
//                     <div className="guideText">8자리 이상 입력해주세요.</div>
//                     <div className="infoLabel">비밀번호 확인</div>
//                     <input
//                         className="infoInput2"
//                         name="pwCheck"
//                         type={'password'}
//                         placeholder="비밀번호"
//                     />
//                 <button className='checkButton' 
//                         style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px'}}
//                         onClick={closeModal}>변경하기</button>
//                 </span>
//             </Modal>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/Userinfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, updatePoints } from './slices/loginSlice';
import axios from 'axios';
import apiURLs from '../../apiURL';
import SidebarComponent from './module/sidebarComponent';

const UserInfo = () => {
    const loginInfo = useSelector(state => state.loginSlice);
    const dispatch = useDispatch();

    const [member, setMember] = useState(loginInfo);

    useEffect(() => {
        setMember(loginInfo);
    }, [loginInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClickModify = async () => {
        try {
            const response = await axios.put(apiURLs.modifyNickname, { id: member.id, nickname: member.nickname });
            //const response = await axios.put("http://localhost:8080/v1/user/modify-nickname", { id: member.id, nickname: member.nickname });
            if (response.data) {
                alert('회원 정보가 성공적으로 수정되었습니다.');
                dispatch(login(member));
            } else if (response.data === false) {
                alert('이 닉네임은 이미 사용 중입니다.');
            } else {
                alert('동일한 닉네임입니다.');
            }
        } catch (error) {
            console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
            alert('회원 정보 수정 중 오류가 발생했습니다.');
        }
    };

    const handlePointCharge = async () => {
        const pointsToAdd = parseInt(prompt("충전할 포인트를 입력하세요:", "0"), 10);
        if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
            alert("유효한 포인트를 입력하세요.");
            return;
        }

        try {
            const response = await axios.put(apiURLs.chargePoint, {
            // const response = await axios.put('http://localhost:8080/v1/user/charge-point', {
                id: member.id,
                pointsToAdd: pointsToAdd,
            });

            const newPoints = response.data;

            // Redux 상태 업데이트
            dispatch(updatePoints(newPoints));

            alert(`포인트가 성공적으로 충전되었습니다. 새로운 포인트: ${newPoints}`);
        } catch (error) {
            console.error('포인트 충전 중 오류가 발생했습니다:', error);
            alert('포인트 충전 중 오류가 발생했습니다.');
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "9999",
        },
        content: {
            width: "35%",
            height: "auto",
            margin: "auto",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        },
    };

    return (
        <div className="userinfo-container">
            <SidebarComponent/>
            <div className='main-contents'>
            <div className="userinfo-content">
                <img src={require('../../assets/images/ic_bigPerson.png')} alt='person icon' className="userinfo-image" />
                <span className="userinfo-nickname">{loginInfo.nickname}</span>
            </div>
            <div className="point-info">
                <div style={{ color: '#B1B5C3', fontSize: '12px', marginBottom: '10px' }}>나의 포인트</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="point" style={{ color: '#000000', fontSize: '16px' }}>{loginInfo.point.toLocaleString()}</span>
                    <button className="charge-btn" onClick={handlePointCharge}>충전하기</button>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <span style={{ flex: 4 }}>
                    <div className="infoLabel">이메일</div>
                    <input
                        className="infoInput"
                        name="email"
                        type={'text'}
                        placeholder="이메일"
                        value={loginInfo.email}
                        readOnly
                    />
                </span>
                <span style={{ flex: 1 }}></span>
                <span style={{ flex: 4 }}>
                    <div className="infoLabel">이름</div>
                    <input
                        className="infoInput"
                        name="name"
                        type={'text'}
                        placeholder="이름"
                        value={loginInfo.name}
                        readOnly
                    />
                </span>
            </div>
            <div className="infoLabel">닉네임</div>
            <div className="inputWithButton">
                <input
                    className="infoInput"
                    name="nickname"
                    type={'text'}
                    placeholder="닉네임"
                    value={member.nickname}
                    onChange={handleChange}
                />
                <button className="changeButton" onClick={handleClickModify} style={{ display: 'inline-block', marginLeft: '30px' }}>닉네임 변경</button>
            </div>
            <div className="infoLabel">비밀번호</div>
            <button className="changeButton" onClick={openModal}>비밀번호 변경</button>

            <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
                <span className='modalContent'>
                    <div className='modal-cancle'>
                        <img
                            src={require('../../assets/images/ic_cancle.png')}
                            alt='cancle'
                            onClick={closeModal}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div className='logoContainer'>
                        <img className='modal-logo'
                            src={require('../../assets/images/bigLogo.png')}
                            alt='logo' />
                    </div>
                    <div className="infoLabel">이메일</div>
                    <div className="inputWithButton-m">
                        <input
                            className="infoInput1"
                            name="email"
                            type={'text'}
                            placeholder="이메일"
                        />
                        <button className="checkButton">인증코드 받기</button>
                    </div>
                    <div className="infoLabel">인증번호</div>
                    <div className="inputWithButton-m">
                        <input
                            className="infoInput1"
                            name="email"
                            type={'text'}
                            placeholder="인증번호를 입력해주세요."
                        />
                        <button className="checkButton"
                            style={{ width: '26%' }}>확인</button>
                    </div>
                    <div className="infoLabel">새 비밀번호</div>
                    <input
                        className="infoInput2"
                        name="pw"
                        type={'password'}
                        placeholder="새 비밀번호"
                    />
                    <div className="guideText">8자리 이상 입력해주세요.</div>
                    <div className="infoLabel">비밀번호 확인</div>
                    <input
                        className="infoInput2"
                        name="pwCheck"
                        type={'password'}
                        placeholder="비밀번호"
                    />
                    <button className='checkButton'
                        style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px' }}
                        onClick={closeModal}>변경하기</button>
                </span>
            </Modal>
            </div>
        </div>
    );
};

export default UserInfo;
