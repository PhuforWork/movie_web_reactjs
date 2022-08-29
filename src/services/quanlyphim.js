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

const fetchAddMovieUploadPicApi = (data) => {
  return request({
    url: `/QuanLyPhim/ThemPhimUploadHinh`,
    method: "POST",
    data: data,
  });
};

const fetchGetInfoMovieApi = (maPhim) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
    method: "GET",
  });
};

const fetchCapNhatPhimUpload = (data) => {
  return request({
    url: `/QuanLyPhim/CapNhatPhimUpload`,
    method: "POST",
    data: data,
  });
};
export {
  fetchMovieListApi,
  fetchManagerTheaterApi,
  fetchInfoTheaterApi,
  fetchInfoCheduleMovieApi,
  fetchAddMovieUploadPicApi,
  fetchGetInfoMovieApi,
  fetchCapNhatPhimUpload,
};
