import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../ForgotPasswordModel/ForgotPasswordModal.module.scss";
import { requestForgotPasswordOTP } from "~/services/usersService";

const cx = classNames.bind(styles);

function ForgotPasswordRequest({ open, onClose, onOTPSent }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (values) => {
    try {
      setLoading(true);
      await requestForgotPasswordOTP(values.email);

      message.success("Mã OTP đã được gửi đến email của bạn");
      onOTPSent(values.email);
    } catch (error) {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi gửi OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("wrapper")} style={{ display: open ? "flex" : "none" }}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h2>Quên mật khẩu</h2>
          <button className={cx("close")} onClick={onClose}>
            ×
          </button>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSendOtp}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item className={cx("button-group")}>
            <Button type="default" onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Gửi mã OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordRequest;