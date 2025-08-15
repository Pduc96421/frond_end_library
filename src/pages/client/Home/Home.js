import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { getAllDocuments, getTopDocument } from "~/services/documentService";
import styles from "./Home.module.scss";
import HeroSection from "./components/HeroSection/HeroSection";
import FeaturedDocuments from "./components/FeaturedDocuments/FeaturedDocuments";
import StatsCounter from "./components/StatsCounter/StatsCounter";
import NewDocuments from "./components/NewDocuments/NewDocuments";

const cx = classNames.bind(styles);

function Home() {
  const [topDocuments, setTopDocuments] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  const fetchDocuments = async (page = 1, size = 8) => {
    setLoading(true);
    try {
      const topRes = await getTopDocument();
      setTopDocuments(topRes.result);

      const newRes = await getAllDocuments(page - 1, size);

      setNewDocuments(newRes.result.content);
      setPagination((prev) => ({
        ...prev,
        total: newRes.result.totalElements,
      }));
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize]);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };

  return (
    <div className={cx("home-container")} style={{ padding: "0px" }}>
      <HeroSection />

      <FeaturedDocuments documents={topDocuments} loading={loading} />

      <StatsCounter documents={[...topDocuments, ...newDocuments]} />

      <NewDocuments
        documents={newDocuments}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
