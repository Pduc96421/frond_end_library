import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";

const ReminderAddModal = ({
  open,
  onCancel,
  onSubmit,
  loading,
  title = "Tạo nhắc nhở",
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        remindAt: new Date(values.remindAt).toISOString(),
      };
      await onSubmit(formattedValues);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form when modal is closed
    onCancel();
  };

  // Reset form when modal is opened
  React.useEffect(() => {
    if (open) {
      form.setFieldsValue(
        initialValues || {
          title: "",
          description: "",
          remindAt: moment().add(1, "day"),
        }
      );
    }
  }, [open, form, initialValues]);

  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Tạo"
      cancelText="Hủy"
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          remindAt: moment().add(1, "day"),
        }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề nhắc nhở" disabled={loading} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea
            placeholder="Nhập mô tả nhắc nhở"
            rows={4}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="remindAt"
          label="Thời gian nhắc nhở"
          rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Chọn thời gian"
            disabled={loading}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReminderAddModal;
