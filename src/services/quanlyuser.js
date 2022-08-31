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

const fetchTakeListUser = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};
export { fetchUserApi, fetchRegisterApi, fetchTakeListUser };
