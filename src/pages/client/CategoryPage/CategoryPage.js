import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import {
  getCategoryById,
  getCategoryDocument,
} from "~/services/categoryService";
import {Col, Pagination, Row,Statistic, Button, Divider } from "antd";
import { 
  EyeOutlined, 
  DownloadOutlined, 
  BookOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import LoadingUi from "../Loading";
import DocumentCard from "../Home/components/DocumentCard/DocumentCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

const cx = classNames.bind(styles);

function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const [statistics, setStatistics] = useState({
    totalDocuments: 0,
    totalViews: 0,
    totalDownloads: 0,
  });
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
  // Instead of using WOW directly, try using AOS library or just animate.css classes
  const animatedElements = document.querySelectorAll('.wow');
  animatedElements.forEach(element => {
    element.classList.add('animate__animated');
    
    // Get the animation delay attribute if present
    const delay = element.getAttribute('data-wow-delay');
    if (delay) {
      element.style.animationDelay = delay;
    }
    
    // Add intersection observer to trigger animations when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animation class
          const animationClass = element.getAttribute('data-wow-animation') || 'animate__fadeIn';
          element.classList.add(animationClass);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  });
}, []);

  const fetchData = async (page = 1, size = 8) => {
    setLoading(true);
    try {
      const resCategory = await getCategoryById(Number(categoryId));
      if (resCategory.code === 200 && resCategory.result) {
        setCategoryName(resCategory.result.name);
        setCategoryDescription(resCategory.result.description || 
          `Khám phá bộ sưu tập tài liệu ${resCategory.result.name} chất lượng cao và cập nhật liên tục`);
      } else {
        setError("Không tìm thấy danh mục");
        return;
      }

      const resDocs = await getCategoryDocument(
        Number(categoryId),
        page - 1,
        size
      );
      
      if (resDocs.code === 200 && resDocs.result?.content) {
        const allDocs = resDocs.result.content;
        setDocuments(allDocs);
        
        // Calculate statistics
        const totalViews = allDocs.reduce((sum, doc) => sum + (doc.views || 0), 0);
        const totalDownloads = allDocs.reduce((sum, doc) => sum + (doc.downloads || 0), 0);
        
        setStatistics({
          totalDocuments: resDocs.result.totalElements,
          totalViews,
          totalDownloads
        });
        
        setPagination((prev) => ({
          ...prev,
          total: resDocs.result.totalElements,
        }));
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tải danh mục hoặc tài liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, pagination.current, pagination.pageSize]);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  const scrollToDocuments = () => {
    document.getElementById('documents-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className={cx("category-page")}>
      {/* Hero Section */}
      <div className={cx("hero-section")} ref={heroRef}>
        <div className={cx("hero-overlay")}></div>
        <div className={cx("hero-content", "animate__animated", "animate__fadeIn")}>
          <h1 className={cx("hero-title")}>{categoryName}</h1>
          <p className={cx("hero-description")}>{categoryDescription}</p>
          <Button 
            type="primary" 
            size="large" 
            className={cx("hero-button")}
            onClick={scrollToDocuments}
          >
            Khám phá tài liệu <ArrowDownOutlined />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className={cx("loading-container")}>
          <LoadingUi />
        </div>
      ) : error ? (
        <div className={cx("error-container")}>
          <p className={cx("error")}>{error}</p>
        </div>
      ) : (
        <>
          {/* Statistics Section */}
          <div className={cx("stats-section")}>
            <div className={cx("stats-container")}>
              <Row gutter={[32, 16]} justify="center">
                <Col xs={24} sm={8} className={cx("wow", "animate__fadeInUp")} data-wow-delay="0.2s">
                  <Statistic 
                    title="Tài liệu" 
                    value={statistics.totalDocuments} 
                    prefix={<BookOutlined />}
                    className={cx("statistic")} 
                  />
                </Col>
                <Col xs={24} sm={8} className={cx("wow", "animate__fadeInUp")} data-wow-delay="0.4s">
                  <Statistic 
                    title="Lượt xem" 
                    value={statistics.totalViews} 
                    prefix={<EyeOutlined />}
                    className={cx("statistic")} 
                  />
                </Col>
                <Col xs={24} sm={8} className={cx("wow", "animate__fadeInUp")} data-wow-delay="0.6s">
                  <Statistic 
                    title="Lượt tải" 
                    value={statistics.totalDownloads} 
                    prefix={<DownloadOutlined />} 
                    className={cx("statistic")}
                  />
                </Col>
              </Row>
            </div>
          </div>

          {/* All Documents Section */}
          <div id="documents-section" className={cx("documents-section")}>
            <div className={cx("section-header", "wow", "animate__fadeInUp")}>
              <h2 className={cx("section-title")}>
                <BookOutlined /> Tất cả tài liệu
              </h2>
              <Divider className={cx("divider")}/>
            </div>
            
            <Row gutter={[24, 24]} className={cx("documents-grid")}>
              {documents.map((doc, index) => (
                <Col 
                  xs={24} sm={12} md={8} lg={6} 
                  key={doc.id}
                  className={cx("wow", "animate__fadeInUp")}
                  data-wow-delay={`${0.1 * (index % 4)}s`}
                >
                  <DocumentCard document={doc} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className={cx("pagination-container")}>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className={cx("cta-section", "wow", "animate__fadeIn")} data-wow-delay="0.2s">
            <h2>Không tìm thấy tài liệu bạn cần?</h2>
            <p>Khám phá thêm các danh mục tài liệu chất lượng khác</p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/')}
              className={cx("cta-button")}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryPage;