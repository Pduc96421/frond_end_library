import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Empty,
  Badge,
  Pagination,
  Button,
  Form,
} from "antd";
import { FolderOutlined, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import { createLibrary, getAllLibraryOfUser } from "~/services/libraryService";
import styles from "./Library.module.scss";
import LoadingUI from "../Loading";
import { showAlert } from "~/store/actions/alert";
import LibraryForm from "../LibraryForm/LibraryForm";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const cx = classNames.bind(styles);

function Library() {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchLibraries = async () => {
    try {
      setLoading(true);
      const response = await getAllLibraryOfUser(
        pagination.page,
        pagination.size
      );

      console.log('Library', response);

      if (response.code === 200) {
        setLibraries(response.result.content);
        setPagination({
          page: response.result.page,
          size: response.result.size,
          totalElements: response.result.totalElements,
          totalPages: response.result.totalPages,
        });
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page: page - 1, // API uses 0-based indexing
      size: pageSize,
    }));
  };

  useEffect(() => {
    fetchLibraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.size]);

  //add library
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const handleCreateLibrary = async (values) => {
    try {
      setLoading(true);
      const response = await createLibrary(values.name, values.description);
      if (response.code === 200) {
        dispatch(showAlert("Tạo thư viện thành công", "success"));
        form.resetFields();
        setShowCreateModal(false);
        fetchLibraries();
      }
    } catch (error) {
      console.error("Error creating library:", error);
      dispatch(showAlert("Không thể tạo thư viện", "error"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <LoadingUI />
      </div>
    );
  }

  return (
    <div className={cx("library-container")}>
      <div className={cx("header")}>
        <Title level={2} className={cx("page-title")}>
          Thư viện của tôi
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowCreateModal(true)}
          className={cx("add-button")}
        >
          Thêm thư viện
        </Button>
      </div>

      {libraries.length === 0 ? (
        <Empty
          description="Chưa có thư viện nào"
          className={cx("empty-state")}
        />
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {libraries.map((library) => (
              <Col xs={24} sm={12} md={8} lg={6} key={library.id}>
                <Card
                  hoverable
                  className={cx("library-card")}
                  onClick={() => navigate(`/library/detail/${library.id}`)}
                >
                  <Badge count={library.documentCount} offset={[-8, 8]}>
                    <div className={cx("card-content")}>
                      <FolderOutlined className={cx("folder-icon")} />
                      <div className={cx("library-info")}>
                        <h3>{library.name}</h3>
                        <p>{library.description}</p>
                      </div>
                    </div>
                  </Badge>
                </Card>
              </Col>
            ))}
          </Row>

          <div className={cx("pagination-container")}>
            <Pagination
              current={pagination.page + 1} // Convert to 1-based for display
              total={pagination.totalElements}
              pageSize={pagination.size}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total) => `Tổng cộng ${total} thư viện`}
            />
          </div>
        </div>
      )}

      <LibraryForm
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onSubmit={handleCreateLibrary}
        loading={loading}
      />
    </div>
  );
}

export default Library;
