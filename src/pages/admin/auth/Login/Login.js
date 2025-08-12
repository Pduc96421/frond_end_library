import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Login.module.scss";
import { login } from "~/services/authService";
import { getCookie, setCookie } from "~/helpers/cookie";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import { decodeToken } from "~/utils/authUtils";
import { checkLogin } from "~/store/actions/login";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const token = getCookie("token");

    // Validate input
    if (!username || !password) {
      dispatch(showAlert("Vui lòng nhập đầy đủ thông tin", "error"));
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);

      setCookie("token", response.result.token);
      const userData = decodeToken(token);

      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(checkLogin(true, userData));

      const targetPage = userData.role === "ADMIN" ? "/admin" : "/";
      navigate(targetPage);

      dispatch(showAlert("Đăng nhập thành công!", "success"));
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      dispatch(showAlert(error.message || "Đăng nhập thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <h2 className={cx("text")}>Đăng nhập</h2>
          <div className={cx("email")}>
            <label htmlFor="email">Tài khoản: </label>
            <input type="text" id="email" placeholder="Nhập email" disabled={loading} />
          </div>
          <div className={cx("password")}>
            <label htmlFor="password">Mật khẩu: </label>
            <input type="password" id="password" placeholder="Nhập mật khẩu" disabled={loading} />
          </div>
          <div>
            <button type="submit" className={cx("buttonSubmit")} disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
