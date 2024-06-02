import axios from "axios";

const API_SERVER_HOST = 'http://www.plick.shop';

export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}};

    const form = new URLSearchParams();
    form.append('username', loginParam.email);
    form.append('password', loginParam.password);

    const res = await axios.post(`${API_SERVER_HOST}/v1/user/login`, form, header);

    return res.data;
}

export const modifyMember = async (member) => {
    const res = await axios.put(`${API_SERVER_HOST}/v1/nickname/modify`, member);
    return res.data;
}
