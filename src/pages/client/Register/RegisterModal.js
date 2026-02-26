import { useState } from "react";
import { Form, Input, Button, DatePicker, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import styles from "./RegisterModal.module.scss";
import { register, sendConfirmAccount } from "../../../services/authService";

const cx = classNames.bind(styles);

function RegisterModal({ open, onClose, onLogin }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { confirmPassword, dob, ...rest } = values;

    if (values.password !== confirmPassword) {
      return message.error("Mật khẩu xác nhận không khớp");
    }

    const payload = {
      ...rest,
      dob: dayjs(dob).format("YYYY-MM-DD"),
    };

    try {
      setLoading(true);
      await register(payload);
      await sendConfirmAccount(payload.email);
      message.success("Đăng ký thành công, vui lòng xác thực email!");
      navigate(`/verify-account?email=${payload.email}`);
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="ĐĂNG KÝ"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className={cx("register-modal")}
      closeIcon={<span className={cx("close-icon")}>×</span>}
    >
      <div className={cx("register-container")}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            sex: "Male",
            role: "user",
          }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Hãy nhập tên đăng nhập" },
              { min: 4, message: "Phải có ít nhất 4 kí tự" },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Hãy nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Hãy nhập họ và tên" }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="dob"
            rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Hãy nhập mật khẩu" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
              },
              { min: 6, message: "Phải có ít nhất 6 kí tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: "Hãy xác nhận mật khẩu" }]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item>
            <Link
              onClick={() => {
                onLogin();
              }}
              className={cx("link-login")}
            >
              Đã có tài khoản?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default RegisterModal;
