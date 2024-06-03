import axios from "axios";

const rest_api_key = '6f093e4c7a2e3031f6778b220ce263d7';
const redirect_uri = 'http://localhost:3000/KakaoRedirect';
const auth_code_path = 'https://kauth.kakao.com/oauth/authorize';
const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    return kakaoURL;
};

export const getAccessToken = async (authCode) => {
    const headers = { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" };

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    });

    try {
        const res = await axios.post(access_token_url, params, { headers });
        const accessToken = res.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};

export const getMemberWithAccessToken = async (accessToken) => {
    try {
        const res = await axios.get(`http://localhost:8080/v1/user/kakao?accessToken=${accessToken}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching member information:', error);
        throw error;
    }
};
