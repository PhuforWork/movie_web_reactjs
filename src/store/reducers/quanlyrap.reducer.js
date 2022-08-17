import { SET_INFOTHEATER, SET_MOVIETHEATER } from "../types/name.type";

const RAPCHIEU_DEFAULT = {
  hethongRapChieu: [],
  thongtinRapChieu: [],
};

export const quanlyrapReducer = (
  state = RAPCHIEU_DEFAULT,
  { type, payload }
) => {
  switch (type) {
    case SET_MOVIETHEATER: {
      state.hethongRapChieu = payload;
      return { ...state };
    }
    case SET_INFOTHEATER: {
      state.thongtinRapChieu = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
