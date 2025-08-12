import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Tag,
  Descriptions,
  Image,
  Rate,
  Space,
  Button,
} from "antd";
import { FileTextOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";


import {
  approvedDocument,
  getDocumentById,
  rejectedDocument,
} from "~/services/documentService";
import { hideLoading, showLoading } from "~/store/actions/loading";
import styles from "./Detail.module.scss";
import { showAlert } from "~/store/actions/alert";

const cx = classNames.bind(styles);

function DocumentDetail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchDocument = async () => {
    try {
      dispatch(showLoading());
      const response = await getDocumentById(Number(id));
      console.log("Document response:", response);
      if (response.code === 200) {
        setDocument(response.result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleApprove = async () => {
    try {
      dispatch(showLoading());
      const response = await approvedDocument(id);
      console.log("Approve response:", response);
      if (response.code === 200) {
        dispatch(showAlert("duyệt tài liệu thành công", "success"));
        fetchDocument();
      }
    } catch (error) {
      console.error("Error approving document:", error);
      dispatch(showAlert("Có lỗi xảy ra khi duyệt tài liệu", "error"));
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleReject = async () => {
    try {
      dispatch(showLoading());
      const response = await rejectedDocument(id);
      console.log("Reject response:", response);
      if (response.code === 200) {
        dispatch(showAlert("từ chối tài liệu thành công", "success"));
        fetchDocument();
      }
    } catch (error) {
      console.error("Error rejecting document:", error);
      dispatch(showAlert("Có lỗi xảy ra khi từ chối tài liệu", "error"));
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!document) {
    return (
      <div className={cx("document-detail")}>
        <Card>
          <div style={{ padding: "20px", textAlign: "center" }}>
            Document not found
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cx("document-detail")}>
      <Card
        title={document.documentIndex.title}
        extra={
          <Space size="large" align="center">
            <Button
              type="primary"
              onClick={() => handleApprove()}
              disabled={document.documentIndex.status === "APPROVED"}
            >
              Duyệt bài
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleReject()}
              disabled={document.documentIndex.status === "REJECTED"}
            >
              Từ chối
            </Button>
            <Button type="primary" onClick={() => navigate(-1)}>
                        Quay lại
                      </Button>
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          {/* Preview Images */}
          <Col span={8}>
            <div className={cx("preview-images")}>
              <Image.PreviewGroup>
                {document.documentIndex.previewUrls.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className={cx("preview-image")}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </Col>

          {/* Document Information */}
          <Col span={16}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Trạng thái" span={2}>
                <Tag
                  color={
                    document.documentIndex.status === "APPROVED"
                      ? "success"
                      : document.documentIndex.status === "REJECTED"
                      ? "error"
                      : "warning"
                  }
                >
                  {document.documentIndex.status === "APPROVED"
                    ? "Đã duyệt"
                    : document.documentIndex.status === "REJECTED"
                    ? "Từ chối"
                    : "Chờ duyệt"}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Mô tả" span={2}>
                {document.documentIndex.description}
              </Descriptions.Item>

              <Descriptions.Item label="Danh mục" span={2}>
                {document.category.name}
              </Descriptions.Item>

              <Descriptions.Item label="Thẻ" span={2}>
                {document.documentIndex.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Descriptions.Item>

              {/* <Descriptions.Item label="Người tạo" span={2}>
                <Space>
                  <UserOutlined />
                  {document.createdBy.fullName} ({document.createdBy.email})
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Ngày tạo" span={2}>
                {moment(document.createdAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày cập nhật" span={2}>
                {moment(document.updatedAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item> */}

              <Descriptions.Item label="Đánh giá" span={2}>
                <Space>
                  <Rate
                    disabled
                    defaultValue={document.averageRating}
                    allowHalf
                  />
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Tương tác" span={2}>
                <Space size="large">
                  <span>
                    <EyeOutlined /> {document.views} lượt xem
                  </span>
                  <span>
                    <LikeOutlined /> {document.like} lượt thích
                  </span>
                  <span>
                    <FileTextOutlined /> {document.downloads} lượt tải
                  </span>
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <div className={cx("actions")}>
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                href={document.documentIndex.fileUrl}
                target="_blank"
              >
                View Document
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DocumentDetail;
