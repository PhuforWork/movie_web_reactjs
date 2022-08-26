import { notification, Button } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const key = "updatable";

export default function AdminGuards() {
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!quanlynguoidung.userAccount) {
    //   notification.warning({
    //     message: "Khách hàng chưa đăng nhập hoặc nhập sai tài khoản",
    //   });
    //   return navigate("/adminguards/login");
    // }
    // if (
    //   quanlynguoidung.userAccount &&
    //   quanlynguoidung.userAccount.maLoaiNguoiDung !== "QuanTri"
    // ) {
    //   notification.warning({
    //     message: "Khách hàng không thể vào trang admin",
    //   });
    //   return navigate("/home");
    // }
    const openNotification = () => {
      notification.success({
        key,
        message: "Success",
        description: "Đăng nhập thành công",
      });
      setTimeout(() => {
        if (quanlynguoidung.userAccount.maLoaiNguoiDung !== "QuanTri") {
          notification.success({
            key,
            message: `Khách hàng ${quanlynguoidung.userAccount.hoTen}`,
            description: `Chào mừng quay trở lại`,
          });
        } else if (quanlynguoidung.userAccount.maLoaiNguoiDung === "QuanTri") {
          notification.success({
            key,
            message: "Quyền admin",
            description: `Chào mừng admin ${quanlynguoidung.userAccount.hoTen}`,
          });
        }
      }, 2000);
    };
    if (quanlynguoidung.userAccount) {
      openNotification();
      navigate("/home");
    }
  }, [quanlynguoidung]);

  return <Outlet />;
}
