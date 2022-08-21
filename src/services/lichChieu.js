import { request } from "../configs/axios";

const fetchCheduleShowMovieApi = (maLichChieu) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
    method: "GET",
  });
};

export {fetchCheduleShowMovieApi}