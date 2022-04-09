import React, { useState } from "react";
import { Layout as AntLayout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  HeatMapOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { API_URL, TOKEN } from "../const";
import axios from "axios";

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    axios.get(API_URL + "logout");
    window.location.href = "/";
  };

  return (
    <div className="">
      <AntLayout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/">
            <div className="logo d-flex align-items-center ps-2 fs-6">
              <HeatMapOutlined className="me-2" /> CRUD
            </div>
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="students">Students</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
              <Link to="/groups">Groups</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/courses">Courses</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
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
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
