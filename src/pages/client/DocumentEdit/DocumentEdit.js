import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Card,
  Spin,
  Image,
  Modal,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./DocumentEdit.module.scss";
import { getDocumentById, updateDocument } from "~/services/documentService";
import { getBase64 } from "~/helpers/getBase64";
import { getCategories } from "~/services/categoryService";
import Loading from "../Loading";

const { TextArea } = Input;
const { Option } = Select;
const cx = classNames.bind(styles);

function DocumentEdit() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchDocument();
    // Thêm gọi hàm lấy danh mục
  }, [documentId]);

  // Thêm hàm để lấy tất cả danh mục
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getCategories();
      if (response.code === 200) {
        setCategories(response.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Không thể tải danh sách danh mục");
    } finally {
      setCategoriesLoading(false);
    }
  };
  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await getDocumentById(Number(documentId));
      if (response.code === 200) {
        const doc = response.result;
        setDocument(doc);

        // Set form values
        form.setFieldsValue({
          title: doc.documentIndex.title,
          description: doc.documentIndex.description,
          categoryId: doc.category.id,
          tags: doc.documentIndex.tags,
        });

        console.log("Doc data:", doc);
        console.log("Categories:", categories);

        // Set preview images
        if (doc.documentIndex.previewUrls) {
          setPreviewUrls(doc.documentIndex.previewUrls);
        }
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      message.error("Không thể tải thông tin tài liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async (values) => {
    try {
      // Tìm thông tin category từ ID
      const selectedCategory = categories.find(
        (cat) => cat.id === values.categoryId
      );
      if (!selectedCategory) {
        message.error("Danh mục không hợp lệ");
        return;
      }

      // Tạo đối tượng dữ liệu đầy đủ để gửi lên server
      const documentData = {
        title: values.title,
        description: values.description,
        tags: values.tags,
        // categoryName: selectedCategory.name,  //BE không cập nhật categoryName
        previewUrls: previewUrls, // Thêm previewUrls vào dữ liệu cập nhật
        id: document.documentIndex.id, // Giữ nguyên ID
        fileUrl: document.documentIndex.fileUrl, // Giữ nguyên đường dẫn file
        status: document.documentIndex.status, // Giữ nguyên trạng thái
      };

      console.log("Document data to update:", documentData);
      // Cập nhật metadata tài liệu
      const response = await updateDocument(documentId, documentData);

      // Nếu cần upload file mới
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const fileFormData = new FormData();
        fileFormData.append("file", fileList[0].originFileObj);

        // Phần này sẽ cần triển khai endpoint upload file riêng
        // await uploadDocumentFile(documentId, fileFormData);
      }

      if (response.code === 200) {
        message.success("Cập nhật tài liệu thành công");
        navigate(`/documents/${documentId}`);
      }
    } catch (error) {
      console.error("Error updating document:", error);
      message.error("Cập nhật tài liệu thất bại");
    }
  };

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={cx("edit-container")}>
      <Card className={cx("edit-card")}>
        <div className={cx("header")}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className={cx("back-button")}
          >
            Quay lại
          </Button>
          <h2>Chỉnh sửa tài liệu</h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={cx("edit-form")}
        >
          <Form.Item
            name="title"
            label="Tiêu đề tài liệu"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề tài liệu!" },
            ]}
          >
            <Input placeholder="Nhập tiêu đề tài liệu" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả tài liệu!" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả tài liệu" />
          </Form.Item>

          {/* Back ENd không xử lý cập nhật categoryId */}
          {/* <Form.Item
            name="categoryId" 
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn Danh mục!' }]}
          >
            <Select 
              placeholder="Chọn Danh mục"
              loading={categoriesLoading}
            >
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}

          <Form.Item
            name="tags"
            label="Tags"
            rules={[
              { required: true, message: "Vui lòng nhập ít nhất một tag!" },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Nhập tags và nhấn Enter"
              tokenSeparators={[","]}
            />
          </Form.Item>

          {previewUrls.length > 0 && (
            <div className={cx("preview-section")}>
              <h3>Ảnh xem trước hiện tại</h3>
              <div className={cx("preview-images")}>
                {previewUrls.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className={cx("preview-image")}
                    onClick={() => {
                      setPreviewImage(url);
                      setPreviewVisible(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <Modal
            open={previewVisible}
            title="Xem trước"
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>

          <Form.Item className={cx("submit-button")}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              size="large"
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default DocumentEdit;
