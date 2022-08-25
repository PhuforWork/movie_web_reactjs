// import { TOKEN } from "../../constants/common";
import {
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
    default:
      return state;
  }
};
