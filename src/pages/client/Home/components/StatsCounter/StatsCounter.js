import classNames from "classnames/bind";
import { useEffect } from "react";
import styles from "./StatsCounter.scss";

const cx = classNames.bind(styles);

function StatsCounter({ documents }) {
  // Calculate stats
  const totalDocuments = documents.length;
  const totalDownloads = documents.reduce((sum, doc) => sum + (doc.downloads || 0), 0);
  const totalViews = documents.reduce((sum, doc) => sum + (doc.views || 0), 0);
  
  useEffect(() => {
    // Simple counter animation
    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Apply animation to each stat
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements[0]) animateValue(statElements[0], 0, totalDocuments, 1500);
    if (statElements[1]) animateValue(statElements[1], 0, totalDownloads, 1500);
    if (statElements[2]) animateValue(statElements[2], 0, totalViews, 1500);
    
  }, [totalDocuments, totalDownloads, totalViews]);

  return (
    <section className={cx("stats-section")}>
      <div className={cx("stats-bg-image")}></div>
      <div className={cx("stat-container", "wow", "animate__fadeInUp")}>
        <div className={cx("stat-item")}>
          <div className={cx("stat-icon")}>📑</div>
          <div className={cx("stat-number")}>{totalDocuments}</div>
          <div className={cx("stat-title")}>Tài liệu</div>
        </div>
        <div className={cx("stat-item")}>
          <div className={cx("stat-icon")}>⬇️</div>
          <div className={cx("stat-number")}>{totalDownloads}</div>
          <div className={cx("stat-title")}>Lượt tải</div>
        </div>
        <div className={cx("stat-item")}>
          <div className={cx("stat-icon")}>👁️</div>
          <div className={cx("stat-number")}>{totalViews}</div>
          <div className={cx("stat-title")}>Lượt xem</div>
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;