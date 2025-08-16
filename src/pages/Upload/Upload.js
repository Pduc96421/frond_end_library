import React, { useEffect, useState } from "react";
import { Upload, Button, Form, Input, Select, Switch, Space, Card, Typography, Tag, message } from "antd";
import { InboxOutlined, PlusOutlined, CloudUploadOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Upload.module.scss";
import { uploadDocument } from "~/services/documentService";
import { showAlert } from "~/store/actions/alert";
import { getCategories } from "~/services/categoryService";

const cx = classNames.bind(styles);
const { Dragger } = Upload;
const { Title } = Typography;
const { TextArea } = Input;

const FileUploadPage = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = React.useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);

  const transformCategories = (categories) => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
      disabled: category.status !== "ACTIVE",
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        if (response.code === 200) {
          const transformedCategories = transformCategories(response.result);
          setDataCategories(transformedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        dispatch(showAlert("Lấy danh mục thất bại", "error"));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleUploadChange = (info) => {
    let fileList = [...info.fileList];

    // Giới hạn chỉ 1 file
    fileList = fileList.slice(-1);

    // Cập nhật trạng thái file
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      dispatch(showAlert("Vui lòng tải lên một tập tin", "error"));
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      formData.append("title", values.title);
      formData.append("description", values.description || "");

      formData.append("isPublic", values.isPublic);
      const selectedCategory = dataCategories.find((cat) => cat.value === values.categoryName);
      if (selectedCategory) {
        formData.append("category_id", selectedCategory.value);
      } else {
        message.error("Danh mục không hợp lệ");
        setUploading(false);
        return;
      }

      // Thêm tags
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      await uploadDocument(formData);

      message.success("Tải lên tài liệu thành công!");
      form.resetFields();
      setFileList([]);
      setTags([]);
      const parentPath = location.pathname.replace("/upload", "");
      navigate(parentPath);
    } catch (error) {
      message.error("Tải lên tài liệu thất bại. Vui lòng thử lại.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle showing the tag input
  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Handle tag input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle tag input confirmation
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  // Handle tag close
  const handleTagClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  // Upload props for Dragger component
  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    beforeUpload: (file) => {
      // Kiểm tra định dạng file
      const isValidType = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        // Thêm các định dạng khác nếu cần
      ].includes(file.type);

      if (!isValidType) {
        message.error("Chỉ chấp nhận file .doc, .docx hoặc .pdf!");
        return Upload.LIST_IGNORE;
      }

      // Kiểm tra kích thước file - giới hạn 10MB
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File phải nhỏ hơn 10MB!");
        return Upload.LIST_IGNORE;
      }

      return false; // Prevent auto upload
    },
    onRemove: () => {
      setFileList([]);
    },
    onChange: handleUploadChange,
  };

  return (
    <Card className={cx("uploadCard")}>
      <Title level={2} className={cx("title")}>
        Tải lên tập tin
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isPublic: true }}
        className={cx("formSection")}
      >
        {/* File Upload */}
        <Form.Item
          name="file"
          label={<span className={cx("formLabel")}>Tập tin</span>}
          rules={[{ required: true, message: "Vui lòng tải lên một tập tin" }]}
        >
          <div>
            <Dragger {...uploadProps} className={cx("uploadDragger")}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấp hoặc kéo tập tin vào khu vực này để tải lên</p>
              <p className="ant-upload-hint">Hỗ trợ tải lên file .pdf. Kích thước tối đa 10MB.</p>
            </Dragger>
            {fileList.length > 0 && <div className={cx("selectedFile")}>Đã chọn: {fileList[0].name}</div>}
          </div>
        </Form.Item>

        {/* Title */}
        <Form.Item
          name="title"
          label={<span className={cx("formLabel")}>Tên tài liệu</span>}
          rules={[{ required: true, message: "Vui lòng nhập tên tài liệu" }]}
        >
          <Input placeholder="Nhập tên tài liệu" className={cx("textInput")} />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label={<span className={cx("formLabel")}>Mô tả tài liệu</span>}
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea
            placeholder="Nhập mô tả tài liệu"
            autoSize={{ minRows: 3, maxRows: 6 }}
            className={cx("textArea")}
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="categoryName"
          label={<span className={cx("formLabel")}>Tên danh mục</span>}
          rules={[{ required: true, message: "Vui lòng chọn một danh mục" }]}
        >
          <Select
            loading={loading}
            placeholder="Chọn danh mục"
            options={dataCategories}
            className={cx("categorySelect")}
          />
        </Form.Item>

        {/* Public/Private */}
        <Form.Item name="is_public" label={<span className={cx("formLabel")}>Công khai</span>} valuePropName="checked">
          <Switch checkedChildren="Công khai" unCheckedChildren="Riêng tư" className={cx("switchPublic")} />
        </Form.Item>

        {/* Tags */}
        <Form.Item
          name="tags"
          label={<span className={cx("formLabel")}>Thẻ</span>}
          rules={[{ required: true, message: "Vui lòng nhập thẻ tag" }]}
        >
          <Space className={cx("tagSection")} wrap>
            {tags.map((tag) => (
              <Tag key={tag} closable onClose={() => handleTagClose(tag)} className={cx("tagItem")}>
                {tag}
              </Tag>
            ))}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                className={cx("tagInput")}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag onClick={showInput} className={cx("tagItem", "addTag")}>
                <PlusOutlined /> Thêm thẻ
              </Tag>
            )}
          </Space>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={cx("submitButton")}
            icon={<CloudUploadOutlined className={cx("uploadIcon")} />}
            loading={uploading}
            disabled={fileList.length === 0}
          >
            {uploading ? "Đang tải lên..." : "Tải lên"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FileUploadPage;
