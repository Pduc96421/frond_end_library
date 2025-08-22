import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Space, Tooltip, Card, Row, Col, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";

import styles from "./Categories.module.scss";
import { addCategory, deleteCategory, getCategories, searchCategory, updateCategory } from "~/services/categoryService";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchUi from "~/pages/admin/Search";
import ModalUi from "../../ModalUi";

const cx = classNames.bind(styles);

function Categories() {
  const [dataCategories, setDataCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setDataCategories(response.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(showAlert("Lấy danh mục thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchCategories = async (keyword) => {
    try {
      setLoading(true);
      const response = await searchCategory(keyword);
      setDataCategories(response.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(showAlert("Lấy danh mục thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  //ModalUI
  const [editingCategory, setEditingCategory] = useState(null);

  const showModal = (record = null) => {
    setEditingCategory(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        dispatch(showAlert("Cập nhật danh mục thành công", "success"));
      } else {
        await addCategory(values);
        dispatch(showAlert("Thêm danh mục thành công", "success"));
      }

      fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      dispatch(showAlert(error.message || "Thao tác thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };
  //End modal

  const handleDelete = async (id) => {
    try {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa danh mục này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          await deleteCategory(id);
          fetchCategories(); // Refresh the categories list
          dispatch(showAlert("Danh mục đã được xóa thành công", "success"));
        },
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      dispatch(showAlert("Xóa danh mục thất bại", "error"));
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "50%",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <Tag
            color={record.status === "ACTIVE" ? "success" : "error"}
            onClick={() => console.log("Status clicked:", record.status)}
          >
            {record.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Space size="middle" className={cx("action-buttons")}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/categories/detail/${record.id}/documents`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";

    if (keyword) {
      fetchSearchCategories(keyword);
    } else {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Card title="Quản lý danh mục" className={cx("card-wrapper")}>
      <div className={cx("section")}>
        <Row className={cx("toolbar")} gutter={[16, 16]}>
          <Col xs={24} sm={16} md={16}>
            <SearchUi redirect={"/admin/categories"} />
          </Col>
          <Col xs={24} sm={8} md={8} className={cx("button-col")}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                Thêm danh mục
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataCategories}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} thư viện`,
        }}
        className={cx("categories-table")}
        bordered
      />

      <ModalUi
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editingData={editingCategory}
        loading={loading}
      />
    </Card>
  );
}

export default Categories;
