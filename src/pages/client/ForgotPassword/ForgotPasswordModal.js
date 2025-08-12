import React from 'react';
import { Modal, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './ForgotPasswordModal.module.scss';

const cx = classNames.bind(styles);

function ForgotPasswordModal({ open, onClose, onLogin, onRegister }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Handle password reset logic here
  };

  return (
    <Modal
      title="ĐẶT LẠI MẬT KHẨU"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className={cx('forgot-password-modal')}
      closeIcon={<span className={cx('close-icon')}>×</span>}
    >
      <div className={cx('subtitle')}>
        <p>Bạn quên mật khẩu đăng nhập?</p>
        <p>Nhập email đăng ký tài khoản, chúng tôi sẽ giúp bạn lấy lại mật khẩu</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={cx('forgot-password-form')}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email là bắt buộc!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Email" className={cx('input-field')} />
        </Form.Item>

        <Form.Item>
          <button type="submit" className={cx('submit-btn')}>
            GỬI YÊU CẦU
          </button>
        </Form.Item>

        <div className={cx('footer-links')}>
          <button type="button" onClick={onRegister} className={cx('register-link')}>
            Tạo tài khoản mới
          </button>
          <span className={cx('divider')}>|</span>
          <span>Đã có tài khoản? <button onClick={onLogin}>Đăng nhập</button></span>
        </div>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;