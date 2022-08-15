import { SET_MOVIELIST } from "../types/name.type";


const MOVIELIST_DEFAULT = {
  movieInfo: [
    {
      maPhim: 1442,
      tenPhim: "Mad Max: Fury Road 2030",
      biDanh: "mad-max-fury-road-2030",
      trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/mad-max-fury-road_gp09.jpg",
      moTa: "In a stark desert landscape where humanity is broken, two rebels just might be able to restore order: Max, a man of action and of few words, and Furiosa, a woman of action who is looking to make it back to her childhood homeland.",
      maNhom: "GP09",
      ngayKhoiChieu: "2022-08-25T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
};

export const danhsachphimReducer = (
  state = MOVIELIST_DEFAULT,
  { type, payload }
) => {
  switch (type) {
    case SET_MOVIELIST:{
      return {...state}
    }
    default:
      return state;
  }
};
