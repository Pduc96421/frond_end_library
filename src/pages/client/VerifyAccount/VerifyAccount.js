import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Form, message, Typography } from "antd";
import { confirmAccount, sendConfirmAccount } from "../../../services/authService";

const { Title } = Typography;

export default function VerifyAccount() {
  const [params] = useSearchParams();
  const email = params.get("email") || "";

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleConfirm = async () => {
    if (!otp.trim()) return message.warning("Vui lòng nhập mã OTP");

    try {
      setLoading(true);
      await confirmAccount(email, otp);
      message.success("Xác thực tài khoản thành công!");
      navigate("/");
    } catch (err) {
      message.error(err.response?.data?.message || "Xác thực thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await sendConfirmAccount(email);
      message.success("Mã OTP đã được gửi lại");
    } catch (err) {
      message.error(err.response?.data?.message || "Không thể gửi lại mã OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Xác thực tài khoản
      </Title>

      <p style={{ textAlign: "center" }}>
        Vui lòng kiểm tra email <strong>{email}</strong> và nhập mã OTP để xác nhận tài khoản.
      </p>

      <Form layout="vertical">
        <Form.Item label="Mã OTP">
          <Input placeholder="Nhập mã OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={handleConfirm} loading={loading}>
            Xác thực tài khoản
          </Button>
        </Form.Item>

        <Form.Item>
          <Button block onClick={handleResend} disabled={loading}>
            Gửi lại mã OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
