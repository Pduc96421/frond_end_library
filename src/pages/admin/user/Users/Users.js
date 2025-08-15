import { Table, Button, Card, Row, Col, Tag, Dropdown, Modal } from "antd";
import { MoreOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import styles from "./Users.module.scss";
import { showAlert } from "~/store/actions/alert";
import { deleteUser, getUsers, searchUsers } from "~/services/usersService";
import SearchUi from "../../Search";

const cx = classNames.bind(styles);

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchApiData = async (params = {}) => {
    try {
      setLoading(true);
      const { page = pagination.current - 1, pageSize = pagination.pageSize } = params;
      const keyword = searchParams.get("keyword");

      const response = keyword ? await searchUsers(keyword, page, pageSize) : await getUsers(page, pageSize);

      setDataUsers(response.result.content || []);
      setPagination((prev) => ({
        ...prev,
        total: response.result.totalElements || 0,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(showAlert(error.message || "Không thể tải danh sách người dùng", "error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleStatusChange = async (userId) => {
    await deleteUser(userId);
    fetchApiData(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Ảnh đại diện",
      key: "avatarUrl",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className={cx("avatar-container")}>
          <img src={record.avatarUrl} alt={record.fullName} className={cx("avatar-image")} />
        </div>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 250,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "success" : "error"}>{status === "ACTIVE" ? "Hoạt động" : "Tạm khóa"}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "Xem chi tiết",
                icon: <EyeOutlined />,
                onClick: () => navigate(`/admin/users/detail/${record.id}`),
              },
              { type: "divider" },
              {
                key: "status",
                label: record.status === "ACTIVE" ? "Khóa tài khoản" : "Mở khóa",
                icon: record.status === "ACTIVE" ? <LockOutlined /> : <UnlockOutlined />,
                danger: record.status === "ACTIVE",
                onClick: () => {
                  Modal.confirm({
                    title: `Xác nhận ${record.status === "ACTIVE" ? "khóa" : "mở khóa"} tài khoản`,
                    content: `Bạn có chắc chắn muốn ${record.status === "ACTIVE" ? "khóa" : "mở khóa"} tài khoản của ${
                      record.fullName
                    }?`,
                    okText: "Xác nhận",
                    cancelText: "Hủy",
                    onOk: () => handleStatusChange(record.id),
                  });
                },
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className={cx("users-container")}>
      <Card title="Danh sách người dùng" className={cx("card-wrapper")}>
        <div className={cx("section")}>
          <Row className={cx("toolbar")} gutter={[16, 16]}>
            <Col xs={24} sm={12} md={16}>
              <SearchUi redirect="/admin/users" />
            </Col>
          </Row>
        </div>

        <div className={cx("section")}>
          <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey="id"
            loading={loading}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Tổng số ${total} người dùng`,
            }}
            onChange={handleTableChange}
            scroll={{ x: 1100 }}
            bordered
            className={cx("user-table")}
          />
        </div>
      </Card>
    </div>
  );
}

export default Users;
