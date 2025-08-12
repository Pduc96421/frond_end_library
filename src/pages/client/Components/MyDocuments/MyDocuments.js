import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tag,
  message,
  Spin,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { getMyDocuments, changeAccess } from "~/services/documentService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "~/store/actions/alert";

const { confirm } = Modal;

function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const navigate = useNavigate();

  // Lấy dữ liệu từ API khi component được render
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Hàm gọi API để lấy dữ liệu
  const fetchDocuments = async (page = 0) => {
    try {
      setLoading(true);
      const response = await getMyDocuments(page, pagination.pageSize);
      console.log("API response:", response);
      if (response.code === 200 && response.result) {
        // Chuyển đổi dữ liệu từ API thành định dạng phù hợp với component
        const formattedData = response.result.content.map((doc) => ({
          id: doc.id,
          title: doc.title,
          type: doc.fileType,
          uploadDate: doc.createdAt, // Giả sử backend trả về trường createdAt
          views: doc.views || 0,
          downloads: doc.downloads || 0,
          status: doc.status.toLowerCase(),
          isPublic: doc.isPublic,
          fileUrl: doc.fileUrl,
          previewUrls: doc.previewUrls, // Nếu có
        }));

        setDocuments(formattedData);
        setPagination({
          ...pagination,
          current: page + 1, // API dùng page 0-based, UI dùng 1-based
          total: response.result.totalElements,
        });
      } else {
        message.error("Không thể tải danh sách tài liệu");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      message.error("Đã xảy ra lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi người dùng thay đổi trang
  const handleTableChange = (pagination) => {
    fetchDocuments(pagination.current - 1); // Chuyển từ 1-based sang 0-based
  };

  // Xử lý khi người dùng muốn xem chi tiết tài liệu
  const handleViewDocument = (record) => {
    navigate(`/documents/${record.id}`);
  };

  // Xử lý khi người dùng muốn chỉnh sửa tài liệu
  const handleEditDocument = (record) => {
    navigate(`/documents/edit/${record.id}`);
  };

  // Xử lý khi người dùng muốn xóa tài liệu
  const handleDeleteDocument = (record) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa tài liệu này?",
      icon: <ExclamationCircleOutlined />,
      content: "Dữ liệu sẽ bị mất vĩnh viễn và không thể khôi phục.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Thực hiện xóa tài liệu (cần tạo API riêng)
        // deleteDocument(record.id).then(()=>{
        //   message.success('Xóa tài liệu thành công');
        //   fetchDocuments(pagination.current - 1);
        // }).catch(error => {
        //   message.error('Xóa tài liệu thất bại');
        // });

        // Tạm thời mô phỏng xóa
        message.success("Xóa tài liệu thành công");
        setDocuments(documents.filter((doc) => doc.id !== record.id));
      },
    });
  };

  const handleShareDocument = (record) => {
    if (record.status !== "approved") {
      message.warning("Chỉ có thể chia sẻ tài liệu đã được duyệt.");
      return;
    }

    setSelectedDocument(record);
    form.resetFields();
    setShareModalVisible(true);
  };

  const handleShareSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Dữ liệu gửi đi:", {
        email: values.email,
        accessType: values.accessType,
      });
      setShareLoading(true);

      // Gọi API để thay đổi quyền truy cập
      await changeAccess(selectedDocument.id, {
        email: values.email,
        accessType: values.accessType,
      });

      dispatch(showAlert("Chia sẻ tài liệu thành công", "success"));
      setShareModalVisible(false);
    } catch (error) {
      dispatch(showAlert("Tài liệu đã được chia sẻ", "error"));
      console.error(error);
    } finally {
      setShareLoading(false);
    }
  };

  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a onClick={() => handleViewDocument(record)}>{text}</a>
      ),
    },
    {
      title: "Định dạng",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = "blue";
        if (type === "PDF") color = "red";
        if (type === "DOCX") color = "blue";
        if (type === "PPTX") color = "orange";
        if (type === "XLS" || type === "XLSX") color = "green";

        return <Tag color={color}>{type}</Tag>;
      },
    },
    // {
    //   title: 'Ngày tải lên',
    //   dataIndex: 'uploadDate',
    //   key: 'uploadDate',
    //   render: (date) => moment(date).format('DD/MM/YYYY'),
    // },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Lượt tải",
      dataIndex: "downloads",
      key: "downloads",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        let text = "Đã duyệt";

        if (status === "pending") {
          color = "gold";
          text = "Chờ duyệt";
        } else if (status === "rejected") {
          color = "red";
          text = "Bị từ chối";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Công khai",
      dataIndex: "isPublic",
      key: "isPublic",
      render: (isPublic) => (
        <Tag color={isPublic ? "green" : "default"}>
          {isPublic ? "Public" : "Private"}
        </Tag>
      ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => handleEditDocument(record)}
            title="Chỉnh sửa"
            disabled={record.status === "APPROVED"}
          />
          <Button
            icon={<DeleteOutlined />}
            type="text"
            danger
            onClick={() => handleDeleteDocument(record)}
            title="Xóa tài liệu"
          />
          <Button
            type="text"
            onClick={() => handleShareDocument(record)}
            title="Chia sẻ tài liệu"
          >
            Chia sẻ
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="documents-section">
      <div
        className="section-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faFileAlt} /> Tài liệu của tôi
        </h3>
        <Button
          type="primary"
          onClick={() => navigate("/upload")}
          style={{
            background: "linear-gradient(135deg, #233E8B 0%, #1EAE98 100%)",
            border: "none",
            fontSize: "16px",
          }}
        >
          Tải lên tài liệu mới
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          dataSource={documents}
          columns={columns}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          className="documents-table"
          locale={{ emptyText: "Không có tài liệu nào" }}
        />
        <Modal
          title="Chia sẻ tài liệu"
          open={shareModalVisible}
          onCancel={() => setShareModalVisible(false)}
          onOk={handleShareSubmit}
          confirmLoading={shareLoading}
          okText="Chia sẻ"
          cancelText="Hủy"
        >
          <p>
            <strong>Tài liệu:</strong> {selectedDocument?.title}
          </p>
          <Form form={form} layout="vertical">
            <Form.Item
              name="email"
              label="Email người nhận"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email người nhận" />
            </Form.Item>
            <Form.Item
              name="accessType"
              label="Quyền truy cập"
              rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
            >
              <Select placeholder="Chọn quyền">
                <Select.Option value="VIEW">Xem</Select.Option>
                <Select.Option value="COMMENT">Bình luận</Select.Option>
                <Select.Option value="DOWNLOAD">Tải xuống</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
}

export default MyDocuments;
