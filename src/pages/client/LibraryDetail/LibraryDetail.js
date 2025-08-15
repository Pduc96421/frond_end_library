import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Empty, Button, Pagination, Badge, Tag, Modal } from "antd";
import {
  ArrowLeftOutlined,
  FolderOutlined,
  FileTextOutlined,
  EyeOutlined,
  LikeOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";

import {
  changeStatusDoc,
  deleteDocumentFromLibrary,
  deleteLibrary,
  getLibraryById,
  updateLibrary,
} from "~/services/libraryService";
import styles from "./LibraryDetail.module.scss";
import LoadingUi from "../Loading";
import LibraryForm from "../LibraryForm";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import ReminderForm from "../ReminderForm";

const { Title, Text, Paragraph } = Typography;
const cx = classNames.bind(styles);

function LibraryDetail() {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [showReminderList, setShowReminderList] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchLibrary = async () => {
    try {
      setLoading(true);
      const response = await getLibraryById(libraryId, pagination.page, pagination.size);

      setLibrary({
        ...response.result,
        documents: response.result.document.content,
      });
      setPagination({
        page: response.result.document.page,
        size: response.result.document.size,
        totalElements: response.result.document.totalElements,
        totalPages: response.result.document.totalPages,
      });
    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page: page - 1,
      size: pageSize,
    }));
  };

  //sửa xóa
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditLibrary = async (values) => {
    try {
      const response = await updateLibrary(libraryId, values);
      if (response.code === 200) {
        dispatch(showAlert("Cập nhật thư viện thành công", "success"));
        setShowEditModal(false);
        fetchLibrary();
      }
    } catch (error) {
      console.error("Error updating library:", error);
      dispatch(showAlert("Không thể cập nhật thư viện", "error"));
    }
  };

  const handleDeleteLibrary = () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa thư viện này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteLibrary(libraryId);
          if (response.code === 200) {
            dispatch(showAlert("Xóa thư viện thành công", "success"));
            navigate("/library");
          }
        } catch (error) {
          console.error("Error deleting library:", error);
          dispatch(showAlert("Không thể xóa thư viện", "error"));
        }
      },
    });
  };

  // xóa doc
  const handleDeleteDocument = (docId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa tài liệu này khỏi thư viện?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deleteDocumentFromLibrary(libraryId, docId);
          if (response.code === 200) {
            dispatch(showAlert("Xóa tài liệu thành công", "success"));
            fetchLibrary();
          }
        } catch (error) {
          console.error("Error deleting document:", error);
          dispatch(showAlert("Không thể xóa tài liệu", "error"));
        }
      },
    });
  };

  const handleReadDoc = async (documentId) => {
    try {
      await changeStatusDoc(libraryId, documentId);
    } catch (error) {
      dispatch(showAlert("thay đổi trạng thái thất bại", "error"));
    }
    navigate(`/documents/${documentId}`);
  };

  useEffect(() => {
    fetchLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryId, pagination.page, pagination.size]);

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <LoadingUi />
      </div>
    );
  }

  if (!library) {
    return (
      <div className={cx("error-container")}>
        <Empty description="Không tìm thấy thư viện" />
        <Button type="primary" onClick={() => navigate("/library")}>
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className={cx("library-detail")}>
      <div className={cx("header")}>
        <div className={cx("header-actions")}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/library")} className={cx("back-button")}>
            Quay lại
          </Button>
          <div className={cx("action-buttons")}>
            <Button icon={<EditOutlined />} onClick={() => setShowEditModal(true)} type="primary" ghost>
              Sửa
            </Button>
            <Button icon={<DeleteOutlined />} onClick={handleDeleteLibrary} danger>
              Xóa
            </Button>
          </div>
        </div>
        <div className={cx("library-info")}>
          <FolderOutlined className={cx("folder-icon")} />
          <div className={cx("info")}>
            <Title level={2}>{library.name}</Title>
            <Text type="secondary">{library.description}</Text>
            <div className={cx("user-info")}>
              <img src={library.user.avatarUser} alt={library.user.userName} className={cx("avatar")} />
              <Text>{library.user.userName}</Text>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("content")}>
        <Title level={3} className={cx("section-title")}>
          <FileTextOutlined /> Tài liệu trong thư viện
        </Title>

        {!library.documents?.length ? (
          <Empty description="Chưa có tài liệu nào trong thư viện" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {library.documents.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Card
                    hoverable
                    className={cx("document-card")}
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDocument(item.document.id);
                        }}
                      >
                        Xóa
                      </Button>,

                      <Button type="text" icon={<BellOutlined />} onClick={() => setShowReminderList(true)}>
                        Nhắc nhở
                      </Button>,
                    ]}
                  >
                    <div onClick={() => handleReadDoc(item.document.id)} className={cx("document-content")}>
                      <Badge.Ribbon
                        text={item.status === "COMPLETED" ? "Đã đọc" : "Chưa đọc"}
                        color={item.status === "COMPLETED" ? "green" : "blue"}
                      >
                        <div className={cx("document-content")}>
                          <Title level={4}>{item.document.title}</Title>
                          <Paragraph ellipsis={{ rows: 2 }}>{item.document.description}</Paragraph>

                          <div className={cx("document-meta")}>
                            <Tag color="blue">{item.document.category.name}</Tag>
                            <div className={cx("stats")}>
                              <span>
                                <EyeOutlined /> {item.document.views}
                              </span>
                              <span>
                                <LikeOutlined /> {item.document.like}
                              </span>
                              <span>
                                <DownloadOutlined /> {item.document.downloads}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className={cx("pagination-container")}>
              <Pagination
                current={pagination.page + 1}
                total={pagination.totalElements}
                pageSize={pagination.size}
                onChange={handlePageChange}
                showSizeChanger
                showTotal={(total) => `Tổng cộng ${total} tài liệu`}
              />
            </div>
          </>
        )}
      </div>
      <LibraryForm
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        onSubmit={handleEditLibrary}
        loading={loading}
        initialValues={library}
        title="Chỉnh sửa thư viện"
      />

      <ReminderForm open={showReminderList} onCancel={() => setShowReminderList(false)} />
    </div>
  );
}

export default LibraryDetail;
