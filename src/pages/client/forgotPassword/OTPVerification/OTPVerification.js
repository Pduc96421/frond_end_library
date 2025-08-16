import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../ForgotPasswordModel/ForgotPasswordModal.module.scss";
import { verifyForgotPasswordOTP } from "~/services/usersService";

const cx = classNames.bind(styles);

function OTPVerification({ open, onClose, onLogin, email, onBack }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (values) => {
    try {
      setLoading(true);
      await verifyForgotPasswordOTP({ email, otp: values.otp });

      message.success("Mật khẩu mới đã được gửi đến email của bạn");
      form.resetFields();
      onClose();
      onLogin?.();
    } catch (error) {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi xác thực OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("wrapper")} style={{ display: open ? "flex" : "none" }}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h2>Xác thực OTP</h2>
          <button className={cx("close")} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={cx("email-display")}>Email: {email}</div>

        <Form form={form} layout="vertical" onFinish={handleVerifyOtp}>
          <Form.Item
            name="otp"
            label="Mã OTP"
            rules={[
              { required: true, message: "Vui lòng nhập mã OTP" },
              { len: 6, message: "Mã OTP phải có 6 số" },
            ]}
          >
            <Input placeholder="Nhập mã OTP" maxLength={6} />
          </Form.Item>

          <Form.Item className={cx("button-group")}>
            <Button type="link" onClick={onBack}>
              ← Quay lại
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default OTPVerification;
