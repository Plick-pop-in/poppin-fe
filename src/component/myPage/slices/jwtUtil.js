import axios from "axios";
import { getCookie, setCookies } from "./cookieUtil";
import {API_SERVER_HOST} from "../api/userApi"

const jwtAxios = axios.create();

const refreshJWT = async(accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers:{'Authorization':`Bearer ${accessToken}`}}
    const res = await axios.get(`${host}/user/refresh?refreshToken=${refreshToken}`, header)

    console.log(res.data)

    return res.data
}

const beforeReq = (config) => {
    console.log('before request.........')

    const memberInfo = getCookie('member')

    if(!memberInfo) {
        console.log("Member Not Found")
        return Promise.reject(
            {response:
                {data:
                    {error: "REQUIRE_LOGIN"}
                }
            }
        )
    }

    const {accessToken} = memberInfo
    console.log("..............." + accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

const requestFail = (error) => {
    console.log("request error.....")

    return Promise.reject(error)
}

const beforeRes = async (res) => {
    console.log("before return response.....")

    const data = res.data
    if(data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookieValue = getCookie('member')

        console.log("before" + memberCookieValue.accessToken)
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        // accessToken 갱신
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookies('member', JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)
    }

    return res
}

const responseFail = (error) => {
    console.log("response fail error........")
    return Promise.reject(error)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios