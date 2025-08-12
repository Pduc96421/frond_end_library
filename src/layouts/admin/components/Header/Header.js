import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import { useSelector } from "react-redux";

import styles from "./Header.module.scss";
import config from "~/config";
import logo from "~/assets/images/logo.png";
import Notification from "../Notification";

const cx = classNames.bind(styles);

function Header() {
  const { isLoggedIn, userData } = useSelector((state) => state.loginReducer);

  const navigate = useNavigate();
  const userMenuItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => navigate(config.routesAdmin.auth.logout),
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("left")}>
        <Link to={config.routesAdmin.dashboard} className={cx("logo")}>
          <img src={logo} alt="Logo" />
          <span>Tổng quan</span>
        </Link>
      </div>

      <div className={cx("right")}>
        <div className={cx("notification")}>
          <Notification />
        </div>

        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Space className={cx("user")}>
            <Avatar
              size={40}
              src={userData?.avatarUrl}
              alt={userData?.username}
              icon={<UserOutlined />}
              className={cx("avatar")}
            />
            <span className={cx("username")}>{userData?.username}</span>
          </Space>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
