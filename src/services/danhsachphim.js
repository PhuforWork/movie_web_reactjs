import { request } from "../configs/axios";
import { GROUP_ID } from "../constants/common";

const fetchMovieListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
    method: "GET",
  });
};

const fetchManagerTheaterApi = () => {
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`,
    method: "GET",
  });
};

const fetchInfoTheaterApi = () => {
  return request({
    url: "/QuanLyRap/LayThongTinHeThongRap",
    method: "GET",
  });
};

const fetchInfoCheduleMovieApi = (maPhim) => {
  // console.log(maPhim);
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    method: "GET",
  });
};

export { fetchMovieListApi, fetchManagerTheaterApi, fetchInfoTheaterApi,fetchInfoCheduleMovieApi };
