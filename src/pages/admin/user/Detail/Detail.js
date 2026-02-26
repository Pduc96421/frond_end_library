import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Badge, Tabs, Table, Empty, Modal } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  PhoneOutlined,
  FileOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";

import { showAlert } from "~/store/actions/alert";
import { deleteUser, getUserById } from "~/services/usersService";
import styles from "./Detail.module.scss";
import { hideLoading, showLoading } from "~/store/actions/loading";

const cx = classNames.bind(styles);

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const fetchUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await getUserById(id);

      setUserData(response.result);
    } catch (error) {
      dispatch(
        showAlert("Có lỗi xảy ra khi tải thông tin người dùng!", "error"),
      );
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderInfoItem = (icon, label, value) => (
    <div className={cx("info-item")}>
      <span className={cx("info-icon")}>{icon}</span>
      <div className={cx("info-content")}>
        <span className={cx("info-label")}>{label}</span>
        <span className={cx("info-value")}>{value || "--"}</span>
      </div>
    </div>
  );

  const handleDownloadDocument = (document) => {
    window.open(document.fileUrl, "_blank");
  };

  const documentsColumns = [
    {
      title: "STT",
      key: "index",
      width: 80,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên tài liệu",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      align: "center",
    },
    {
      title: "Lượt tải",
      dataIndex: "downloads",
      key: "downloads",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Badge
          status={status === "PENDING" ? "warning" : "success"}
          text={status === "PENDING" ? "Chờ duyệt" : "Đã duyệt"}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<DownloadOutlined />}
          onClick={() => handleDownloadDocument(record)}
        >
          Tải xuống
        </Button>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLockAccount = async () => {
    await deleteUser(id);
    fetchUserData();
  };

  if (!userData) {
    return null; // Or return a loading spinner
  }

  const tabItems = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        <div className={cx("personal-info")}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <IdcardOutlined className={cx("icon-primary")} />,
                "Họ và tên",
                userData?.fullName,
              )}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <MailOutlined className={cx("icon-primary")} />,
                "Email",
                <div className={cx("email-wrapper")}>
                  <span className={cx("email-text")}>{userData?.email}</span>
                  {userData?.emailVerified ? (
                    <Badge
                      className={cx("verification-badge")}
                      count={
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      }
                      title="Đã xác thực"
                    />
                  ) : (
                    <Badge
                      className={cx("verification-badge")}
                      count={
                        <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                      }
                      title="Chưa xác thực"
                    />
                  )}
                </div>,
              )}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <CalendarOutlined className={cx("icon-primary")} />,
                "Ngày sinh",
                userData?.dob &&
                  new Date(userData.dob).toLocaleDateString("vi-VN"),
              )}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <PhoneOutlined className={cx("icon-primary")} />,
                "Số điện thoại",
                userData?.phoneNumber,
              )}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <FileOutlined className={cx("icon-primary")} />,
                "Số lượt tải tài liệu",
                <span className={cx("download-count")}>
                  {userData?.documentDownload || 0}
                </span>,
              )}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem(
                <UserOutlined className={cx("icon-primary")} />,
                "Trạng thái tài khoản",
                <span className={cx("user-status-value", userData?.status)}>
                  {userData?.status === "ACTIVE" ? "Hoạt động" : "Khóa"}
                </span>,
              )}
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: "Tài liệu đã tải lên",
      children: (
        <div className={cx("user-documents")}>
          {userData?.documents?.content?.length > 0 ? (
            <Table
              rowKey="id"
              columns={documentsColumns}
              dataSource={userData.documents.content}
              pagination={{
                pageSize: userData.documents.size,
                current: userData.documents.page + 1,
                total: userData.documents.totalElements,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} tài liệu`,
              }}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Người dùng chưa tải lên tài liệu nào"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={cx("user-detail")}>
      <Card
        title="Thông tin người dùng"
        className={cx("detail-card")}
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        }
      >
        <div className={cx("user-header")}>
          <div className={cx("user-avatar")}>
            <img
              className={cx("avatar-image")}
              src={userData?.avatarUrl}
              alt="Avatar"
            />
          </div>
          <div className={cx("user-basicInfo")}>
            <h2 className={cx("fullName")}>{userData?.fullName}</h2>
            <div className={cx("user-meta")}>
              <span
                className={cx("user-status", {
                  active: userData?.status === "ACTIVE",
                })}
              >
                {userData?.status === "ACTIVE" ? "Hoạt động" : "Khóa"}
              </span>
              <span className={cx("user-email")}>
                <MailOutlined /> {userData?.email}
              </span>
            </div>
          </div>
          <div className={cx("quick-actions")}>
            <Button
              icon={<LockOutlined />}
              danger={userData?.status === "ACTIVE"}
              onClick={() => {
                Modal.confirm({
                  title: `Xác nhận ${userData.status === "ACTIVE" ? "khóa" : "mở khóa"} tài khoản`,
                  content: `Bạn có chắc chắn muốn ${userData.status === "ACTIVE" ? "khóa" : "mở khóa"} tài khoản của ${
                    userData.fullName
                  }?`,
                  okText: "Xác nhận",
                  cancelText: "Hủy",
                  onOk: () => handleLockAccount(userData.id),
                });
              }}
            >
              {userData?.status === "ACTIVE" ? "Khóa tài khoản" : "Mở khóa"}
            </Button>
          </div>
        </div>

        <div className={cx("user-detail-content")}>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={tabItems}
            className={cx("detail-tabs")}
          />
        </div>
      </Card>
    </div>
  );
}

export default Detail;
