import { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, List, Typography, Button, Dropdown } from "antd";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import format from "date-fns/format";

import { vi } from "date-fns/locale";

import { getNotifications } from "~/services/notificationService";
import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);
const { Text } = Typography;

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    size: 4,
    totalElements: 0,
  });
  const [unreadCount, setUnreadCount] = useState(0);
  // Thêm state để kiểm soát trạng thái mở của dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications(0, pagination.size);

      console.log(response);

      if (response?.code === 200) {
        setNotifications(response.result.content);
        setPagination((prev) => ({
          ...prev,
          totalElements: response.result.totalElements,
        }));
        setUnreadCount(
          response.result.content.filter((item) => !item.read).length
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.size]);

  const handleLoadMore = (e) => {
    // Ngăn sự kiện lan truyền và đóng dropdown
    e.stopPropagation();

    setPagination((prev) => ({
      ...prev,
      size: prev.size + 10,
    }));
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "HH:mm - dd/MM/yyyy", { locale: vi });
  };

  const handleItemClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(false);
  };

  const notificationMenu = {
    items: [
      {
        key: "notifications",
        label: (
          <div
            className={cx("notification-container")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cx("notification-header")}>
              <Text strong>Thông báo</Text>
              {unreadCount > 0 && (
                <Text type="secondary">{unreadCount} thông báo chưa đọc</Text>
              )}
            </div>

            <List
              className={cx("notification-list")}
              loading={loading}
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item
                  className={cx("notification-item", { unread: !item.read })}
                  key={item.id}
                  onClick={handleItemClick}
                >
                  <Link to={`/admin/documents/detail/${item.documentId}`}>
                    <div className={cx("notification-content")}>
                      <div className={cx("notification-title")}>
                        <Text strong>{item.title}</Text>
                        {!item.read && <Badge status="processing" />}
                      </div>
                      <Text className={cx("notification-description")}>
                        {item.description}
                      </Text>
                      <Text
                        type="secondary"
                        className={cx("notification-time")}
                      >
                        {formatDate(item.createdAt)}
                      </Text>
                    </div>
                  </Link>
                </List.Item>
              )}
            />

            {notifications.length < pagination.totalElements && (
              <div className={cx("load-more")}>
                <Button type="link" onClick={handleLoadMore} loading={loading}>
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        ),
      },
    ],
  };

  return (
    <Dropdown
      menu={notificationMenu}
      trigger={["click"]}
      placement="bottomRight"
      overlayClassName={cx("notification-dropdown")}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
    >
      <Badge
        count={unreadCount}
        offset={[-2, 2]}
        className={cx("notification-badge")}
      >
        <Button
          icon={<BellOutlined />}
          className={cx("notification-icon")}
        ></Button>
      </Badge>
    </Dropdown>
  );
}

export default Notification;
