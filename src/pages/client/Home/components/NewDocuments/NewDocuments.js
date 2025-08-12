import { Typography, Pagination } from "antd";
import classNames from "classnames/bind";
import styles from "./NewDocuments.scss";
import LoadingUi from "../../../Loading";
import DocumentCard from "../DocumentCard/DocumentCard";

const { Title } = Typography;
const cx = classNames.bind(styles);

function NewDocuments({ documents, loading, pagination, onPageChange }) {
  return (
    <section className={cx("new-section")}>
      <Title level={3} className="wow animate__fadeInUp">
        <span className={cx("section-icon")}>🆕</span> Tài liệu mới nhất
      </Title>
      
      {loading ? (
        <div className={cx("loading-container")}>
          <LoadingUi />
        </div>
      ) : (
        <>
          <div className={cx("documents-grid")}>
            {documents.map((doc, index) => (
              <div 
                key={doc.id} 
                className={`wow animate__fadeInUp ${cx("grid-item")}`}
                data-wow-delay={`${0.1 * (index % 4)}s`}
              >
                <DocumentCard document={doc} />
                {/* New badge for recently added documents */}
                {index < 3 && (
                  <div className={cx("new-badge")}>NEW</div>
                )}
              </div>
            ))}
          </div>
          <div className={cx("pagination-container", "wow", "animate__fadeInUp")}>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={onPageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
      
      <div className={cx("decoration-dots")}></div>
    </section>
  );
}

export default NewDocuments;