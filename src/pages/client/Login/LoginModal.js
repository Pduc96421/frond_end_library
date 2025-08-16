import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LoginModal.module.scss";

import { setCookie } from "~/helpers/cookie";
import { checkLogin } from "~/store/actions/login";
import { showAlert } from "~/store/actions/alert";
import { login } from "~/services/authService";
import { decodeToken } from "~/utils/authUtils";

const cx = classNames.bind(styles);

function LoginModal({ open, onClose, onForgotPassword, onRegister }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await login(values.emailPhone, values.password);

      const token = response.result.token;
      setCookie("token", token);

      const userData = decodeToken(token);
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(checkLogin(true, userData));
      dispatch(showAlert("Đăng nhập thành công!", "success"));
      onClose();

      const targetPage = userData.role === "ADMIN" ? "/admin" : "/";
      navigate(targetPage);
    } catch (error) {
      if (error.status === 402) {
        const email = error.response?.data?.result?.email;
        dispatch(showAlert("Hãy xác minh tài khoản của bạn", "error"));
        navigate(`/verify-account?email=${email}`);
        onClose();
      } else {
        console.error("Lỗi đăng nhập:", error);
        dispatch(showAlert("Đăng nhập thất bại", "error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      window.location.href = "http://localhost:8088/auth/google-login";
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      dispatch(showAlert("Đăng nhập Google thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="ĐĂNG NHẬP"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className={cx("login-modal")}
      closeIcon={<span className={cx("close-icon")}>×</span>}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className={cx("login-form")}>
        <Form.Item
          name="emailPhone"
          label="Tên đăng nhập"
          rules={[
            {
              min: 4,
              message: "Vui lòng nhập hơn bốn kí tự",
            },
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập",
            },
          ]}
        >
          <Input placeholder="Nhập tên đăng nhập" className={cx("input-field")} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: "Mật khẩu phải có chữ hoa, chữ thường và số!",
            },
          ]}
        >
          <Input.Password placeholder="••••••••" className={cx("input-field")} />
        </Form.Item>

        <Form.Item>
          <div className={cx("form-options")}>
            <button type="button" className={cx("forgot-password")} onClick={onForgotPassword}>
              Quên mật khẩu
            </button>
          </div>
        </Form.Item>

        <Form.Item>
          <button type="submit" className={cx("submit-btn")} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </Form.Item>

        <Form.Item>
          <Button disabled={loading} className={cx("google-btn")} onClick={handleGoogleLogin}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google icon"
              className={cx("google-icon")}
            />
            Đăng nhập bằng Google
          </Button>
        </Form.Item>

        <div className={cx("register-section")}>
          <span>Chưa có tài khoản?</span>
          <button type="button" className={cx("register-link")} onClick={onRegister}>
            Đăng ký ngay
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default LoginModal;
