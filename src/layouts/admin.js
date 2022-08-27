import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  FolderOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate,NavLink } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("User", "1", <UserOutlined />),
  getItem("Films", "films1", <FolderOutlined />, [
    getItem("ListFilms", "3"),<NavLink to="/admin/films" />,
    getItem("Addfilms", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  // getItem("Files", "9", <FileOutlined />),
];

export default function AdminLayout() {
  const quanlynguoidung = useSelector((state) => state.quanlyUserReducer);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
