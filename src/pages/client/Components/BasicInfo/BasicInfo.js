import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Descriptions,
  Tag,
  Divider,
  Spin,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  FileOutlined,
  CheckCircleOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// Import your project's API utilities
import { getUserInfo } from "~/services/authService";
import { updateUserData } from "~/store/actions/login";
import { updateUser } from "~/services/usersService";

import "./BasicInfo.scss";

const { Title, Text } = Typography;

function BasicInfo({ avatar, setAvatar }) {
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Get user data from Redux store
  const { userData } = useSelector((state) => state.loginReducer);

  // Fetch user profile data from API
  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);

      const response = await getUserInfo();

      if (response && response.code === 200) {
        // Lấy dữ liệu mới
        const profileData = response.result;

        // Cập nhật Redux store
        dispatch(updateUserData(profileData));

        // Cập nhật localStorage
        localStorage.setItem("userData", JSON.stringify(profileData));

        // Cập nhật avatar nếu có
        if (profileData.avatarUrl) {
          setAvatar(profileData.avatarUrl);
        }

        return profileData; // Trả về dữ liệu để có thể sử dụng nếu cần
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Không thể tải thông tin người dùng");
    } finally {
      setFetchingProfile(false);
    }
  };

  // Fetch profile on component mount
  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set initial avatar when userData changes
  useEffect(() => {
    if (userData?.avatarUrl) {
      setAvatar(userData.avatarUrl);
    }
  }, [userData, setAvatar]);

  const handleEditClick = () => {
    form.setFieldsValue({
      fullName: userData?.fullName,
      phoneNumber: userData?.phoneNumber,
      dob: userData?.dob ? moment(userData.dob).format("YYYY-MM-DD") : null,
    });
    setIsEditModalVisible(true);
    setImagePreview(null);
  };

  // Hàm xử lý xem trước ảnh khi người dùng chọn ảnh
  const handleImagePreview = async (file) => {
    if (!file) return false;

    // Kiểm tra loại file
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ hỗ trợ định dạng JPG/PNG!");
      return false;
    }

    // Kiểm tra kích thước file
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
      return false;
    }

    // Tạo URL để xem trước ảnh
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    // Cập nhật form
    form.setFieldsValue({
      avatar: [
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: previewURL,
          originFileObj: file,
        },
      ],
    });

    return false; // Không tự động upload
  };

  const handleUpdateProfile = async (values) => {
    try {
      setUploading(true);
      const formData = new FormData();

      // Debug
      // console.log("Form values:", values);

      // Thêm fullName nếu có
      if (values.fullName) {
        formData.append("fullName", values.fullName);
      }

      // Thêm phoneNumber nếu có và hợp lệ
      if (values.phoneNumber) {
        formData.append("phoneNumber", values.phoneNumber);
      }

      // Quan trọng: Đổi định dạng ngày sang dd/MM/yyyy theo yêu cầu backend
      if (values.dob) {
        formData.append("dob", moment(values.dob).format("DD/MM/YYYY"));
      }

      // Thêm avatar nếu có
      if (values.avatar && values.avatar.length > 0) {
        const uploadFile = values.avatar[0]?.originFileObj;
        if (uploadFile) {
          formData.append("avatarUrl", uploadFile);
          // console.log("Adding avatar to form data:", uploadFile.name);
        }
      }

      // Debug FormData
      // console.log("FormData entries:");
      // for (let pair of formData.entries()) {
      // 	console.log(
      // 		pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
      // 	);
      // }

      // Gọi API cập nhật
      const response = await updateUser(userData.id, formData);

      if (response.code === 200) {
        message.success("Cập nhật thông tin thành công");
        setIsEditModalVisible(false);
        setImagePreview(null); // Reset ảnh xem trước

        // Đợi fetchUserProfile hoàn thành để cập nhật giao diện
        await fetchUserProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.data) {
        console.error("Error details:", error.response.data);
      }
      message.error(
        error.response?.data?.message || "Cập nhật thông tin thất bại",
      );
    } finally {
      setUploading(false);
    }
  };

  // Xử lý khi ảnh được upload trực tiếp từ widget avatar
  const handleDirectAvatarUpload = (file) => {
    // Kiểm tra định dạng
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ hỗ trợ định dạng JPG/PNG!");
      return false;
    }

    // Kiểm tra kích thước
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
      return false;
    }

    // Mở modal chỉnh sửa với ảnh đã chọn
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    form.setFieldsValue({
      fullName: userData?.fullName,
      phoneNumber: userData?.phoneNumber,
      dob: userData?.dob ? moment(userData.dob).format("YYYY-MM-DD") : null,
      avatar: [
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: previewURL,
          originFileObj: file,
        },
      ],
    });

    setIsEditModalVisible(true);
    return false;
  };

  // Show loading spinner when fetching profile data
  if (fetchingProfile) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Đang tải thông tin cá nhân..." />
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="profile-card avatar-card">
            <div className="profile-avatar-section">
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={handleDirectAvatarUpload}
                accept="image/jpeg,image/png"
              >
                <div className="avatar-upload-wrapper">
                  <Avatar
                    size={120}
                    src={avatar || userData?.avatarUrl}
                    icon={!avatar && !userData?.avatarUrl && <UserOutlined />}
                  />
                  <div className="avatar-upload-mask">
                    <UploadOutlined />
                    <div>Thay đổi ảnh</div>
                  </div>
                </div>
              </Upload>
              <Title level={4} className="profile-fullname">
                {userData?.fullName || "Người dùng"}
              </Title>
              <Title level={4} className="profile-fullname">
                {userData?.username || "Người dùng"}
              </Title>
              <Text className="profile-email">
                {userData?.email || "email@example.com"}
              </Text>

              {userData?.status && (
                <Tag
                  color={userData.status === "active" ? "green" : "default"}
                  className="status-tag"
                >
                  {userData.status === "active"
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </Tag>
              )}

              {userData?.emailVerified && (
                <Tag color="blue" icon={<CheckCircleOutlined />}>
                  Email đã xác thực
                </Tag>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card className="profile-card info-card">
            <div className="card-header">
              <Title level={4}>Thông tin cá nhân</Title>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEditClick}
                className="edit-button"
              >
                Chỉnh sửa
              </Button>
            </div>
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              className="info-descriptions"
            >
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined className="description-icon" /> Họ và tên
                  </>
                }
              >
                {userData?.fullName || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <>
                    <MailOutlined className="description-icon" /> Email
                  </>
                }
              >
                {userData?.email || "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined className="description-icon" /> Ngày sinh
                  </>
                }
              >
                {userData?.dob
                  ? moment(userData.dob).format("DD/MM/YYYY")
                  : "Chưa cập nhật"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined className="description-icon" /> Số điện thoại
                  </>
                }
              >
                {userData?.phoneNumber || "Chưa cập nhật"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="document-stats">
              <Title level={5}>Thống kê tài liệu</Title>
              <Row gutter={16} className="stats-row">
                <Col span={8}>
                  <Card size="small" className="stat-card">
                    <div className="stat-title">Tổng tài liệu</div>
                    <div className="stat-value">
                      <FileOutlined className="stat-icon" />
                      <span>{userData?.documents?.totalElements || 0}</span>
                    </div>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card size="small" className="stat-card">
                    <div className="stat-title">Tổng trang</div>
                    <div className="stat-value">
                      <span>{userData?.documents?.totalPages || 0}</span>
                    </div>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card size="small" className="stat-card">
                    <div className="stat-title">Lượt tải</div>
                    <div className="stat-value">
                      <span>{userData?.documentDownload || 0}</span>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setImagePreview(null); // Reset ảnh xem trước
          form.resetFields(); // Reset form
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: false, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: false, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Ngày sinh"
            rules={[{ required: false, message: "Vui lòng chọn ngày sinh!" }]}
            initialValue={
              userData?.dob
                ? moment(userData.dob).format("YYYY-MM-DD")
                : undefined
            }
          >
            <Input
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={(e) => console.log("Date changed:", e.target.value)}
            />
          </Form.Item>

          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload
              name="avatar"
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              beforeUpload={handleImagePreview}
              accept="image/jpeg,image/png"
            >
              {imagePreview ? (
                <div className="avatar-preview">
                  <img
                    src={imagePreview}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="avatar-preview-mask">
                    <UploadOutlined />
                    <div>Thay đổi</div>
                  </div>
                </div>
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                </div>
              )}
            </Upload>
            <div className="upload-hint">
              Hỗ trợ JPG, PNG. Kích thước tối đa: 2MB
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={uploading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BasicInfo;
