import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Row,
  Col,
  Tag,
  Dropdown,
  Modal,
} from "antd";
import { PlusOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import styles from "./Libraries.module.scss";
import { showAlert } from "~/store/actions/alert";
import { deleteLibrary, getAllLibraryOfUser } from "~/services/libraryService";

const cx = classNames.bind(styles);
const { Search } = Input;

function Library() {
  const dispatch = useDispatch();
  const [dataLibraries, setDataLibraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchLibraries = async (params = {}) => {
    try {
      setLoading(true);
      const { page = 0, pageSize = 10, search = "" } = params;

      const response = await getAllLibraryOfUser(page, pageSize, search);

      if (response.code === 200) {
        setDataLibraries(response.result.content || []);
        setPagination((prev) => ({
          ...prev,
          total: response.result.totalElements || 0,
        }));
      } else {
        throw new Error(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
      dispatch(
        showAlert(error.message || "Không thể tải danh sách thư viện", "error")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraries({
      page: pagination.current - 1,
      pageSize: pagination.pageSize,
      search: searchText,
    });
  }, [pagination.current, pagination.pageSize, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    fetchLibraries({
      page: newPagination.current - 1,
      pageSize: newPagination.pageSize,
      search: searchText,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Tên thư viện",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 350,
    },
    {
      title: "Số tài liệu",
      dataIndex: "documentCount",
      key: "documentCount",
      width: 120,
      align: "center",
      sorter: true,
      render: (count) => (
        <Tag color={count > 0 ? "blue" : "default"}>{count} tài liệu</Tag>
      ),
    },
    {
      title: "Người tạo",
      key: "user",
      width: 180,
      render: (_, record) => (
        <Space>
          <img
            src={record.user.avatarUser || "/default-avatar.png"}
            alt={record.user.userName}
            className={cx("user-avatar")}
          />
          <span>{record.user.userName || "Ẩn danh"}</span>
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "delete",
                label: "Xóa thư viện",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleDelete(record),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa thư viện",
      content: `Bạn có chắc chắn muốn xóa thư viện "${record.name}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteLibrary(record.id);
          if (response.code === 200) {
            dispatch(showAlert("Xóa thư viện thành công", "success"));
            fetchLibraries({
              page: pagination.current - 1,
              pageSize: pagination.pageSize,
              search: searchText,
            });
          }
        } catch (error) {
          console.error("Error deleting library:", error);
          dispatch(showAlert("Không thể xóa thư viện", "error"));
        }
      },
    });
  };

  return (
    <div className={cx("library-container")}>
      <Card title="Danh sách thư viện">
        <Row className={cx("toolbar")} gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Tìm kiếm thư viện..."
              allowClear
              enterButton
              onSearch={handleSearch}
              className={cx("search-input")}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={dataLibraries}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng số ${total} thư viện`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
}

export default Library;
