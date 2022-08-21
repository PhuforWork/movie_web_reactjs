import { SET_ACCOUNTS_USER, USER_ACCOUNT_KEY } from "../types/name.type";

let userAccount = localStorage.getItem(USER_ACCOUNT_KEY);

if (userAccount) {
  userAccount = JSON.parse(userAccount);
}

const USER_DEFAULT = {
  userAccount: userAccount,
};

export const quanlyUserReducer = (state = USER_DEFAULT, { type, payload }) => {
  switch (type) {
    case SET_ACCOUNTS_USER: {
      state.userAccount = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
