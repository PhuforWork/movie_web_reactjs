import { SET_BOOKING_MOVIE, SET_SEAT_BOOKED } from "../types/name.type";

const BOOKING_MOVIE_DEFAULT = {
  chiTietPhongVe: {},
  danhSachGheDaDat: [],
};

export const quanlydatveReducer = (
  state = BOOKING_MOVIE_DEFAULT,
  { type, payload }
) => {
  switch (type) {
    case SET_BOOKING_MOVIE: {
      state.chiTietPhongVe = payload;
      return { ...state };
    }
    case SET_SEAT_BOOKED: {
      let danhSachGheCapNhat = [...state.danhSachGheDaDat];
      let indx = danhSachGheCapNhat.findIndex(
        (ele) => ele.maGhe === payload.maGhe
      );
      if (indx !== -1) {
        danhSachGheCapNhat.splice(indx, 1);
      } else {
        danhSachGheCapNhat.push(payload);
      }
      return { ...state, danhSachGheDaDat: danhSachGheCapNhat };
    }
    default:
      return state;
  }
};
