import React, { useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import classNames from "classnames/bind";
import styles from "./RegisterModal.module.scss";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

function RegisterModal({ open, onClose, onLogin }) {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
		fullName: "",
		dob: "",
	});
	const [form] = Form.useForm();

	const handleChange = (e) => {
		// console.log(e.target.name);
		// console.log(e.target.value);
		// console.log("------");
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const API_DOMAIN = "http://localhost:8088/";
const handleSubmit = async (values) => {
  try {
    const response = await fetch(`${API_DOMAIN}users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    
    if (response.ok) {
      // Thông báo thành công
      notification.success({
        message: "Đăng ký thành công!",
        description: "Vui lòng kiểm tra email để kích hoạt tài khoản của bạn.",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        placement: "topRight",
        duration: 6, // Hiển thị 6 giây
      });
      
      // Đóng modal và chuyển đến modal đăng nhập
      onClose();
      onLogin();
    } else {
      // Thông báo lỗi
      notification.error({
        message: "Đăng ký thất bại",
        description: result.message || "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
        icon: <WarningOutlined style={{ color: "#ff4d4f" }} />,
        placement: "topRight",
        duration: 6, // Hiển thị 6 giây
      });
    }
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    notification.error({
      message: "Lỗi kết nối",
      description: "Không thể kết nối tới máy chủ. Vui lòng thử lại sau.",
      placement: "topRight",
      duration: 6,
    });
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
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				className={cx("register-form")}
			>
				<Form.Item
					name="fullName"
					label="Tên đầy đủ"
					rules={[{ required: true, message: "Vui lòng nhập tên đầy đủ" }]}
				>
					<Input
						onChange={handleChange}
						name="fullName"
						placeholder="Nguyễn Văn A"
						className={cx("input-field")}
					/>
				</Form.Item>

				<Form.Item
					name="dob"
					label="Ngày sinh"
					rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
				>
					<Input
						onChange={handleChange}
						name="dob"
						placeholder="01/01/2000"
						// type="date"
						className={cx("input-field")}
					/>
				</Form.Item>

				<Form.Item
					name="email"
					label="Địa chỉ email"
					rules={[
						{ required: true, message: "Vui lòng nhập địa chỉ email" },
						{ type: "email", message: "Email không hợp lệ" },
					]}
				>
					<Input
						onChange={handleChange}
						name="email"
						placeholder="example@gmail.com"
						className={cx("input-field")}
					/>
				</Form.Item>

				<Form.Item
					name="username"
					label="Tên tài khoản"
					rules={[
						{ required: true, message: "Vui lòng nhập tên tài khoản" },
						{ min: 4, message: "Tên tài khoản phải có ít nhất 4 ký tự!" },
					]}
				>
					<Input
						onChange={handleChange}
						name="username"
						placeholder="NguuyenVanA"
						className={cx("input-field")}
					/>
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
					<Input.Password
						onChange={handleChange}
						name="password"
						placeholder="••••••••"
						className={cx("input-field")}
					/>
				</Form.Item>

				<Form.Item
					name="confirmPassword"
					label="Nhập lại mật khẩu"
					rules={[
						{ required: true, message: "Vui lòng nhập lại mật khẩu" },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("Mật khẩu không khớp"));
							},
						}),
					]}
				>
					<Input.Password
						placeholder="••••••••"
						className={cx("input-field")}
					/>
				</Form.Item>

				<Form.Item className={cx("submit-button-container")}>
					<button type="submit" className={cx("submit-btn")}>
						Đăng ký
					</button>
				</Form.Item>

				<div className={cx("login-section")}>
					<span>Đã có tài khoản?</span>
					<button type="button" className={cx("login-link")} onClick={onLogin}>
						Đăng nhập
					</button>
				</div>
			</Form>
		</Modal>
	);
}

export default RegisterModal;
