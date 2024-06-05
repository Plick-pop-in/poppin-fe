import './css/Signup.css';
import React, { useState } from "react";
import axios from "axios";
import useCustomLogin from './module/useCustomLogin';
import apiURLs from '../../apiURL';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        nickname: ""
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailCheckResult, setEmailCheckResult] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [nicknameCheckResult, setNicknameCheckResult] = useState("");

    const { moveToLogin } = useCustomLogin();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // 이메일 유효성 검사
        if (name === "email") {
            const isValidEmail = validateEmail(value);
            setEmailError(isValidEmail ? "" : "올바른 이메일 형식이 아닙니다.");
        }

        // 비밀번호 길이 검사
        if (name === "password" || name === "confirmPassword") {
            const isValidPassword = value.length >= 8;
            setPasswordError(isValidPassword ? "" : "비밀번호는 8자 이상이어야 합니다.");
        }

        // 비밀번호와 비밀번호 확인 일치 검사
        if (name === "password" || name === "confirmPassword") {
            if (name === "confirmPassword" && value !== formData.password) {
                setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
            } else {
                setConfirmPasswordError("");
            }
        }
    };

    const handleEmailCheck = async () => {
        try {
            const response = await axios.post(apiURLs.checkEmail, { email: formData.email });
            //const response = await axios.post("http://localhost:8080/v1/user/check-email", { email: formData.email });
            setEmailCheckResult(response.data ? "이 이메일은 이미 사용 중입니다." : "사용 가능한 이메일입니다.");
        } catch (error) {
            console.error("이메일 확인 오류:", error);
        }
    };

    const handleNicknameCheck = async () => {
        try {
            const response = await axios.post(apiURLs.checkNickname, { nickname: formData.nickname });
            //const response = await axios.post("http://localhost:8080/v1/user/check-nickname", { nickname: formData.nickname });
            setNicknameCheckResult(response.data ? "이 닉네임은 이미 사용 중입니다." : "사용 가능한 닉네임입니다.");
        } catch (error) {
            console.error("닉네임 확인 오류:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사를 통과하지 못한 경우 회원가입을 진행하지 않음
        if (emailError || passwordError || emailCheckResult === "이 이메일은 이미 사용 중입니다." || confirmPasswordError || nicknameCheckResult === "이 닉네임은 이미 사용 중입니다.") {
            return;
        }

        try {
            console.log(formData);
            const response = await axios.post(apiURLs.Signup, formData);
            //const response = await axios.post("http://localhost:8080/v1/user/signup", formData);
            console.log(response.data);
            alert("회원가입이 완료되었습니다.");
            moveToLogin();
        } catch (error) {
            console.error("회원가입 오류:", error);
            alert("회원가입에 실패했습니다.");
        }
    };

    // 이메일 형식을 확인하는 함수
    const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(String(email).toLowerCase());
    };

    return (
        <div className="container">
            <div className="left-half">
                <div className="centered-image">
                    <img src={require('../../assets/images/bigLogo.png')} alt='logo'/>
                    <div className="title1">Welcome to Pop'in!</div>
                    <div className="title2">팝업의 세계에 들어올 준비가 되셨냐요?</div>
                </div>
            </div>
            <div className="right-half">
                <div className="signupContainer">
                    <div className="signupTitle">회원가입</div>
                    <form onSubmit={handleSubmit}>
                        <div className="signupLabel">이름</div>
                        <input
                            className="signupInput"
                            name="name"
                            type="text"
                            placeholder="이름"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <div className="signupLabel">이메일</div>
                        <div className="inputWithButton">
                            <input
                                className="emailInput"
                                name="email"
                                type="text"
                                placeholder="이메일"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <button type="button" className="checkButton" onClick={handleEmailCheck}>중복 확인</button>
                        </div>
                        {emailError && <div className="error">{emailError}</div>}
                        {emailCheckResult && <div className="error" style={{color:"red"}}>{emailCheckResult}</div>}
                        <div className="signupLabel">비밀번호</div>
                        <input
                            className="signupInput"
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="signupLabel">비밀번호 확인</div>
                        <input
                            className="signupInput"
                            name="confirmPassword"
                            type="password"
                            placeholder="비밀번호 확인"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {passwordError && <div className="error">{passwordError}</div>}
                        {confirmPasswordError && <div className="error" style={{color:"red"}}>{confirmPasswordError}</div>}
                        <div className="signupLabel">닉네임</div>
                        <div className="inputWithButton">
                            <input
                                className="nicknameInput"
                                name="nickname"
                                type="text"
                                placeholder="닉네임"
                                value={formData.nickname}
                                onChange={handleChange} // 여기서 handleChange 함수를 호출합니다
                            />
                            <button type="button" className="checkButton" onClick={handleNicknameCheck}>중복 확인</button>
                        </div>
                        {nicknameCheckResult && <div className="error" style={{color:"red"}}>{nicknameCheckResult}</div>}
                        <button className="signupButton" type="submit">회원가입</button>
                    </form>
                    <div className="loginPrompt">
                        <div>이미 계정이 있으신가요? <a className="loginLink" href='./Login'>로그인</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
