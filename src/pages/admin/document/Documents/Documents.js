import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Tooltip,
  Card,
  Row,
  Col,
  Tag,
  Dropdown,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";

import {
  approvedDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentsPending,
  rejectedDocument,
  searchDocument,
} from "~/services/documentService";
import { showAlert } from "~/store/actions/alert";
import styles from "./Documents.module.scss";
import ShowFilters from "~/pages/admin/ShowFilters";
import SearchUi from "~/pages/admin/Search/Search";
import { getCategoryDocument } from "~/services/categoryService";

const cx = classNames.bind(styles);

function AllDocument() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchParams] = useSearchParams("");
  const { categoryId } = useParams();

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Preview",
      key: "preview",
      dataIndex: "previewUrls",
      width: 150,
      align: "center",
      render: (_, record) => (
        <img
          style={{ height: 150, cursor: "pointer" }}
          src={record.previewUrls?.[0] || ""}
          alt="Preview"
          className={cx("preview-image")}
          onClick={() => window.open(record.previewUrls?.[0], "_blank")}
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "danh mục",
      dataIndex: "category_name",
      key: "category_name",
      width: "30%",
      align: "center",
      render: (_, record) => <span>{record.category?.name}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (_, record) => {
        // console.log("Record status:", record.status);
        const items = [
          {
            icon: <CheckCircleOutlined />,
            key: "approve",
            label: "Duyệt",
            disabled: record.status === "APPROVED",
            className: cx("approve"),
            onClick: () => handleApprove(record.id),
          },
          {
            type: "divider",
          },
          {
            icon: <CloseCircleOutlined />,
            key: "reject",
            label: "Từ chối",
            disabled: record.status === "REJECTED",
            className: cx("reject"),
            onClick: () => handleReject(record.id),
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayStyle={{
              width: 130,
              textAlign: "center",
            }}
            placement="bottom"
          >
            <Tag
              color={
                record.status === "APPROVED"
                  ? "success"
                  : record.status === "REJECTED"
                  ? "error"
                  : "warning"
              }
              className={cx("status")}
            >
              {record.status === "APPROVED"
                ? "Đã duyệt"
                : record.status === "REJECTED"
                ? "Từ chối"
                : "Chờ duyệt"}
            </Tag>
          </Dropdown>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Space size="middle" className={cx("action-buttons")}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/documents/detail/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const fetchDocuments = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await getAllDocuments(page - 1, pageSize);

      if (response.code === 200) {
        setDocuments(response.result.content);
      }
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.result.totalElements,
      });
    } catch (error) {
      dispatch(showAlert("Lỗi khi tải danh sách tài liệu!", "error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchDocuments = async (keyword, tag, page, pageSize) => {
    try {
      setLoading(true);
      const response = await searchDocument(keyword, tag, page - 1, pageSize);

      if (response.code === 200) {
        setDocuments(response.result.content);
      }
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.result.totalElements,
      });
    } catch (error) {
      dispatch(showAlert("Lỗi khi tải danh sách tài liệu!", "error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentsByCategory = async (categoryId, page, pageSize) => {
    try {
      setLoading(true);
      const response = await getCategoryDocument(
        categoryId,
        page - 1,
        pageSize
      );

      if (response.code === 200) {
        setDocuments(response.result.content);
      }
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.result.totalElements,
      });
    } catch (error) {
      dispatch(showAlert("Lỗi khi tải danh sách tài liệu!", "error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentsPending = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await getDocumentsPending(page - 1, pageSize);

      if (response.code === 200) {
        setDocuments(response.result.content);
      }
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.result.totalElements,
      });
    } catch (error) {
      dispatch(showAlert("Lỗi khi tải danh sách tài liệu!", "error"));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      const response = await approvedDocument(id);
      if (response.code === 200) {
        dispatch(showAlert("duyệt tài liệu thành công", "success"));
        fetchDocuments(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      console.error("Error approving document:", error);
      dispatch(showAlert("duyệt tài liệu thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      const response = await rejectedDocument(id);
      if (response.code === 200) {
        dispatch(showAlert("từ chối tài liệu thành công", "success"));
        fetchDocuments(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      console.error("Error rejecting document:", error);
      dispatch(showAlert("từ chối tài liệu thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await deleteDocument(id);
      if (response.code === 200) {
        dispatch(showAlert("Xóa tài liệu thành công", "success"));
        fetchDocuments(pagination.current, pagination.pageSize);
      } else {
        dispatch(showAlert("Xóa tài liệu thất bại", "error"));
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      dispatch(showAlert("Xóa tài liệu thất bại", "error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    const tag = searchParams.get("tag") || "";
    const isPendingRoute = location.pathname.includes("/pending");

    if (keyword || tag) {
      fetchSearchDocuments(
        keyword,
        tag,
        pagination.current,
        pagination.pageSize
      );
    } else if (categoryId) {
      fetchDocumentsByCategory(
        categoryId,
        pagination.current,
        pagination.pageSize
      );
    } else if (isPendingRoute) {
      fetchDocumentsPending(pagination.current, pagination.pageSize);
    } else {
      fetchDocuments(pagination.current, pagination.pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, location.pathname]);

  const handleTableChange = (newPagination) => {
    const isPendingRoute = location.pathname.includes("/pending");

    if (isPendingRoute) {
      fetchDocumentsPending(newPagination.current, newPagination.pageSize);
    } else {
      fetchDocuments(newPagination.current, newPagination.pageSize);
    }
    setPagination(newPagination);
  };

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "pending", label: "Chờ duyệt" },
  ];

  const handleStatusFilter = (value) => {
    if (value === "pending") {
      navigate("/admin/documents/pending");
    } else {
      navigate("/admin/documents");
    }
  };

  return (
    <Card title="Danh sách tài liệu" className={cx("card-wrapper")}>
      <div className={cx("section")}>
        <Row className={cx("toolbar")} gutter={[16, 16]}>
          <Col xs={24} sm={16} md={16}>
            <SearchUi isTag={true} redirect={"/admin/documents"} />
          </Col>

          <Col xs={24} sm={8} md={8} className={cx("button-col")}>
            <Space>
              <Button
                icon={<FilterOutlined rotate={showFilters ? 180 : 0} />}
                onClick={() => setShowFilters(!showFilters)}
                type={showFilters ? "primary" : "default"}
              >
                Lọc
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/admin/documents/upload")}
              >
                Thêm tài liệu
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {showFilters && (
        <ShowFilters
          statusOptions={statusOptions}
          showStatus={true}
          showDateRange={true}
          onStatusChange={handleStatusFilter}
          baseUrl="/admin/documents"
        />
      )}

      <Table
        columns={columns}
        dataSource={documents}
        rowKey={(record) => record.id}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} thư viện`,
        }}
        loading={loading}
        onChange={handleTableChange}
        size="middle"
        scroll={{ x: 1100 }}
        bordered
      />
    </Card>
  );
}

export default AllDocument;
