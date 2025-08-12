import { Card, Tooltip } from "antd";
import { EyeOutlined, DownloadOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DocumentCard.scss";

const cx = classNames.bind(styles);

function DocumentCard({ document, className }) {
  const navigate = useNavigate();

  return (
    <div className={cx("card-wrapper", className)}>
      <Card
        className={cx("document-card")}
        hoverable
        onClick={() => navigate(`/documents/${document.id}`)}
        cover={
          <div className={cx("img-container")}>
            {document.category?.name && (
              <div className={cx("category-badge")}>
                {document.category.name}
              </div>
            )}
            <img
              className={cx("document-img")}
              alt={document.title}
              src={
                document.previewUrls?.[0] ||
                "https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png"
              }
            />
            <div className={cx("hover-overlay")}>
              <div className={cx("view-details")}>Xem chi tiết</div>
            </div>
          </div>
        }
      >
        <div className={cx("card-meta")}>
          <Tooltip title={document.title}>
            <div className={cx("title")}>
              {document.title.slice(0, 40)}
              {document.title.length > 40 ? "..." : ""}
            </div>
          </Tooltip>
          <div className={cx("info")}>
            <div className={cx("stats-left")}>
              <span className={cx("stat")}>
                <EyeOutlined /> {document.views || 0}
              </span>
              <span className={cx("stat")}>
                <DownloadOutlined /> {document.downloads || 0}
              </span>
            </div>
            <div className={cx("rating")}>
               {document.averageRating?.toFixed(1) || "0.0"} <StarFilled />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DocumentCard;
