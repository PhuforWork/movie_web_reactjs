import { request } from "../configs/axios";
import { GROUP_ID } from "../constants/common";

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

const fetchManagerCreateChedule = (data) => {
  return request({
    url: `/QuanLyDatVe/TaoLichChieu`,
    method: "POST",
    data: data,
  });
};

const fetchHistoryTicketApi = () => {
  return request({
    url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
  });
};

const fetchLayThongTinLichChieuHeThongRap = () => {
  return request({
    url: `/QuanLyRap/LayThongTinHeThongRap`,
    method: "GET",
  });
};

const fetchLayThongTinCumRapTheoHeThong = (maCumRap) => {
  return request({
    url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maCumRap}`,
    method: "GET",
  });
};
export {
  fetchCheduleShowMovieApi,
  fetchBookedTicketApi,
  fetchHistoryTicketApi,
  fetchManagerCreateChedule,
  fetchLayThongTinLichChieuHeThongRap,
  fetchLayThongTinCumRapTheoHeThong,
};
