// import { TOKEN } from "../../constants/common";
import {
  GET_INFO_USER,
  GET_LIST_USER,
  GET_PERSONAL_INFORMATION,
  SET_ACCOUNTS_USER,
  SET_HISTORY_BOOKED,
  USER_ACCOUNT_KEY,
} from "../types/name.type";

let userAccount = localStorage.getItem(USER_ACCOUNT_KEY);

if (userAccount) {
  userAccount = JSON.parse(userAccount);
}

const USER_DEFAULT = {
  userAccount: userAccount,
  userRegister: [
    {
      taiKhoan: "string",
      matKhau: "string",
      email: "string",
      soDt: "string",
      maNhom: "string",
      hoTen: "string",
    },
  ],
  infoUserTicket: [],
  userListInfo: [],
  userTakeInfo: [],
  persionalInformation: [],
};

export const quanlyUserReducer = (state = USER_DEFAULT, { type, payload }) => {
  switch (type) {
    case SET_ACCOUNTS_USER: {
      // console.log(payload);
      state.userAccount = payload;
      return { ...state };
    }
    case SET_HISTORY_BOOKED: {
      state.infoUserTicket = payload;
      return { ...state };
    }
    case GET_LIST_USER: {
      state.userListInfo = payload;
      return { ...state };
    }
    case GET_INFO_USER: {
      state.userTakeInfo = payload;
      return { ...state };
    }
    case GET_PERSONAL_INFORMATION:{
      state.persionalInformation = payload;
      return {...state}
    }
    default:
      return state;
  }
};
