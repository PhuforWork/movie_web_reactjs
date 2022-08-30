import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./cssLayout/admin.scss";

export default function AdminLayout() {
  const { Header, Sider, Content } = Layout;
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "User",
      onClick: () => {
        navigate("/admin/dashboard");
      },
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
