import React from "react";
import Header from "../../../layouts/client/components/Header";
import Footer from "../../../layouts/client/components/Footer";
import "./AboutUs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFileAlt,
  faUsers,
  faDownload,
  faSearch,
  faStar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function AboutUs() {
  return (
    <>
      <Header />
      <div className="about-us">
        <div className="container mx-auto mt-10 mb-10 px-4 lg:px-0">
          <div className="article-header">
            <h1 className="main-title">Giới thiệu về TTCS Doc</h1>
            <div className="article-meta">
              <div className="calendar">
                <FontAwesomeIcon icon={faCalendarDays} />
                20/04/2025
              </div>
              <div className="views">
                <FontAwesomeIcon icon={faUsers} />
                1.234 lượt xem
              </div>
            </div>
          </div>

          <div className="about-content">
            <section className="intro-section">
              <h2>Trang tìm kiếm tài liệu trực tuyến hàng đầu</h2>
              <p>
                TTCS Doc là nền tảng chia sẻ tài liệu trực tuyến phi lợi nhuận
                dành cho người đọc và người tải tài liệu, được thành lập từ năm
                2023. Với phương châm "Chia sẻ là phát triển", TTCS Doc đã trở
                thành thư viện điện tử lớn với hàng triệu tài liệu đa dạng về
                chủ đề, ngôn ngữ và định dạng.
              </p>
              <p>
                Chúng tôi cung cấp cho người dùng khả năng truy cập nhanh chóng
                và dễ dàng vào kho tàng kiến thức đồ sộ, phục vụ nhu cầu học
                tập, nghiên cứu và làm việc trong thời đại số.
              </p>
            </section>

            <section className="statistics-section">
              <h2>TTCS Doc trong con số</h2>
              <div className="statistics-grid">
                <div className="statistic-item">
                  <div className="statistic-icon">
                    <FontAwesomeIcon icon={faFileAlt} />
                  </div>
                  <div className="statistic-number">10+ Triệu</div>
                  <div className="statistic-desc">Tài liệu đa dạng</div>
                </div>
                <div className="statistic-item">
                  <div className="statistic-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="statistic-number">5+ Triệu</div>
                  <div className="statistic-desc">Người dùng tích cực</div>
                </div>
                <div className="statistic-item">
                  <div className="statistic-icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </div>
                  <div className="statistic-number">20+ Triệu</div>
                  <div className="statistic-desc">Lượt tải mỗi tháng</div>
                </div>
                <div className="statistic-item">
                  <div className="statistic-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <div className="statistic-number">30+ Triệu</div>
                  <div className="statistic-desc">Lượt tìm kiếm mỗi tháng</div>
                </div>
              </div>
            </section>

            <section className="features-section">
              <h2>Tính năng nổi bật</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <div className="feature-content">
                    <h3>Tìm kiếm thông minh</h3>
                    <p>
                      Hỗ trợ tìm kiếm nhanh chóng và chính xác với nhiều bộ lọc
                      chuyên sâu, giúp người dùng dễ dàng tìm được tài liệu cần
                      thiết.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faFileAlt} />
                  </div>
                  <div className="feature-content">
                    <h3>Đa dạng tài liệu</h3>
                    <p>
                      Kho tài liệu đa dạng về thể loại: sách, báo cáo, luận văn,
                      đề thi, giáo trình... thuộc nhiều lĩnh vực khác nhau.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </div>
                  <div className="feature-content">
                    <h3>Tải tài liệu dễ dàng</h3>
                    <p>
                      Quy trình tải tài liệu đơn giản, nhanh chóng với nhiều
                      định dạng hỗ trợ: PDF, DOC, PPT, XLS...
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <div className="feature-content">
                    <h3>Đánh giá và phản hồi</h3>
                    <p>
                      Cho phép người dùng đánh giá, bình luận về tài liệu, giúp
                      cộng đồng tìm được nội dung chất lượng.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mission-section">
              <h2>Sứ mệnh của chúng tôi</h2>
              <div className="mission-content">
                <p>
                  TTCS Doc ra đời với sứ mệnh kết nối tri thức và chia sẻ kiến
                  thức, tạo điều kiện cho mọi người đều có thể tiếp cận với
                  nguồn tài liệu học tập và nghiên cứu chất lượng một cách dễ
                  dàng nhất.
                </p>
                <div className="mission-points">
                  <div className="mission-point">
                    <FontAwesomeIcon icon={faCheckCircle} /> Xây dựng cộng đồng
                    chia sẻ tri thức lớn mạnh
                  </div>
                  <div className="mission-point">
                    <FontAwesomeIcon icon={faCheckCircle} /> Cung cấp nền tảng
                    đáng tin cậy cho việc lưu trữ và tìm kiếm tài liệu
                  </div>
                  <div className="mission-point">
                    <FontAwesomeIcon icon={faCheckCircle} /> Thúc đẩy văn hóa
                    học tập suốt đời và nghiên cứu học thuật
                  </div>
                  <div className="mission-point">
                    <FontAwesomeIcon icon={faCheckCircle} /> Hỗ trợ quá trình số
                    hóa tài liệu và bảo tồn tri thức
                  </div>
                </div>
              </div>
            </section>

            <section className="development-section">
              <h2>Quá trình phát triển</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h3>Thành lập</h3>
                    <p>
                      TTCS Doc chính thức ra mắt với 1.000 tài liệu ban đầu, tập
                      trung vào lĩnh vực công nghệ thông tin và kinh tế.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-content">
                    <h3>Mở rộng thư viện</h3>
                    <p>
                      Mở rộng thư viện lên 5 triệu tài liệu, bổ sung nhiều chủ
                      đề mới và tích hợp các tính năng tìm kiếm nâng cao.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2025</div>
                  <div className="timeline-content">
                    <h3>Phát triển mạnh mẽ</h3>
                    <p>
                      Đạt mốc 10+ triệu tài liệu và 5+ triệu người dùng, TTCS
                      Doc trở thành một trong những thư viện điện tử hàng đầu
                      tại Việt Nam.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="contact-section">
              <h2>Liên hệ với chúng tôi</h2>
              <div className="contact-info">
                <p>
                  <strong>Địa chỉ:</strong> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà
                  Nội
                </p>
                <p>
                  <strong>Email:</strong> contact@ttcsdoc.vn
                </p>
                <p>
                  <strong>Điện thoại:</strong> (024) 7300 1955
                </p>
                <p>
                  <strong>Giờ làm việc:</strong> 8:00 - 17:30 từ Thứ Hai đến Thứ
                  Sáu
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
