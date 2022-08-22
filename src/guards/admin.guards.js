import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminGuards() {
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quanlynguoidung.userAccount) {
      notification.warning({
        message: "Khách hàng chưa đăng nhập hoặc nhập sai tài khoản",
      });
      return navigate("/adminguards/login");
    } else if (
      quanlynguoidung.userAccount &&
      quanlynguoidung.userAccount.maLoaiNguoiDung !== "QuanTri"
    ) {
      notification.warning({
        message: "Khách hàng không thể vào trang admin",
      });
      return navigate("/home");
    } else if (quanlynguoidung.userAccount) {
      navigate("/home");
    }
  }, [quanlynguoidung]);

  return <Outlet />;
}
