import { SET_MOVIETHEATER } from "../types/name.type";

const RAPCHIEU_DEFAULT = {
  hethongRapChieu: [],
};

export const quanlyrapReducer = (
  state = RAPCHIEU_DEFAULT,
  { type, payload }
) => {
  switch (type) {
    case SET_MOVIETHEATER: {
        state.hethongRapChieu = payload;
        return {...state}
    }
    default:
      return state;
  }
};
