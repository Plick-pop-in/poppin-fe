import React, {useState} from "react";
import useCustomLogin from "./useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";
import Modal from 'react-modal';
import apiURLs from '../../../apiURL';
import axios from "axios";

// 초기 설정
const initState = {
    email: '',
    password: ''
}

function LoginComponent(props) {
    // 로그인 상태를 관리하는 state
    const [loginParam, setLoginParam] = useState({...initState})
    const {doLogin, moveToPath} = useCustomLogin()

    // 입력값이 변경될 때 호출되는 함수
    const handleChange = (e) => {
        // 입력값을 loginParam 상태에 업데이트
        loginParam[e.target.name] = e.target.value
        // 변경된 loginParam으로 state를 업데이트
        setLoginParam({...loginParam})
    }

    // 로그인 버튼 클릭 시 호출되는 함수
    const handleClickLogin = (e) => {
        // Redux의 login 액션을 dispatch하여 로그인 요청
        // dispatch(login(loginParam))
        console.log('Login attempt with:', loginParam);


        doLogin(loginParam).then(data => {
            if(data.error) {
                alert("이메일과 패스워드를 확인해 주세요")
            }else {
                moveToPath("/Main")
            }
        })
    }

    // Enter 키를 눌렀을 때 로그인 시도
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickLogin(e);
        }
    }

    // 비밀번호를 잊으셨나요? 구현 ---------------------------
const [isOpen, setIsOpen] = useState(false);

const openModal = () => {
    setIsOpen(true);
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

const [emailCheckResult, setEmailCheckResult] = useState("");
const [email, setEmail] = useState("");
const {doLogout, moveToLogin} = useCustomLogin()

const handleModalChange = (e) => {
    const { value } = e.target;
    console.log("value : " + value);
    setEmail(value);
};

const handleEmailCheck = async () => {
    try {
        const response = await axios.post(apiURLs.checkEmail, { email: email });
        //const response = await axios.post("http://localhost:8080/v1/user/check-email", { email: formData.email });
        setEmailCheckResult(response.data ? "가입 확인된 이메일입니다." : "가입되지 않은 이메일입니다.");
    } catch (error) {
        console.error("이메일 확인 오류:", error);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    // 이메일 검사를 통과하지 못한 경우 비밀번호 전송을 진행하지 않음
    if (
        emailCheckResult === "" ||
        emailCheckResult === "가입되지 않은 이메일입니다."
    ) {
        console.log("One of the conditions was true, returning from function.");
        alert("이메일을 올바르게 입력해주세요.")
        return;
    }
    
    // 이후 로직 실행
    console.log("All conditions are false, proceeding with function.");

    try {
        const response = await axios.post(apiURLs.setPassword, email);
        //const response = await axios.post("http://localhost:8080/v1/user/set-password", email);
        console.log(response.data);
        alert("임시비밀번호가 전송되었습니다.");
        doLogout();
        moveToLogin();

    } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        alert("비밀번호 변경에 실패했습니다.");
    }
};

const closeModal = () => {
    setEmailCheckResult("");
    setIsOpen(false);
};

    return (
        <div className="loginContainer">
            <div className="loginTitle">로그인</div>
            <div className="loginDescription">pop`in을 즐길 준비가 되셨냐요?</div>
            <div className="loginLabel">이메일</div>
            <input
                className="loginInput"
                name="email"
                type={'text'}
                value={loginParam.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="이메일"
            />
            <div className="loginLabel">비밀번호</div>
            <input
                className="loginInput"
                name="password"
                type={'password'}
                value={loginParam.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호"
            />
            <div className="guideText" onClick={openModal}>비밀번호를 잊으셨냐요?</div>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
                <span className='modalContent'>
                    <div className='modal-cancle'>
                        <img
                            src={require('../../../assets/images/ic_cancle.png')}
                            alt='cancle'
                            onClick={closeModal}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div className='logoContainer'>
                        <img className='modal-logo'
                            src={require('../../../assets/images/bigLogo.png')}
                            alt='logo' />
                    </div>

                    <div className='info'>가입시 등록한 이메일을 입력하시면 이메일로 임시비밀번호를 보내드립니다.</div>

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
                    <button className='checkButton'
                        style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px' }}
                        onClick={handleSubmit}>임시비밀번호 받기</button>
                </span>
            </Modal>
            <div>
                <button className="loginButton"
                        onClick={handleClickLogin}>로그인</button>
            </div>
            <div className='signupPromptSmall'>다른 계정을 이용하시려면</div>
            <div className="kakaoContainer">
                <KakaoLoginComponent/>
            </div>
            <div className="signupPrompt">
                <div>아직 계정이 없으신가요? <a className="signupLink" href='../Signup'>회원가입</a></div>
            </div> 
        </div>
    );
} 

export default LoginComponent;