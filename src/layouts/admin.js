import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SET_ACCOUNTS_USER, USER_ACCOUNT_KEY } from "../store/types/name.type";
import "./cssLayout/admin.scss";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const { Header, Sider, Content } = Layout;
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "User",
      children: [
        {
          key: "6",
          label: "List User",
          onClick: () => {
            navigate("/admin/dashboard");
          },
        },
        {
          key: "7",
          label: "Add User",
          onClick: () => {
            navigate("/admin/adduser");
          },
        },
      ],
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Films",
      children: [
        {
          key: "4",
          label: "List films",
          onClick: () => {
            navigate("/admin/films");
          },
        },
        {
          key: "5",
          label: "Add films",
          onClick: () => {
            navigate("/admin/addfilms");
          },
        },
      ],
    },
    // {
    //   key: "3",
    //   icon: <UploadOutlined />,
    //   label: "Showtime",
    //   onClick: () => {
    //     navigate("/admin/showtime/:id");
    //   },
    // },
  ];
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(USER_ACCOUNT_KEY);
    dispatch({
      type: SET_ACCOUNTS_USER,
      payload: null,
    });
    navigate("/adminguards/login");
  };
  useEffect(() => {
    if (
      quanlynguoidung.userAccount &&
      quanlynguoidung.userAccount.maLoaiNguoiDung !== "QuanTri"
    ) {
      notification.warning({
        message: "Khách hàng không thể vào trang admin",
      });
      return navigate("/home");
    }
  }, [quanlynguoidung]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background site-header-icons"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: (e) => {
                // console.log(e);
                return setCollapsed(!collapsed);
              },
            }
          )}
          <>
            {quanlynguoidung.userAccount ? (
              <span className="flex items-center ml-auto mr-3">
                Hello !{" "}
                <span className="ml-2 flex ">
                  <Avatar
                    className="uppercase"
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {quanlynguoidung.userAccount.taiKhoan.substr(0, 1)}
                  </Avatar>
                </span>
                <button className="ml-2" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </span>
            ) : (
              ""
            )}
          </>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
