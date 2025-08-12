import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDocumentById,
  likeDocument,
  unlikeDocument,
  downloadDocument,
  rateDocument,
  createReminder,
} from "~/services/documentService";
import { Typography, Tag, Button, Row, Col, Image, Rate, Input } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  HeartOutlined,
  HeartFilled,
  SaveOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Library from "~/pages/client/LibraryModal";
import Comment from "~/pages/client/Comment/Comment";
import LoadingUi from "../Loading";
import { showAlert } from "~/store/actions/alert";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const cx = classNames.bind(styles);

function Detail() {
  const { documentId } = useParams();
  const [doc, setDoc] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [rating, setRating] = useState(0); // Đánh giá sao
  const [review, setReview] = useState(""); // Nội dung review
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);

  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDocument() {
      try {
        setLoading(true);
        const res = await getDocumentById(documentId);
        const result = res.result;
        if (!result.tags) {
          result.tags = [];
        }
        setDoc(result);
        setLiked(result.liked);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocument();
  }, [documentId, isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <LoadingUi />
      </div>
    );
  }
  if (!doc) {
    return (
      <div className={cx("error-container")}>
        <h2>Không tìm thấy tài liệu</h2>
      </div>
    );
  }

  const getFileExtension = (url) => {
    // Extract file extension from URL or filename
    const urlParts = url.split(".");
    if (urlParts.length > 1) {
      return urlParts[urlParts.length - 1].toLowerCase();
    }
    return "pdf";
  };

  const getFileName = (url) => {
    // Extract filename from URL
    const urlParts = url.split("/");
    let fileName = urlParts[urlParts.length - 1];

    // Remove query parameters if any
    fileName = fileName.split("?")[0];

    // If filename looks like a hash or doesn't exist, use document title
    if (!fileName || fileName.length < 3 || /^[0-9a-f]{8,}$/i.test(fileName)) {
      return doc.title;
    }

    return fileName;
  };

  const handleDownload = async () => {
    try {
      // Gọi API để lấy URL tải xuống
      const downloadResponse = await downloadDocument(doc.id);

      if (downloadResponse.code !== 200) {
        console.log(downloadResponse.message);
        throw new Error("Không thể lấy URL tải xuống");
      }

      // Lấy URL tải xuống từ phản hồi API
      const fileUrl = downloadResponse.result;

      // Tải xuống tệp từ URL được cung cấp
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Get file extension from URL or use a default
      const fileExtension = getFileExtension(fileUrl);

      // Determine filename, keeping original name if possible
      const fileName = getFileName(fileUrl);

      // Create download link with the appropriate extension
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải xuống tài liệu:", error);
      dispatch(showAlert("Không thể tải xuống tài liệu", "error"));
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeDocument(doc.id);
      } else {
        await likeDocument(doc.id);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Lỗi khi xử lý thích/bỏ thích tài liệu:", error);
    }
  };

  const handleRateDocument = async () => {
    try {
      const ratingData = {
        rating: Number(rating),
        review: review,
      };
      await rateDocument(doc.id, ratingData);
      alert("Đánh giá thành công!");
    } catch (error) {
      console.error("Lỗi khi đánh giá tài liệu:", error);
    }
  };

  const handleCreateReminder = async () => {
    try {
      const reminderData = {
        title: reminderTitle,
        description: reminderDescription,
        remindAt: new Date(reminderTime).toISOString(),
        // Định dạng đúng ISO 8601 nếu input là datetime-local
      };
      console.log(reminderData);
      await createReminder(doc.id, reminderData);
      alert("Tạo nhắc nhở thành công!");
      setReminderTitle("");
      setReminderDescription("");
      setReminderTime("");
    } catch (error) {
      console.error("Lỗi khi tạo nhắc nhở:", error);
      alert("Tạo nhắc nhở thất bại.");
    }
  };

  return (
    <div className={cx("detail-container")}>
      <Paragraph>
        <strong>Chuyên mục:</strong> <Tag color="green">{doc.category.name}</Tag>
      </Paragraph>

      <h1 className={cx("document-title")}>{doc.title}</h1>

      <Row justify="space-between" align="middle">
        <Col>
          <Paragraph style={{ marginBottom: 0 }}>
            <strong>Lượt xem:</strong> <EyeOutlined /> {doc.views} &nbsp;&nbsp;
            <strong>Lượt like:</strong> <HeartFilled /> {doc.like} &nbsp;&nbsp;
            <strong>Lượt tải:</strong> <DownloadOutlined /> {doc.downloads}
          </Paragraph>
        </Col>
        <Col>
          <Paragraph style={{ marginBottom: 0 }}>
            <strong>Đánh giá trung bình:</strong> <Rate disabled allowHalf defaultValue={doc.averageRating} /> (
            {doc.averageRating.toFixed(1)})
          </Paragraph>
        </Col>
      </Row>

      <div className={cx("preview")}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Button
            type="primary"
            style={{
              backgroundColor: "rgb(255, 170, 0)",
              borderColor: "rgb(255, 170, 0)",
              marginBottom: "16px",
            }}
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Tải xuống
          </Button>
          <div className={cx("actions")}>
            <span className={cx("status")}>
              {doc.status === "APPROVED" ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>
                  Đã duyệt
                </Tag>
              ) : doc.status === "REJECTED" ? (
                <Tag color="error" icon={<CloseCircleOutlined />}>
                  Từ chối
                </Tag>
              ) : (
                <Tag color="processing" icon={<ClockCircleOutlined />}>
                  Chờ duyệt
                </Tag>
              )}
            </span>
            <Button
              icon={liked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
              className={`${styles["like-button"]} ${liked ? styles.liked : ""}`}
              style={{ marginRight: "16px" }}
            >
              {liked ? "Đã thích" : "Thích"}
            </Button>

            <Button icon={<SaveOutlined />} onClick={() => setShowLibraryModal(true)} className={cx("save-button")}>
              Thêm vào thư viện
            </Button>
          </div>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className={cx("document-viewer")}>
              {doc.fileUrl && doc.fileUrl.endsWith(".pdf") ? (
                <iframe
                  src={doc.fileUrl}
                  title={doc.title}
                  width="100%"
                  height="1200px"
                  style={{ border: "1px solid #ddd" }}
                />
              ) : doc.fileUrl &&
                (doc.fileUrl.endsWith(".jpg") ||
                  doc.fileUrl.endsWith(".jpeg") ||
                  doc.fileUrl.endsWith(".png")) ? (
                <Image src={doc.fileUrl} alt={doc.title} style={{ maxWidth: "100%" }} />
              ) : (
                <div className={cx("document-unavailable")}>
                  <p>Không thể hiển thị tài liệu. Vui lòng tải xuống để xem.</p>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor: "rgb(255, 170, 0)",
                borderColor: "rgb(255, 170, 0)",
                fontSize: "20px",
                padding: "10px 20px",
              }}
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Tải xuống tài liệu
            </Button>
          </Col>
        </Row>
      </div>

      <Paragraph className={cx("des")}>{doc.description}</Paragraph>

      <div className={cx("rate-section")}>
        <Title level={3}>Đánh giá tài liệu</Title>
        <Rate allowHalf value={rating} onChange={setRating} style={{ marginBottom: 16 }} />
        <TextArea
          rows={4}
          placeholder="Viết review của bạn..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className={cx("submit-btn")} onClick={handleRateDocument}>
          Gửi đánh giá
        </button>
      </div>

      <div className={cx("comment-section")}>
        <Title level={3}>Bình luận</Title>
        <Comment documentId={doc.id} autoOpen={true} />
      </div>

      {/* Phần đánh giá tài liệu */}

      <div className={cx("reminder-section")} style={{ marginTop: 32 }}>
        <Title level={3}>Tạo nhắc nhở</Title>
        <Input
          placeholder="Tiêu đề nhắc nhở"
          value={reminderTitle}
          onChange={(e) => setReminderTitle(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <TextArea
          rows={2}
          placeholder="Mô tả nhắc nhở"
          value={reminderDescription}
          onChange={(e) => setReminderDescription(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <button className={cx("submit-btn")} onClick={handleCreateReminder}>
          Gửi nhắc nhở
        </button>
      </div>

      {showLibraryModal && <Library onClose={() => setShowLibraryModal(false)} documentId={doc.id} />}
    </div>
  );
}

export default Detail;
