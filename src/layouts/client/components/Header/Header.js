import classNames from "classnames/bind";
import { Col, Row, Avatar, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faUser,
  faSignOutAlt,
  faUserCircle,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Search from "../Search";
import CategoryModal from "~/pages/client/Category/CategoryModal";
import styles from "./Header.module.scss";
import logo from "~/assets/images/logo.png";
import RegisterModal from "~/pages/client/Register";
import LoginModal from "~/pages/client/Login/LoginModal";
import ForgotPasswordModal from "~/pages/client/ForgotPassword";
import config from "~/config";
import { checkLogin } from "~/store/actions/login";
import { deleteCookie } from "~/helpers/cookie";

const cx = classNames.bind(styles);

function Header() {
  const { isLoggedIn, userData } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleOpenRegister = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
    setShowRegisterModal(true);
  };

  const handleOpenLogin = () => {
    setShowRegisterModal(false);
    setShowForgotPasswordModal(false);
    setShowLoginModal(true);
  };

  const handleOpenForgotPassword = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(checkLogin(false));
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const shouldOpenLoginModal =
      sessionStorage.getItem("openLoginModal") === "true";
    if (shouldOpenLoginModal) {
      // Mở modal đăng nhập
      setShowLoginModal(true);
      sessionStorage.removeItem("openLoginModal");
    }
  }, []); // Chỉ chạy một lần khi component mount

  const userMenuItems = [
    {
      key: "1",
      label: "Trang cá nhân",
      icon: <FontAwesomeIcon icon={faUserCircle} />,
      onClick: () => navigate("/account/profile"),
    },
    {
      key: "4",
      label: "Thư viện",
      icon: <FontAwesomeIcon icon={faBookmark} />,
      onClick: () => navigate("/library"),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Đăng xuất",
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Row justify="space-between" align="middle">
            <Col span={3}>
              <div className={cx("logo")}>
                <Link to={config.routesClient.home} className={cx("logo-link")}>
                  <img alt="logo" src={logo} />
                </Link>
              </div>
            </Col>

            <Col span={3}>
              <button
                className={cx("category-btn")}
                onClick={() => setShowCategoryModal(true)}
              >
                Danh mục
              </button>
            </Col>

            <Col span={8}>
              <Search />
            </Col>

            <Col span={4}>
              <div className={cx("actions")}>
                <div className={cx("auth-buttons")}>
                  <Link to={"/upload"}>
                    <button className={cx("upload-btn")}>Tải lên</button>
                  </Link>
                </div>
              </div>
            </Col>

            <Col span={2}>
              <Link to="/introduce" className={cx("intro-section")}>
                <div className={cx("divider")}></div>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className={cx("intro-icon")}
                />
                <div className={cx("divider")}></div>
              </Link>
            </Col>

            <Col span={4}>
              <div className={cx("actions")}>
                {isLoggedIn ? (
                  <div className={cx("user-section")}>
                    <Dropdown
                      menu={{ items: userMenuItems }}
                      trigger={["click"]}
                    >
                      <Space className={cx("user-info")}>
                        <Avatar
                          src={userData?.avatarUrl}
                          icon={
                            !userData?.avatarUrl && (
                              <FontAwesomeIcon icon={faUser} />
                            )
                          }
                          className={cx("user-avatar")}
                        />
                        <span className={cx("username")}>
                          {userData?.fullName || "Người dùng"}
                        </span>
                      </Space>
                    </Dropdown>
                  </div>
                ) : (
                  <div className={cx("auth-buttons")}>
                    <button
                      onClick={handleOpenLogin}
                      className={cx("login-btn")}
                    >
                      Đăng nhập
                    </button>

                    <button
                      className={cx("register-btn")}
                      onClick={handleOpenRegister}
                    >
                      Đăng ký
                    </button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <CategoryModal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />

      {!isLoggedIn && (
        <>
          <LoginModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onForgotPassword={handleOpenForgotPassword}
            onRegister={handleOpenRegister}
          />

          <RegisterModal
            open={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
            onLogin={handleOpenLogin}
          />

          <ForgotPasswordModal
            open={showForgotPasswordModal}
            onClose={() => setShowForgotPasswordModal(false)}
            onLogin={handleOpenLogin}
            onRegister={handleOpenRegister}
          />
        </>
      )}
    </>
  );
}

export default Header;
