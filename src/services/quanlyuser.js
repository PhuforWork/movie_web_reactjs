import { request } from "../configs/axios";
import { GROUP_ID } from "../constants/common";

const fetchUserApi = (data) => {
  // {"taiKhoan":"duyvo", "matKhau":"123456"}
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: data,
  });
};

const fetchRegisterApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: data,
  });
};

const fetchTakeListUser = (tuKhoa = "") => {
  return request({
    url:
      tuKhoa !== ""
        ? `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
        : `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};

const fetchAddUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data: data,
  });
};
const fetchTakeInfoUserApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
    method: "POST",
  });
};

const fetchUpdateInfoUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "POST",
    data: data,
  });
};

const fetchDeleteUserApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    method: "DELETE",
  });
};
export {
  fetchUserApi,
  fetchRegisterApi,
  fetchTakeListUser,
  fetchAddUserApi,
  fetchTakeInfoUserApi,
  fetchUpdateInfoUserApi,
  fetchDeleteUserApi,
};
