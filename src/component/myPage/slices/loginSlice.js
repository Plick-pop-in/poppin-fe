// 컴포넌트는 아님
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { loginPost } from "../api/userApi";
import { getCookie, removeCookie, setCookies } from "./cookieUtil";

const initState = {
    email: '',
    id: ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('member')
    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param))

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log('.........login', action)
            console.log(action.payload)
            
            setCookies("member", JSON.stringify(action.payload), 1)

            return action.payload
        },
        logout: () => {
            console.log('.........logout')

            removeCookie('member')

            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfiled")
            const payload = action.payload

            if(!payload.error) {
                setCookies("member", JSON.stringify(payload), 1)
            }

            return payload
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })
    }
})

// 외부에서 login, logout 호출 가능
export const {login, logout} = loginSlice.actions
export default loginSlice.reducer