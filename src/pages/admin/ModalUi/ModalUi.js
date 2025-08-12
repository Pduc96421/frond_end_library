import { Modal, Form, Input, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./ModalUi.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ModalUi({
  isOpen,
  onCancel,
  onSubmit,
  editingData = null,
  loading = false,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (editingData) {
        form.setFieldsValue({
          name: editingData.name,
          description: editingData.description,
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingData, form, isOpen]);

  const handleSubmit = async (values) => {
    await onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={editingData ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={cx("category-form")}
        preserve={false}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả danh mục">
          <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục" />
        </Form.Item>

        <div className={cx("form-actions")}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {editingData ? "Cập nhật" : "Thêm"}
          </Button>
          <Button className={cx("cancel")} onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalUi;
