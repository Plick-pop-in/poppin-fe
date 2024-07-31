import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/Userinfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, updatePoints } from './slices/loginSlice';
import axios from 'axios';
import apiURLs from '../../apiURL';
import SidebarComponent from './module/sidebarComponent';
import useCustomLogin from "./module/useCustomLogin";

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
            height: "240px",
            margin: "auto",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        },
    };

    // 비밀번호 변경 창 내부 함수 -------------------------------
    const [emailCheckResult, setEmailCheckResult] = useState("");
    const [email, setEmail] = useState("");
    const {doLogout, moveToLogin} = useCustomLogin()

    const handleModalChange = (e) => {
        const { value } = e.target;
        console.log("value : " + value);
        setEmail(value);
    };

    const handleEmailCheck = () => {
        // 로그인된 이메일과 비교
        if (email === member.email) {
            setEmailCheckResult("이메일이 유효합니다.");
        } else {
            setEmailCheckResult("이메일이 유효하지 않습니다.");
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 이메일 검사를 통과하지 못한 경우 비밀번호 전송을 진행하지 않음
        if (
            emailCheckResult === "" ||
            emailCheckResult === "이메일이 유효하지 않습니다."
        ) {
            console.log("One of the conditions was true, returning from function.");
            alert("이메일을 올바르게 입력해주세요.")
            return;
        }
        
        // 이후 로직 실행
        console.log("All conditions are false, proceeding with function.");

        try {
            const response = await axios.post(apiURLs.modifyPassword, member.email);
            //const response = await axios.post("http://localhost:8080/v1/user/modify-password", member.id);
            console.log(response.data);
            alert("임시비밀번호가 전송되었습니다. 로그아웃됩니다.");
            doLogout();
            moveToLogin();

        } catch (error) {
            console.error("비밀번호 변경 오류:", error);
            alert("비밀번호 변경에 실패했습니다.");
        }
    };
    
    // 카카오페이 호출 메소드 --------------------------
    const [amount, setAmount] = useState(0);

    const handleChargeChange = (e) => {
        setAmount(e.target.value);
    }

    const clickChargeBtn = async () => {
        const amount = parseInt(prompt("충전할 포인트를 입력하세요: ", "0"), 10);

        if (isNaN(amount) || amount <= 0) {
            alert("유효한 포인트를 입력하세요.");
            return;
        }

        const { IMP } = window;
        IMP.init('imp18513031'); // 가맹점 번호 지정
        IMP.request_pay({
            pg : 'kakaopay.TC0ONETIME', // 결제 방식 지정
            pay_method : 'card',
            merchant_uid : `mid_${new Date().getTime()}`, // 현재 시간
            name : 'live_chating',
            amount : amount, // 충전 금액
            buyer_name : loginInfo.nickname // 충전 요청한 유저의 닉네임
        }, function(rsp) {
            if (rsp.success) {
                //axios.get(`http://localhost:8080/v1/verify/` + rsp.imp_uid)
                axios.get(apiURLs.kakaopay + rsp.imp_uid)
                .then((response) => {
                    console.log(response);
                    const newPoints = response.data.amount;
                    // Redux 상태 업데이트
                    dispatch(updatePoints(newPoints));
                    alert(`포인트가 성공적으로 충전되었습니다. 새로운 포인트: ${newPoints}`);
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                alert("결제가 실패하였습니다.");
                console.log(rsp);
            }
        });
    }

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
                    <button className="charge-btn" onClick={clickChargeBtn}>충전하기</button>
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

                    <div className='info'>가입시 등록한 이메일을 입력하시면 이메일로 임시비밀번호를 보내드립니다.</div>

                    {/* <div className="infoLabel">이메일</div> */}
                    <div className="inputWithButton-m">
                        <input
                            className="infoInput1"
                            name="email"
                            type={'text'}
                            placeholder="이메일"
                            onChange={handleModalChange}
                        />
                        <button className="checkButton" onClick={handleEmailCheck}>이메일 확인</button>
                    </div>
                    {emailCheckResult && <div className="error">{emailCheckResult}</div>}
                    {/* <div className="infoLabel">인증번호</div>
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
                    /> */}
                    <button className='checkButton'
                        style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px' }}
                        onClick={handleSubmit}>임시비밀번호 받기</button>
                </span>
            </Modal>
            </div>
        </div>
    );
};

export default UserInfo;
