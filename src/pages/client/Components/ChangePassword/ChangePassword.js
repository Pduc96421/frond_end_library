import React, { useState } from "react";
import { Form, Input, Button, notification, Alert, Space, Divider, Progress } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { changePassword } from "~/services/usersService";
import { getCookie } from "~/helpers/cookie";
import "animate.css";

import "./ChangePassword.scss";

function ChangePassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStatus, setPasswordStatus] = useState("");

  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordStatus("");
      return;
    }
    let strength = 0;
    let status = "Yếu";
    // Length check
    if (password.length >= 8) strength += 25;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 25;

    // Number check
    if (/[0-9]/.test(password)) strength += 25;

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength = Math.min(100, strength + 25);
    }

    if (strength <= 25) {
      status = "Yếu";
    } else if (strength <= 50) {
      status = "Trung bình";
    } else if (strength <= 75) {
      status = "Khá";
    } else {
      status = "Mạnh";
    }

    setPasswordStrength(strength);
    setPasswordStatus(status);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);

      // Verify token presence
      const token = getCookie("token") || localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        return;
      }

      const passwordData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      // Call the API
      const response = await changePassword(passwordData);

      notification.success({
        message: "Thành công",
        description: (
          <Space direction="vertical">
            <CheckCircleOutlined
              style={{ color: "#52c41a", fontSize: "24px" }}
              className="animate__animated animate__bounceIn"
            />
            <span>{response.message || "Đổi mật khẩu thành công"}</span>
          </Space>
        ),
        duration: 5,
        icon: <SafetyCertificateOutlined style={{ color: "#52c41a" }} />,
      });
      form.resetFields();
    } catch (error) {
      console.error("Change password error:", error);

      // Enhanced error handling
      let errorMessage = "Đổi mật khẩu thất bại";

      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            errorMessage = data?.message || "Thông tin mật khẩu không hợp lệ";
            break;
          case 401:
            errorMessage = "Mật khẩu hiện tại không đúng";
            break;
          case 403:
            errorMessage = "Bạn không có quyền thực hiện thao tác này";
            break;
          case 404:
            errorMessage = "Không tìm thấy API đổi mật khẩu";
            break;
          case 500:
            errorMessage = "Lỗi hệ thống, vui lòng thử lại sau";
            break;
          default:
            errorMessage = data?.message || "Đổi mật khẩu thất bại";
        }
      }

      setError(errorMessage);

      notification.error({
        message: "Lỗi",
        description: errorMessage,
        duration: 5,
        className: "error-notification animate__animated animate__shakeX",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "#ff4d4f";
    if (passwordStrength <= 50) return "#faad14";
    if (passwordStrength <= 75) return "#1890ff";
    return "#52c41a";
  };

  return (
    <div className="change-password-section">
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          className="error-alert animate__animated animate__headShake"
          closable
          onClose={() => setError(null)}
        />
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="password-form" requiredMark={false}>
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
          className="animate__animated animate__fadeInUp"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Nhập mật khẩu hiện tại"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className="password-input"
          />
        </Form.Item>

        <Divider dashed className="form-divider" />

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: "Mật khẩu phải có chữ hoa, chữ thường và số!",
            },
          ]}
          className="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Nhập mật khẩu mới"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className="password-input"
            onChange={(e) => calculatePasswordStrength(e.target.value)}
          />
        </Form.Item>

        {passwordStatus && (
          <div className="password-strength-indicator animate__animated animate__fadeIn">
            <Progress
              percent={passwordStrength}
              status="active"
              strokeColor={getPasswordStrengthColor()}
              showInfo={false}
              size="small"
            />
            <div className="strength-text" style={{ color: getPasswordStrengthColor() }}>
              <SafetyCertificateOutlined /> Độ mạnh: {passwordStatus}
            </div>
          </div>
        )}

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            }),
          ]}
          className="animate__animated animate__fadeInUp animate__delay-2s"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Xác nhận mật khẩu mới"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className="password-input"
          />
        </Form.Item>

        <Form.Item className="submit-item animate__animated animate__fadeInUp animate__delay-3s">
          <Button type="primary" htmlType="submit" className="change-btn" loading={loading} block>
            Cập nhật mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;
