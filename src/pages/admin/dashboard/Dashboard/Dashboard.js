import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  List,
  Button,
  Image,
} from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  AppstoreOutlined,
  TagsOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// Import API functions
import {
  getAllDocuments,
  getTags,
  getTopDocument,
} from "~/services/documentService";
import { getUsers } from "~/services/usersService";
import { getCategories } from "~/services/categoryService";
import styles from "./Dashboard.module.scss";

const cx = classNames.bind(styles);
const { Title } = Typography;

const Dashboard = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    documents: 0,
    users: 0,
    categories: 0,
    tags: 0,
  });
  const [topDocuments, setTopDocuments] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all required data in parallel
        const [
          documentsData,
          usersData,
          categoriesData,
          tagsData,
          topDocsData,
        ] = await Promise.all([
          getAllDocuments(0, 1),
          getUsers(0, 1),
          getCategories(),
          getTags(),
          getTopDocument(),
        ]);

        setStats({
          documents: documentsData.result.totalElements || 0,
          users: usersData.result.totalElements || 0,
          categories: categoriesData.result.length || 0,
          tags: tagsData.result.length || 0,
        });

        setTopDocuments(topDocsData.result || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={cx("dashboard")}>
      <Title level={2} className="mb-6">
        Dashboard
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Tổng tài liệu"
              value={stats.documents}
              prefix={<FileTextOutlined />}
              loading={loading}
            />
            <div className="mt-4">
              <Link to="/admin/documents">
                <Button type="link" className="p-0">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Người dùng"
              value={stats.users}
              prefix={<UserOutlined />}
              loading={loading}
            />
            <div className="mt-4">
              <Link to="/admin/users">
                <Button type="link" className="p-0">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Danh mục"
              value={stats.categories}
              prefix={<AppstoreOutlined />}
              loading={loading}
            />
            <div className="mt-4">
              <Link to="/admin/categories">
                <Button type="link" className="p-0">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Tags"
              value={stats.tags}
              prefix={<TagsOutlined />}
              loading={loading}
            />
            <div className="mt-4">
              <Link to="/admin/documents/all-tag">
                <Button type="link" className="p-0">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Documents Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            className={cx("document-card")}
            title="Tài liệu xem nhiều nhất"
            extra={<Link to="/admin/documents">Xem tất cả</Link>}
            loading={loading}
          >
            <List
              itemLayout="horizontal"
              dataSource={topDocuments}
              renderItem={(document) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={
                          document.previewUrls?.[0] ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png"
                        }
                        alt={document.title}
                        width={100}
                        height={100}
                        className={cx("document-image")}
                        preview={false}
                      />
                    }
                    title={
                      <Link to={`/admin/documents/detail/${document.id}`}>
                        {document.title}
                      </Link>
                    }
                    description={
                      <>
                        <div>{document.description?.substring(0, 100)}...</div>
                        <div className={cx("views")}>
                          <EyeOutlined /> {document.views || 0} lượt xem
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
