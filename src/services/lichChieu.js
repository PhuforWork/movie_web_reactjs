import { request } from "../configs/axios";

const fetchCheduleShowMovieApi = (maLichChieu) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
    method: "GET",
  });
};

const fetchBookedTicketApi = (data) => {
  return request({
    url: `/QuanLyDatVe/DatVe`,
    method: "POST",
    data: data,
  });
};

const fetchHistoryTicketApi = () => {
  return request({
    url: "/QuanLyNguoiDung/ThongTinTaiKhoan",
    method: "POST",
  });
};
export { fetchCheduleShowMovieApi, fetchBookedTicketApi, fetchHistoryTicketApi };
