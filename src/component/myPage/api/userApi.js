// // post 방식으로 Login
// import axios from "axios"
// import {API_SERVER_HOST} from 

// const host = `${API_SERVER_HOST}/api/user`

// export const loginPost = async (loginParam) => {
//     const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

//     const form = new FormData()
//     form.append('username', loginParam.email)
//     form.append('password', loginParam.pw)

//     const res = await axios.post(`${host}/login`, form, header)

//     return res.data
// }