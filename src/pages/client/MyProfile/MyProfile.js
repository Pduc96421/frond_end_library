import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Form, Card, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, FileTextOutlined, LockOutlined,FileSearchOutlined } from '@ant-design/icons';

// Import components
import Header from '~/layouts/client/components/Header/Header';
import Footer from '~/layouts/client/components/Footer/Footer';
import BasicInfo from '../Components/BasicInfo/BasicInfo';
import MyDocuments from '../Components/MyDocuments/MyDocuments';
import SharedDocuments from '../Components/SharedDocuments/SharedDocuments'; // Import mới

import "./MyProfile.scss";

const { Title, Text } = Typography;
const { Content } = Layout;

function MyProfile() {
  const { userData } = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [avatar, setAvatar] = useState(userData?.avatarUrl || null);

  const handleTabClick = (key) => {
    if (key === "3") {
      // Navigate to change password route
      navigate("/users/change-password");
    } else {
      setActiveTab(key);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <span className="tab-label">
          <UserOutlined />
          <span>Thông tin cá nhân</span>
        </span>
      ),
      children: (
        <BasicInfo
          form={form}
          avatar={avatar}
          setAvatar={setAvatar}
          userData={userData}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="tab-label">
          <FileTextOutlined />
          <span>Tài liệu của tôi</span>
        </span>
      ),
      children: <MyDocuments userData={userData} />,
    },
    {
      key: '4', // Thêm tab mới cho tài liệu chia sẻ
      label: (
        <span className="tab-label">
          <FileSearchOutlined/>
          <span>Tài liệu được chia sẻ</span>
        </span>
      ),
      children: <SharedDocuments userData={userData} /> // Hiển thị tài liệu chia sẻ
    },
    {
      key: '3',
      label: (
        <span className="tab-label">
          <LockOutlined />
          <span>Đổi mật khẩu</span>
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        description: userData.description,
      });
    }
  }, [userData, form]);

  return (
    <Layout className="profile-layout">
      <Header />
      <Content className="profile-content">
        <div className="profile-container">
          <div className="profile-header">
            <Title level={2}>Thông tin cá nhân</Title>
            <Text type="secondary">Quản lý thông tin cá nhân và tài khoản</Text>
          </div>

          <Card
            bordered={false}
            className="profile-card"
            bodyStyle={{ padding: "24px" }}
          >
            <Tabs
              defaultActiveKey="1"
              activeKey={activeTab}
              onChange={handleTabClick}
              items={items}
              className="profile-tabs"
              tabPosition="left"
            />
          </Card>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default MyProfile;
