import { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./LibraryForm.module.scss";

const cx = classNames.bind(styles);

function LibraryForm({ 
  open, 
  onCancel, 
  onSubmit, 
  loading, 
  initialValues,
  title = "Tạo thư viện mới" 
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleSubmit = async (values) => {
    await onSubmit(values);
    if (!initialValues) {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Tên thư viện"
          rules={[
            { required: true, message: "Vui lòng nhập tên thư viện" },
            { max: 100, message: "Tên thư viện không được quá 100 ký tự" }
          ]}
        >
          <Input placeholder="Nhập tên thư viện" />
        </Form.Item>

        <Form.Item 
          name="description" 
          label="Mô tả"
          rules={[
            { max: 500, message: "Mô tả không được quá 500 ký tự" }
          ]}
        >
          <Input.TextArea 
            placeholder="Nhập mô tả thư viện" 
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item className={cx("form-actions")}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            {initialValues ? "Cập nhật" : "Tạo mới"}
          </Button>
          <Button onClick={handleCancel}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LibraryForm;