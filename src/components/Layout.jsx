import React, { useState } from "react";
import { Button, Layout as AntLayout, Menu, Select } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  HeatMapOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeEn, changeRu, changeUz } from "../redux/actions/languageActions";
import { ContentWrapper, ThemeLangWrapper } from "./Layout.style";
import uz from "../assets/uz.png";
import ru from "../assets/ru.png";
import en from "../assets/en.png";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { toDark, toLight } from "../redux/actions/themeActions";
import { TOKEN } from "../const";

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("project_token");
    navigate("/");
  };

  const lan = useSelector((state) => state.languageReducer);
  const theme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const { Option } = Select;

  function handleChange(value) {
    if (value === "uz") dispatch(changeUz());
    else if (value === "ru") dispatch(changeRu());
    else if (value === "en") dispatch(changeEn());
  }

  const [changedTheme, setChangedTheme] = useState(true);
  const changeTheme = () => {
    setChangedTheme(!changedTheme);
    changedTheme ? dispatch(toDark()) : dispatch(toLight());
  };

  const token = localStorage.getItem(TOKEN);

  return (
    <div>
      <AntLayout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/">
            <div className="logo d-flex align-items-center ps-2 fs-6">
              <HeatMapOutlined className="me-2" /> {!collapsed ? "CRUD" : ""}
            </div>
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/bootcamps">{lan.bootcamps}</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
              <Link to="/users">{lan.users}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/courses">{lan.courses}</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
              <Link to="/">{lan.logout}</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: theme.bgColor,
              color: theme.textColor,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <ThemeLangWrapper>
              <Select defaultValue="uz" onChange={handleChange}>
                <Option value="uz">
                  uz
                  {/* <img src={uz} alt="" /> */}
                </Option>
                <Option value="ru">{/* ru <img src={ru} alt="" /> */}</Option>
                <Option value="en">{/* en <img src={en} alt="" /> */}</Option>
              </Select>

              <Button shape="circle" onClick={changeTheme}>
                {changedTheme ? <FaMoon /> : <BsSun />}
              </Button>
            </ThemeLangWrapper>
          </Header>
          <ContentWrapper theme={theme}>
            <Content
              style={{
                backgroundColor: `${theme.bgColor}`,
                color: `${theme.textColor}`,
              }}
              className="site-layout-background"
            >
              {token ? <Outlet /> : <Navigate to="/login" />}
            </Content>
          </ContentWrapper>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
