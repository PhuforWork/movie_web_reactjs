import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/common";
import { USER_ACCOUNT_KEY } from "../store/types/name.type";

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    // Authorization: userInfo?.accessToken,
  },
});

//REQUEST:  A => INTERCEPTORS => B
request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem(USER_ACCOUNT_KEY);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    // console.log(userInfo.accessToken);

    //Bearer: tiêu chuẩn JSON web token
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }
  return config;
});

//RESPONE:  A => INTERCEPTORS => B

request.interceptors.response.use((response) => {
  return response;
});
