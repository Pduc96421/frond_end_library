import { useState, useEffect } from "react";
import { Typography, Pagination } from "antd";
import classNames from "classnames/bind";
import styles from "./FeaturedDocuments.scss";
import LoadingUi from "../../../Loading";
import DocumentCard from "../DocumentCard/DocumentCard";

const { Title } = Typography;
const cx = classNames.bind(styles);

function FeaturedDocuments({ documents, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedDocs, setDisplayedDocs] = useState([]);
  const docsPerPage = 12;
  
  useEffect(() => {
    if (documents && documents.length) {
      const startIndex = (currentPage - 1) * docsPerPage;
      const endIndex = startIndex + docsPerPage;
      setDisplayedDocs(documents.slice(startIndex, endIndex));
    }
  }, [currentPage, documents]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of featured section smoothly
    document.querySelector(`.${cx('featured-section')}`).scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest' 
    });
  };

  return (
    <section className={cx("featured-section")}>
      <div className={cx("decoration-corner", "top-left")}></div>
      <div className={cx("decoration-corner", "bottom-right")}></div>
      
      <Title level={3} className="wow animate__fadeInUp">
        <span className={cx("section-icon")}>📚</span> Tài liệu nổi bật trong tuần
      </Title>
      
      {loading ? (
        <div className={cx("loading-container")}>
          <LoadingUi />
        </div>
      ) : (
        <>
          <div className={cx("featured-grid")}>
            {displayedDocs.map((doc, index) => (
              <div 
                key={doc.id} 
                className={cx("featured-item", `featured-animation-${index % 4}`)}
              >
                <DocumentCard document={doc} />
                <div className={cx("featured-highlight")}></div>
              </div>
            ))}
          </div>
          
          {documents.length > docsPerPage && (
            <div className={cx("pagination-container", "featured-pagination")}>
              <Pagination
                simple
                current={currentPage}
                pageSize={docsPerPage}
                total={documents.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default FeaturedDocuments;