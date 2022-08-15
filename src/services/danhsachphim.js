import { request } from "../configs/axios";
import { GROUP_ID } from "../constants/common";

const fetchMovieListApi = () => {
    return request({
      url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
      method:"GET"
    });
  };
  export{fetchMovieListApi}