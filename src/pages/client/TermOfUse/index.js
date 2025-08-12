import React from "react";
import Header from "../../../layouts/client/components/Header";
import Footer from "../../../layouts/client/components/Footer";
import "./TermOfUse.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faShield, faGavel, faFileContract, faExclamationTriangle, faUserCog, faHandPaper, faFileAlt, faTrashAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function TermOfUse() {
  return (
    <>
      <Header />
      <div className="terms-page">
        <div className="container mx-auto mt-10 mb-10 px-4 lg:px-0">
          <div className="article-header">
            <h1 className="main-title">Điều khoản sử dụng</h1>
            <div className="article-meta">
              <div className="calendar">
                <FontAwesomeIcon icon={faCalendarDays} /> 
                Cập nhật: 20/04/2025
              </div>
            </div>
          </div>

          <div className="terms-content">
            <section className="intro-section">
              <h2>Thỏa thuận sử dụng dịch vụ</h2>
              <p>
                Chào mừng bạn đến với TTCS Doc! Trước khi sử dụng dịch vụ của chúng tôi, vui lòng đọc kỹ các điều khoản sử dụng dưới đây. Bằng việc truy cập hoặc sử dụng nền tảng TTCS Doc, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faUserCog} />
                </div>
                <h2>1. Tài khoản người dùng và đăng ký</h2>
              </div>
              <div className="section-content">
                <ol className="terms-list">
                  <li>
                    <strong>Đăng ký tài khoản:</strong> Để sử dụng đầy đủ các tính năng của TTCS Doc, bạn cần đăng ký tài khoản. Khi đăng ký, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật.
                  </li>
                  <li>
                    <strong>Bảo mật tài khoản:</strong> Bạn chịu trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu, đồng thời chịu trách nhiệm cho tất cả các hoạt động diễn ra dưới tài khoản của mình.
                  </li>
                  <li>
                    <strong>Thông báo vi phạm:</strong> Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ việc sử dụng trái phép tài khoản hoặc vi phạm bảo mật nào.
                  </li>
                  <li>
                    <strong>Giới hạn tuổi:</strong> Bạn phải từ 18 tuổi trở lên hoặc có sự giám sát của người giám hộ hợp pháp để sử dụng dịch vụ của chúng tôi.
                  </li>
                </ol>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <h2>2. Nội dung và tài liệu</h2>
              </div>
              <div className="section-content">
                <ol className="terms-list">
                  <li>
                    <strong>Quyền sở hữu trí tuệ:</strong> TTCS Doc tôn trọng quyền sở hữu trí tuệ và yêu cầu người dùng cũng làm như vậy. Bạn không được đăng tải nội dung vi phạm bản quyền, thương hiệu, bằng sáng chế hoặc quyền sở hữu trí tuệ khác mà không có sự cho phép phù hợp.
                  </li>
                  <li>
                    <strong>Giấy phép nội dung:</strong> Khi đăng tải tài liệu lên TTCS Doc, bạn vẫn giữ quyền sở hữu đối với nội dung của mình, nhưng bạn cấp cho chúng tôi giấy phép toàn cầu, phi độc quyền, miễn phí bản quyền để sử dụng, sao chép, sửa đổi, tạo các sản phẩm phái sinh, phân phối và hiển thị nội dung đó trên nền tảng của chúng tôi.
                  </li>
                  <li>
                    <strong>Nội dung bị cấm:</strong> Bạn không được đăng tải nội dung bất hợp pháp, xúc phạm, khiêu dâm, đe dọa, quấy rối, phỉ báng, xâm phạm quyền riêng tư hoặc vi phạm pháp luật hiện hành.
                  </li>
                  <li>
                    <strong>Quyền gỡ bỏ:</strong> TTCS Doc có quyền (nhưng không có nghĩa vụ) sàng lọc, từ chối, xóa hoặc di chuyển bất kỳ nội dung nào có sẵn thông qua dịch vụ, theo quyết định riêng của chúng tôi và không cần thông báo.
                  </li>
                </ol>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faHandPaper} />
                </div>
                <h2>3. Các hành vi bị cấm</h2>
              </div>
              <div className="section-content">
                <p>Khi sử dụng TTCS Doc, bạn đồng ý không:</p>
                <ul className="terms-list">
                  <li>Sử dụng dịch vụ cho bất kỳ mục đích bất hợp pháp nào hoặc khuyến khích hoạt động bất hợp pháp.</li>
                  <li>Cố gắng đánh lừa, lừa đảo hoặc xâm phạm quyền riêng tư của người khác.</li>
                  <li>Gửi thư rác hoặc nội dung quảng cáo không được phép.</li>
                  <li>Thu thập thông tin người dùng mà không được phép.</li>
                  <li>Sử dụng robot, spider, crawler hoặc các phương tiện tự động khác để truy cập dịch vụ.</li>
                  <li>Can thiệp vào hoặc phá hoại dịch vụ hoặc máy chủ và mạng được kết nối với dịch vụ.</li>
                  <li>Tránh né, vô hiệu hóa hoặc can thiệp vào các tính năng bảo mật của dịch vụ.</li>
                  <li>Bán, cho thuê hoặc cấp phép lại việc sử dụng dịch vụ mà không có sự đồng ý bằng văn bản của chúng tôi.</li>
                </ul>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faFileContract} />
                </div>
                <h2>4. Chính sách bản quyền và giấy phép</h2>
              </div>
              <div className="section-content">
                <ol className="terms-list">
                  <li>
                    <strong>Báo cáo vi phạm bản quyền:</strong> Nếu bạn tin rằng nội dung trên TTCS Doc vi phạm bản quyền của bạn, vui lòng gửi thông báo vi phạm bản quyền đến email: copyright@ttcsdoc.vn với các thông tin sau:
                    <ul>
                      <li>Mô tả tác phẩm có bản quyền mà bạn cho rằng đã bị vi phạm.</li>
                      <li>URL hoặc thông tin khác để xác định vị trí nội dung bị cáo buộc vi phạm.</li>
                      <li>Thông tin liên hệ của bạn.</li>
                      <li>Tuyên bố rằng bạn tin tưởng với thiện chí rằng việc sử dụng không được phép bởi chủ sở hữu bản quyền, đại diện của họ hoặc pháp luật.</li>
                      <li>Tuyên bố rằng thông tin trong thông báo là chính xác và bạn là chủ sở hữu bản quyền hoặc được ủy quyền hành động thay mặt cho chủ sở hữu bản quyền.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Giấy phép sử dụng tài liệu:</strong> Tài liệu trên TTCS Doc được cung cấp theo các giấy phép khác nhau. Người dùng phải tuân thủ các điều khoản giấy phép áp dụng cho từng tài liệu cụ thể.
                  </li>
                </ol>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
                <h2>5. Từ chối trách nhiệm và giới hạn trách nhiệm</h2>
              </div>
              <div className="section-content">
                <ol className="terms-list">
                  <li>
                    <strong>Dịch vụ "nguyên trạng":</strong> Dịch vụ TTCS Doc được cung cấp trên cơ sở "nguyên trạng" và "có sẵn", không có bảo đảm dưới bất kỳ hình thức nào, rõ ràng hay ngụ ý.
                  </li>
                  <li>
                    <strong>Không đảm bảo:</strong> TTCS Doc không đảm bảo rằng dịch vụ sẽ không bị gián đoạn, kịp thời, an toàn hoặc không có lỗi, hoặc rằng kết quả có thể đạt được từ việc sử dụng dịch vụ sẽ chính xác hoặc đáng tin cậy.
                  </li>
                  <li>
                    <strong>Giới hạn trách nhiệm:</strong> TTCS Doc và các đối tác, giám đốc, nhân viên và đại lý sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính trừng phạt nào phát sinh từ việc bạn sử dụng hoặc không thể sử dụng dịch vụ.
                  </li>
                </ol>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
                <h2>6. Chấm dứt sử dụng</h2>
              </div>
              <div className="section-content">
                <ol className="terms-list">
                  <li>
                    <strong>Quyền chấm dứt của chúng tôi:</strong> TTCS Doc có quyền, theo quyết định riêng của mình, chấm dứt hoặc tạm dừng quyền truy cập của bạn vào dịch vụ ngay lập tức, không cần thông báo trước, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn ở việc vi phạm Điều khoản sử dụng này.
                  </li>
                  <li>
                    <strong>Hiệu lực sau khi chấm dứt:</strong> Sau khi chấm dứt, quyền sử dụng dịch vụ của bạn sẽ ngay lập tức chấm dứt. Tuy nhiên, tất cả các điều khoản của Thỏa thuận này sẽ tiếp tục có hiệu lực sau khi chấm dứt.
                  </li>
                </ol>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                </div>
                <h2>7. Thay đổi điều khoản</h2>
              </div>
              <div className="section-content">
                <p>
                  TTCS Doc có quyền sửa đổi hoặc thay thế các điều khoản này bất kỳ lúc nào. Trách nhiệm của bạn là kiểm tra các điều khoản này định kỳ để cập nhật những thay đổi. Việc tiếp tục sử dụng dịch vụ sau khi đăng các thay đổi sẽ cấu thành việc chấp nhận các điều khoản sửa đổi.
                </p>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faGavel} />
                </div>
                <h2>8. Luật áp dụng</h2>
              </div>
              <div className="section-content">
                <p>
                  Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam, mà không liên quan đến các xung đột về nguyên tắc pháp luật. Tất cả các tranh chấp phát sinh từ hoặc liên quan đến các Điều khoản này hoặc dịch vụ sẽ thuộc thẩm quyền độc quyền của các tòa án có thẩm quyền tại Hà Nội, Việt Nam.
                </p>
              </div>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <div className="icon">
                  <FontAwesomeIcon icon={faShield} />
                </div>
                <h2>9. Chính sách bảo mật</h2>
              </div>
              <div className="section-content">
                <p>
                  Vui lòng xem <a href="/privacy-policy">Chính sách Bảo mật</a> của chúng tôi, được kết hợp trong Điều khoản sử dụng này, để biết thông tin về cách chúng tôi thu thập, sử dụng và tiết lộ thông tin cá nhân.
                </p>
              </div>
            </section>

            <section className="contact-section">
              <h2>10. Liên hệ</h2>
              <div className="contact-info">
                <p>Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi:</p>
                <p><strong>Email:</strong> terms@ttcsdoc.vn</p>
                <p><strong>Địa chỉ:</strong> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                <p><strong>Điện thoại:</strong> (024) 7300 1955</p>
              </div>
            </section>

            <div className="terms-agreement">
              <p>Bằng việc tiếp tục sử dụng trang web và dịch vụ của chúng tôi, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân theo Điều khoản sử dụng này.</p>
              <p>Cập nhật lần cuối: 20/04/2025</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermOfUse;