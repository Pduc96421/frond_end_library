import React, { useEffect } from "react";
import { Layout, Card, Typography, Button, Row, Col, Divider } from "antd";
import {
  ArrowLeftOutlined,
  LockOutlined,
  SafetyOutlined,
  SecurityScanOutlined,
  CrownTwoTone,
  CheckCircleOutlined,
  KeyOutlined,
  EyeInvisibleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Import animate.css
import "animate.css";

import Header from "~/layouts/client/components/Header/Header";
import Footer from "~/layouts/client/components/Footer/Footer";
import ChangePassword from "../Components/ChangePassword/ChangePassword";

import "./ChangePasswordPage.scss";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

function ChangePasswordPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Thêm hiệu ứng fade-in cho các phần tử khi trang tải
    const animationElements = document.querySelectorAll(".animate__animated");
    animationElements.forEach((element, index) => {
      // Thêm delay tăng dần cho từng phần tử
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  const securityIcons = [
    <LockOutlined className="floating-icon" style={{ left: "10%", top: "20%", animationDuration: "15s" }} />,
    <KeyOutlined
      className="floating-icon"
      style={{ left: "25%", top: "60%", animationDuration: "12s", animationDelay: "2s" }}
    />,
    <SafetyCertificateOutlined
      className="floating-icon"
      style={{ left: "45%", top: "25%", animationDuration: "20s", animationDelay: "1s" }}
    />,
    <SecurityScanOutlined
      className="floating-icon"
      style={{ left: "65%", top: "70%", animationDuration: "18s", animationDelay: "3s" }}
    />,
    <CrownTwoTone
      className="floating-icon"
      style={{ left: "80%", top: "30%", animationDuration: "14s", animationDelay: "1.5s" }}
    />,
    <EyeInvisibleOutlined
      className="floating-icon"
      style={{ left: "20%", top: "40%", animationDuration: "16s", animationDelay: "2.5s" }}
    />,
    <LockOutlined
      className="floating-icon"
      style={{ left: "70%", top: "15%", animationDuration: "13s", animationDelay: "0.5s" }}
    />,
    <KeyOutlined
      className="floating-icon"
      style={{ left: "85%", top: "50%", animationDuration: "17s", animationDelay: "3.5s" }}
    />,
  ];

  return (
    <Layout className="change-password-layout">
      <Header />
      <div className="page-banner animate__animated animate__fadeIn">
        <div className="banner-icons-container">{securityIcons}</div>
        <div className="banner-decoration"></div>
        <div className="banner-content">
          <Title className="animate__animated animate__fadeInDown">Bảo mật tài khoản</Title>
          <Text className="animate__animated animate__fadeInUp animate__delay-1s">
            Cập nhật mật khẩu để bảo vệ tài khoản của bạn
          </Text>
        </div>
      </div>
      <Content className="change-password-content">
        <div className="change-password-container">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/account/profile")}
            className="back-button animate__animated animate__fadeInLeft"
          >
            Quay lại trang cá nhân
          </Button>

          <Row gutter={[16, 16]} className="password-section">
            <Col xs={24} lg={10} className="info-column">
              <div className="security-info animate__animated animate__fadeInLeft">
                <div className="security-badge">
                  <CrownTwoTone />
                </div>
                <Title level={2}>Đổi mật khẩu</Title>
                <Paragraph className="sub-title">Cập nhật mật khẩu mới cho tài khoản của bạn</Paragraph>

                <Divider className="animated-divider" />

                <div className="security-tips">
                  <Title level={4} className="tips-header">
                    <SafetyOutlined className="tips-icon pulse-animation" /> Mẹo tạo mật khẩu an toàn
                  </Title>
                  <ul className="tips-list">
                    <li className="tip-item animate__animated animate__fadeInUp animate__delay-1s">
                      <CheckCircleOutlined className="icon-success" /> Sử dụng ít nhất 8 ký tự
                    </li>
                    <li className="tip-item animate__animated animate__fadeInUp animate__delay-2s">
                      <CheckCircleOutlined className="icon-success" /> Kết hợp chữ hoa, chữ thường và số
                    </li>
                    <li className="tip-item animate__animated animate__fadeInUp animate__delay-3s">
                      <CheckCircleOutlined className="icon-success" /> Thêm ký tự đặc biệt (!, @, #, $, %, v.v.)
                    </li>
                    <li className="tip-item animate__animated animate__fadeInUp animate__delay-4s">
                      <CheckCircleOutlined className="icon-success" /> Tránh sử dụng thông tin cá nhân dễ đoán
                    </li>
                  </ul>
                </div>

                <div className="security-icon floating-animation">
                  <KeyOutlined />
                </div>
              </div>
            </Col>

            <Col xs={24} lg={14}>
              <Card bordered={false} className="change-password-card animate__animated animate__fadeInRight">
                <ChangePassword />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default ChangePasswordPage;
