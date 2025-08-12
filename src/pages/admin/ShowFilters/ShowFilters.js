import { Col, Row, Select } from "antd";
import classNames from "classnames/bind";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ShowFilters.module.scss";

const cx = classNames.bind(styles);

function ShowFilters({
  statusOptions = [],
  showStatus = false,
  showDateRange = false,
  onStatusChange,
  onDateRangeChange,
  baseUrl = "/admin/documents",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStatusChange = (value) => {
    if (onStatusChange) {
      onStatusChange(value);
    } else {
      // Default behavior for documents
      if (value === "pending") {
        navigate(`${baseUrl}/pending`);
      } else {
        navigate(baseUrl);
      }
    }
  };

  // Get current status from path
  const getCurrentStatus = () => {
    return location.pathname.includes("/pending") ? "pending" : "all";
  };

  return (
    <div className={cx("section")}>
      <Row gutter={[16, 16]} className={cx("filter-row")}>
        {showStatus && (
          <Col xs={24} sm={12} md={6}>
            <div className={cx("filter-item")}>
              <label>Trạng thái</label>
              <Select
                options={statusOptions}
                value={getCurrentStatus()}
                style={{ width: "100%" }}
                onChange={handleStatusChange}
              />
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default ShowFilters;
