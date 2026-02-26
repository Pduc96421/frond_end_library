import { useEffect, useState } from "react";
import { Button, Input, List, Avatar, Tooltip, message, Modal } from "antd";
import { CommentOutlined, LikeOutlined, SendOutlined } from "@ant-design/icons";
import {
  getComments,
  likeComment,
  addComment,
  deleteComment,
  replies,
} from "~/services/commentService";
import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { getCookie } from "~/helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";
import moment from "moment";
import "moment/locale/vi";

const cx = classNames.bind(styles);

const Comment = ({ documentId, autoOpen = false }) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);
  const [repliesMap, setRepliesMap] = useState({}); // Lưu replies của từng comment cha
  const [replyInputs, setReplyInputs] = useState({}); // Lưu nội dung input trả lời

  const [isVisible, setIsVisible] = useState(autoOpen);
  const [showReplyInputMap, setShowReplyInputMap] = useState({});

  const userData = JSON.parse(localStorage.getItem("userData")); // Lấy dữ liệu từ localStorage
  const currentUserName = userData?.username;

  const formatDate = (date) => {
    moment.locale("vi");
    return moment(date).format("HH:mm - DD/MM/YYYY");
  };

  useEffect(() => {
    if (isVisible) {
      if (token) {
        fetchComments();
      } else {
        dispatch(showAlert("Vui lòng đăng nhập để đọc bình luận", "warning"));
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const fetchComments = async (requestSize) => {
    try {
      setLoading(true);
      const response = await getComments(documentId, 0, requestSize || size);
      if (response.code === 200) {
        const sortedComments = response.result.content.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

        setComments(sortedComments);
        setTotal(response.result.totalElements);

        // Gọi loadReplies cho mỗi bình luận sau khi fetch xong
        for (let comment of sortedComments) {
          await loadReplies(comment.id);
        }
      }
    } catch (error) {
      message.error("Không thể tải bình luận");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const newSize = size + 10;
    setSize(newSize);
    await fetchComments(newSize);
  };

  const handleSubmitComment = async () => {
    if (!content.trim()) return;
    const data = {
      content,
      parentId: "",
    };

    try {
      const response = await addComment(documentId, data);
      if (response.code === 200) {
        setContent("");
        await fetchComments(size);
        message.success("Đã thêm bình luận");
      }
    } catch (error) {
      message.error("Không thể thêm bình luận");
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await likeComment(documentId, commentId);
      if (response.code === 200) {
        await fetchComments(size);
      }
    } catch (error) {
      message.error("Không thể thích bình luận");
    }
  };

  const loadReplies = async (commentId) => {
    try {
      const res = await replies(documentId, commentId, 0, 10);
      if (res.code === 200) {
        const sortedReplies = res.result.content.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

        setRepliesMap((prev) => ({
          ...prev,
          [commentId]: sortedReplies,
        }));
      }
    } catch (err) {
      message.error("Không thể tải trả lời");
    }
  };

  // Cập nhật hàm handleShowReplyInput
  const handleShowReplyInput = async (commentId, replyToUsername = "") => {
    // Toggle hiển thị ô input cho bình luận cha
    setShowReplyInputMap((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // chỉ toggle cho bình luận hiện tại
    }));

    // Nếu chưa load replies thì gọi API
    if (!repliesMap[commentId]) {
      await loadReplies(commentId);
    }

    // Nếu có tên người dùng, cần set lại placeholder
    if (replyToUsername) {
      setReplyInputs((prev) => ({
        ...prev,
        [commentId]: `${replyToUsername} `,
      }));
    }
  };

  const handleReplySubmit = async (parentId) => {
    const replyContent = replyInputs[parentId];
    if (!replyContent?.trim()) return;

    try {
      const res = await addComment(documentId, {
        content: replyContent,
        parentId,
      });
      if (res.code === 200) {
        message.success("Đã trả lời");
        setReplyInputs((prev) => ({ ...prev, [parentId]: "" }));
        await loadReplies(parentId);
      }
    } catch (err) {
      message.error("Không thể gửi trả lời");
    }
  };

  const handleDeleteComment = async (documentId, commentId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa bình luận này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await deleteComment(documentId, commentId);

          const statusCode = res?.code || res?.data?.code;

          if (statusCode === 200) {
            message.success("Đã xóa bình luận");

            // Cập nhật lại state comments và repliesMap ngay lập tức
            setComments(
              (prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId), // Xóa bình luận khỏi danh sách
            );

            // Loại bỏ bình luận đã xóa khỏi repliesMap
            setRepliesMap((prevRepliesMap) => {
              const newRepliesMap = { ...prevRepliesMap };
              delete newRepliesMap[commentId]; // Xóa bình luận và các replies của nó
              return newRepliesMap;
            });

            const children = repliesMap[commentId] || [];
            children.forEach((child) => {
              setRepliesMap((prevRepliesMap) => {
                const newRepliesMap = { ...prevRepliesMap };
                delete newRepliesMap[child.id]; // Xóa các bình luận con
                return newRepliesMap;
              });
            });
          } else {
            message.error("Xóa thất bại");
          }
        } catch (err) {
          if (err.response?.status === 403) {
            message.error("Bạn không thể xóa bình luận của người khác");
          } else {
            message.error("Lỗi khi xóa bình luận");
          }
        }
      },
    });
  };

  const renderCommentItem = (comment) => {
    const children = repliesMap[comment.id] || [];

    return (
      <div key={comment.id} className={cx("comment-item")}>
        <List.Item
          actions={[
            <Tooltip title="Thích">
              <Button
                className={cx("like-btn")}
                icon={<LikeOutlined />}
                onClick={() => handleLikeComment(comment.id)}
              >
                {comment.likesCount || 0}
              </Button>
            </Tooltip>,
            <Button
              className={cx("reply-btn")}
              type="link"
              onClick={() => handleShowReplyInput(comment.id, comment.username)}
            >
              Trả lời
            </Button>,
            comment.username === currentUserName && (
              <Button
                type="link"
                danger
                onClick={() => handleDeleteComment(documentId, comment.id)}
              >
                Xóa
              </Button>
            ),
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={comment.user?.avatar} />}
            title={
              <div className={cx("comment-header")}>
                <span className={cx("username")}>{comment.username}</span>
                <span className={cx("date")}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            }
            description={<div className={cx("des")}>{comment.content}</div>}
          />
        </List.Item>

        {/* Nút hiển thị/ẩn phản hồi cấp 2 */}
        {children.length > 0 && !showReplyInputMap[comment.id] && (
          <div className={cx("show-replies-btn")}>
            <Button
              type="link"
              size="small"
              onClick={() => handleShowReplyInput(comment.id)}
            >
              {showReplyInputMap[comment.id]
                ? "Ẩn phản hồi"
                : `Hiển thị ${children.length} phản hồi`}
            </Button>
          </div>
        )}

        {showReplyInputMap[comment.id] && children.length > 0 && (
          <div className={cx("nested-replies")}>
            {children.map((child) => renderCommentItem(child))}
            {/* Chỉ hiển thị các bình luận con khi showReplyInputMap của bình luận cha là true */}
          </div>
        )}

        {/* Input trả lời cho bình luận cha */}
        {showReplyInputMap[comment.id] && (
          <div className={cx("reply-input")}>
            <Input.TextArea
              className={cx("reply-textarea")}
              value={replyInputs[comment.id] || ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({
                  ...prev,
                  [comment.id]: e.target.value,
                }))
              }
              placeholder={`Trả lời ${comment.username}...`}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
            <Button
              className={cx("reply-btn")}
              size="small"
              type="primary"
              icon={<SendOutlined />}
              onClick={() => handleReplySubmit(comment.id)}
              style={{ marginTop: 5 }}
            >
              Gửi
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cx("comment-wrapper")}>
      {!autoOpen && (
        <Tooltip title="Bình luận">
          <Button
            type="text"
            icon={<CommentOutlined />}
            onClick={() => setIsVisible((prev) => !prev)}
            className={cx("comment-btn")}
          >
            Bình luận ({total})
          </Button>
        </Tooltip>
      )}

      {isVisible && (
        <div className={cx("comment-section")}>
          <div className={cx("comment-input")}>
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết bình luận..."
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSubmitComment}
              className={cx("submit-btn")}
            >
              Gửi
            </Button>
          </div>

          <List
            loading={loading}
            dataSource={comments}
            renderItem={(item) => renderCommentItem(item)}
          />

          {comments.length > 0 && comments.length < total && (
            <div className={cx("load-more")}>
              <Button onClick={handleLoadMore} loading={loading}>
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
