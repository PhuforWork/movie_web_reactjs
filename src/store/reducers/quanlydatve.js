import {
  CHANGE_TABS,
  FINISH_BOOKTICKET,
  SET_BOOKING_MOVIE,
  SET_BOOK_TICKET,
  SET_SEAT_BOOKED,
} from "../types/name.type";

const BOOKING_MOVIE_DEFAULT = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  danhSachDatVe: [],
  tabActives: "1",
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
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let indx = danhSachGheCapNhat.findIndex(
        (ele) => ele.maGhe === payload.maGhe
      );
      if (indx !== -1) {
        danhSachGheCapNhat.splice(indx, 1);
      } else {
        danhSachGheCapNhat.push(payload);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }
    case SET_BOOK_TICKET: {
      state.danhSachDatVe = payload;
      return { ...state };
    }
    case FINISH_BOOKTICKET: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case CHANGE_TABS: {
      state.tabActives = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
