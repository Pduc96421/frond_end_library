import { useEffect, useState } from "react";
import { Table, Space, Button, Tooltip, Modal, Form, Input, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";

import {
  getRoles,
  updateRole,
  deleteRole,
  createRole,
} from "~/services/roleService";
import { showAlert } from "~/store/actions/alert";
import styles from "./Roles.module.scss";

const cx = classNames.bind(styles);

function Roles() {
  const dispatch = useDispatch();
  const [dataRoles, setDataRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm(); // Create a dedicated form instance for the modal
  const [editingName, setEditingName] = useState(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      if (response.code === 200) {
        setDataRoles(response.result);
      } else {
        dispatch(showAlert("Lỗi khi tải danh sách vai trò!", "error"));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      dispatch(showAlert("Lỗi khi tải danh sách vai trò!", "error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = (record = null) => {
    if (record) {
      modalForm.setFieldsValue({
        name: record.name,
        description: record.description,
      });
      setEditingName(record.name);
    } else {
      modalForm.resetFields();
      setEditingName(null);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    modalForm.resetFields();
    setEditingName(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingName) {
        // Using name instead of id for updating
        const response = await updateRole(editingName, values);
        if (response.code !== 200) {
          throw new Error("Failed to update role");
        }
        dispatch(showAlert("Vai trò sửa thành công", "success"));
      } else {
        const response = await createRole(values);
        if (response.code !== 200) {
          throw new Error("Failed to add role");
        }
        dispatch(showAlert("Vai trò đã được thêm thành công", "success"));
      }

      fetchRoles(); // Refresh the roles list
      setIsModalOpen(false);
      modalForm.resetFields();
      setEditingName(null);
    } catch (error) {
      console.error("Error saving role:", error);
      dispatch(showAlert("Vai trò lưu thất bại", "error"));
    }
  };

  const handleDelete = async (name) => {
    try {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa vai trò này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          // Using name instead of id for deleting
          const response = await deleteRole(name);
          if (response.code === 200) {
            fetchRoles(); // Refresh the roles list
            dispatch(showAlert("Vai trò đã được xóa thành công", "success"));
          } else {
            throw new Error("Failed to delete role");
          }
        },
      });
    } catch (error) {
      console.error("Error deleting role:", error);
      dispatch(showAlert("Xóa vai trò thất bại", "error"));
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => <span key={`index-${index}`}>{index + 1}</span>,
    },
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center",
      render: (text) => <span key={`name-${text}`}>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "50%",
      align: "center",
      render: (text, record) => <span key={`desc-${record.name}`}>{text}</span>,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Space
          size="middle"
          className={cx("action-buttons")}
          key={`action-${record.name}`}
        >
          <Tooltip title="Chỉnh sửa" key={`edit-tooltip-${record.name}`}>
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => showModal(record)}
              className={cx("edit-button")}
              key={`edit-btn-${record.name}`}
            />
          </Tooltip>
          <Tooltip title="Xóa" key={`delete-tooltip-${record.name}`}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.name)}
              className={cx("delete-button")}
              key={`delete-btn-${record.name}`}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={cx("roles-container")}>
      <Card title="Quản lý vai trò" className={cx("card-wrapper")}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataRoles}
          rowKey={(record) => record.name} // Using name as the rowKey instead of id
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Tổng số ${total} vai trò`,
          }}
          className={cx("roles-table")}
          bordered
        />

        {isModalOpen && (
          <Modal
            title={editingName ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
            className={cx("role-modal")}
          >
            <Form
              form={modalForm}
              layout="vertical"
              onFinish={handleSubmit}
              className={cx("role-form")}
              preserve={false}
            >
              <Form.Item
                name="name"
                label="Tên vai trò"
                rules={[
                  { required: true, message: "Vui lòng nhập tên vai trò" },
                ]}
              >
                <Input
                  placeholder="Nhập tên vai trò"
                  disabled={!!editingName}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả vai trò" />
              </Form.Item>

              <div className={cx("form-actions")}>
                <Button
                  type="default"
                  onClick={handleCancel}
                  className={cx("cancel-btn")}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={cx("submit-btn")}
                >
                  {editingName ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </Card>
    </div>
  );
}

export default Roles;
