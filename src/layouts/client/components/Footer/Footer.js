import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import logo from "~/assets/images/logo.png";
import { FacebookOutlined, MailOutlined } from "@ant-design/icons";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faFacebook } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <>
      <Row justify="space-between" align="middle" className="footer">
        <Col span={24}>
          <Link to={"/"} className={"logo-link"}>
            <img alt="logo" src={logo} />
          </Link>
        </Col>

        <Col span={6}>
          <div className={"footer__col"}>
            <div className="footer__col-title">HỖ TRỢ KHÁCH HÀNG</div>
            <div className="footer__social">
              <div className="footer__social-item">
                <div className="footer__social-icon">
                  <Link to={"/"}>
                    <MailOutlined />
                  </Link>
                </div>
                <Link to={"/"}>doc@gmail.com</Link>
              </div>

              <div className="footer__social-item">
                <div className="footer__social-icon">
                  <Link to={"/"}>
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="lg"
                      style={{ color: "#74C0FC" }}
                    />
                  </Link>
                </div>
                <Link to={"/"}>Facebook</Link>
              </div>

              <div className="footer__social-item">
                <div className="footer__social-icon">
                  <Link to={"/"}>
                    <FontAwesomeIcon
                      icon={faTelegram}
                      size="lg"
                      color="#0088cc"
                    />
                  </Link>
                </div>
                <Link to={"/"}>Telegram</Link>
              </div>
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className={"footer__col"}>
            <div className="footer__col-title">GIÚP ĐỠ</div>

            <div className="footer__helps">
              <div className="footer__helps-item">
                <Link to={"/cau-hoi-thuong-gap"}>Câu hỏi thường gặp</Link>
              </div>

              <div className="footer__helps-item">
                <Link to={"/dieu-khoan-su-dung"}>Điều khoản sử dụng</Link>
              </div>
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className={"footer__col"}>
            <div className="footer__col-title">GIỚI THIỆU</div>
            <div className="footer__helps-item">
              <Link to={"/gioi-thieu"}>TTCS docs là gì?</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Footer;
