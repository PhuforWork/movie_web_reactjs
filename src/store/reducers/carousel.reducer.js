import { SET_CAROUSEL } from "../types/name.type";

const CAROUSEL_DEFAULT = {
  carousel: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const carouselReducer = (
  state = CAROUSEL_DEFAULT,
  { type, payload }
) => {
  // console.log(payload);
  switch (type) {
    case SET_CAROUSEL: {
      return { ...state,carousel: payload };
    }
    default:
      return state;
  }
};
