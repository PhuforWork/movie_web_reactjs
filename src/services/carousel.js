// import { GROUP_ID } from "constants/common";
import { request } from "../configs/axios";

const fetchMovieBanner = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachBanner`,
    method:"GET"
  });
};
export{fetchMovieBanner}