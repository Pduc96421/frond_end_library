import React, { useState } from "react";
import Header from "../../../layouts/client/components/Header";
import Footer from "../../../layouts/client/components/Footer";
import "./FrequentlyAskedQuestions.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faQuestionCircle, faPlus, faMinus, faUser, faFileAlt, faDownload, faLock } from '@fortawesome/free-solid-svg-icons';

function FrequentlyAskedQuestions() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  // Toggle question open/closed state
  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <div className="faq-page">
        <div className="container mx-auto mt-10 mb-10 px-4 lg:px-0">
          <div className="article-header">
            <h1 className="main-title">Câu hỏi thường gặp</h1>
            <div className="article-meta">
              <div className="calendar">
                <FontAwesomeIcon icon={faCalendarDays} /> 
                20/04/2025
              </div>
            </div>
          </div>

          <div className="faq-content">
            <div className="faq-categories">
              <button 
                className={activeCategory === 'general' ? 'active' : ''}
                onClick={() => handleCategoryChange('general')}
              >
                <FontAwesomeIcon icon={faQuestionCircle} /> Thông tin chung
              </button>
              <button 
                className={activeCategory === 'account' ? 'active' : ''}
                onClick={() => handleCategoryChange('account')}
              >
                <FontAwesomeIcon icon={faUser} /> Tài khoản & Đăng ký
              </button>
              <button 
                className={activeCategory === 'documents' ? 'active' : ''}
                onClick={() => handleCategoryChange('documents')}
              >
                <FontAwesomeIcon icon={faFileAlt} /> Tài liệu & Upload
              </button>
              <button 
                className={activeCategory === 'download' ? 'active' : ''}
                onClick={() => handleCategoryChange('download')}
              >
                <FontAwesomeIcon icon={faDownload} /> Tải tài liệu
              </button>
              <button 
                className={activeCategory === 'privacy' ? 'active' : ''}
                onClick={() => handleCategoryChange('privacy')}
              >
                <FontAwesomeIcon icon={faLock} /> Bảo mật & Quyền riêng tư
              </button>
            </div>

            {activeCategory === 'general' && (
              <div className="faq-category-content">
                <h2>Thông tin chung</h2>
                
                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['general-1'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('general-1')}
                  >
                    <span>TTCS Doc là gì?</span>
                    <FontAwesomeIcon icon={openQuestions['general-1'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['general-1'] && (
                    <div className="faq-answer">
                      <p>TTCS Doc là nền tảng chia sẻ tài liệu trực tuyến phi lợi nhuận với kho tàng hơn 10 triệu tài liệu đa dạng về thể loại và nội dung. Chúng tôi cung cấp dịch vụ tìm kiếm và tải tài liệu miễn phí, đóng góp vào việc chia sẻ kiến thức trong cộng đồng.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['general-2'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('general-2')}
                  >
                    <span>Làm thế nào để sử dụng TTCS Doc?</span>
                    <FontAwesomeIcon icon={openQuestions['general-2'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['general-2'] && (
                    <div className="faq-answer">
                      <p>Để sử dụng TTCS Doc, bạn chỉ cần:</p>
                      <ol>
                        <li>Truy cập vào website của chúng tôi</li>
                        <li>Tìm kiếm tài liệu bạn cần thông qua công cụ tìm kiếm</li>
                        <li>Đăng ký tài khoản (nếu chưa có) để tải tài liệu</li>
                        <li>Tải về tài liệu bạn cần</li>
                      </ol>
                      <p>TTCS Doc còn cung cấp nhiều tính năng khác như đánh dấu tài liệu yêu thích, chia sẻ tài liệu, đóng góp tài liệu mới, v.v.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['general-3'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('general-3')}
                  >
                    <span>TTCS Doc có tính phí không?</span>
                    <FontAwesomeIcon icon={openQuestions['general-3'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['general-3'] && (
                    <div className="faq-answer">
                      <p>TTCS Doc cung cấp cả dịch vụ miễn phí và có phí:</p>
                      <ul>
                        <li><strong>Miễn phí:</strong> Tìm kiếm tài liệu, xem trước tài liệu, tải một số lượng nhất định mỗi ngày.</li>
                        <li><strong>Có phí:</strong> Gói thành viên cao cấp với các đặc quyền như không giới hạn lượt tải, truy cập nội dung độc quyền, không hiển thị quảng cáo, v.v.</li>
                      </ul>
                      <p>Chúng tôi luôn cố gắng duy trì cân bằng giữa việc cung cấp dịch vụ miễn phí chất lượng và đảm bảo sự phát triển bền vững của nền tảng.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['general-4'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('general-4')}
                  >
                    <span>Làm thế nào để liên hệ với đội hỗ trợ?</span>
                    <FontAwesomeIcon icon={openQuestions['general-4'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['general-4'] && (
                    <div className="faq-answer">
                      <p>Bạn có thể liên hệ với đội ngũ hỗ trợ của TTCS Doc qua các kênh sau:</p>
                      <ul>
                        <li><strong>Email:</strong> support@ttcsdoc.vn</li>
                        <li><strong>Hotline:</strong> (024) 7300 1955 (8:00 - 17:30, từ Thứ Hai đến Thứ Sáu)</li>
                        <li><strong>Mẫu liên hệ:</strong> Trong mục "Liên hệ" trên trang web</li>
                        <li><strong>Fanpage:</strong> Facebook.com/TTCSDoc</li>
                      </ul>
                      <p>Thời gian phản hồi thông thường là trong vòng 24 giờ làm việc.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === 'account' && (
              <div className="faq-category-content">
                <h2>Tài khoản & Đăng ký</h2>
                
                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['account-1'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('account-1')}
                  >
                    <span>Làm thế nào để đăng ký tài khoản?</span>
                    <FontAwesomeIcon icon={openQuestions['account-1'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['account-1'] && (
                    <div className="faq-answer">
                      <p>Để đăng ký tài khoản trên TTCS Doc, bạn có thể thực hiện theo các bước sau:</p>
                      <ol>
                        <li>Nhấp vào nút "Đăng ký" trên thanh điều hướng</li>
                        <li>Điền thông tin cá nhân (họ tên, email, mật khẩu)</li>
                        <li>Đồng ý với Điều khoản sử dụng và Chính sách bảo mật</li>
                        <li>Nhấp vào nút "Đăng ký"</li>
                        <li>Xác nhận email thông qua liên kết gửi đến địa chỉ email của bạn</li>
                      </ol>
                      <p>Bạn cũng có thể đăng ký nhanh bằng tài khoản Google hoặc Facebook.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['account-2'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('account-2')}
                  >
                    <span>Tôi quên mật khẩu, phải làm sao?</span>
                    <FontAwesomeIcon icon={openQuestions['account-2'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['account-2'] && (
                    <div className="faq-answer">
                      <p>Nếu bạn quên mật khẩu, hãy làm theo các bước sau để khôi phục:</p>
                      <ol>
                        <li>Nhấp vào liên kết "Quên mật khẩu" trên trang đăng nhập</li>
                        <li>Nhập địa chỉ email đã đăng ký tài khoản</li>
                        <li>Kiểm tra hộp thư email và làm theo hướng dẫn để đặt lại mật khẩu</li>
                      </ol>
                      <p>Liên kết đặt lại mật khẩu có hiệu lực trong vòng 24 giờ. Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc liên hệ với bộ phận hỗ trợ.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['account-3'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('account-3')}
                  >
                    <span>Làm thế nào để nâng cấp lên tài khoản VIP?</span>
                    <FontAwesomeIcon icon={openQuestions['account-3'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['account-3'] && (
                    <div className="faq-answer">
                      <p>Để nâng cấp lên tài khoản VIP, bạn có thể thực hiện theo các bước sau:</p>
                      <ol>
                        <li>Đăng nhập vào tài khoản của bạn</li>
                        <li>Truy cập vào mục "Tài khoản" trên thanh điều hướng</li>
                        <li>Chọn "Nâng cấp tài khoản"</li>
                        <li>Lựa chọn gói VIP phù hợp với nhu cầu của bạn</li>
                        <li>Tiến hành thanh toán qua các phương thức được hỗ trợ</li>
                      </ol>
                      <p>Tài khoản của bạn sẽ được nâng cấp ngay sau khi thanh toán thành công. Nếu bạn gặp vấn đề trong quá trình nâng cấp, vui lòng liên hệ với bộ phận hỗ trợ để được giúp đỡ.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['account-4'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('account-4')}
                  >
                    <span>Tôi muốn hủy tài khoản VIP, phải làm thế nào?</span>
                    <FontAwesomeIcon icon={openQuestions['account-4'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['account-4'] && (
                    <div className="faq-answer">
                      <p>Để hủy tài khoản VIP, bạn cần thực hiện các bước sau:</p>
                      <ol>
                        <li>Đăng nhập vào tài khoản của bạn</li>
                        <li>Truy cập vào mục "Tài khoản" → "Quản lý gói VIP"</li>
                        <li>Chọn "Hủy đăng ký tự động"</li>
                        <li>Xác nhận việc hủy đăng ký</li>
                      </ol>
                      <p>Lưu ý:</p>
                      <ul>
                        <li>Việc hủy đăng ký sẽ có hiệu lực khi kết thúc chu kỳ thanh toán hiện tại</li>
                        <li>Bạn vẫn có thể tiếp tục sử dụng các tính năng VIP cho đến khi hết hạn</li>
                        <li>Không có hoàn tiền cho thời gian chưa sử dụng của gói VIP</li>
                      </ul>
                      <p>Nếu có bất kỳ câu hỏi nào về việc hủy đăng ký, vui lòng liên hệ với chúng tôi qua email: support@ttcsdoc.vn</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === 'documents' && (
              <div className="faq-category-content">
                <h2>Tài liệu & Upload</h2>
                
                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['documents-1'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('documents-1')}
                  >
                    <span>Làm thế nào để đóng góp tài liệu?</span>
                    <FontAwesomeIcon icon={openQuestions['documents-1'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['documents-1'] && (
                    <div className="faq-answer">
                      <p>Để đóng góp tài liệu lên TTCS Doc, bạn cần thực hiện các bước sau:</p>
                      <ol>
                        <li>Đăng nhập vào tài khoản của bạn</li>
                        <li>Nhấp vào nút "Đăng tài liệu" trên thanh điều hướng</li>
                        <li>Điền đầy đủ thông tin về tài liệu (tiêu đề, mô tả, danh mục, từ khóa...)</li>
                        <li>Tải tệp tài liệu lên (định dạng hỗ trợ: PDF, DOC, PPT, XLS...)</li>
                        <li>Chọn quyền riêng tư và giấy phép sử dụng cho tài liệu</li>
                        <li>Nhấp vào nút "Đăng tải"</li>
                      </ol>
                      <p>Tài liệu của bạn sẽ được đội ngũ quản trị viên xem xét trước khi xuất hiện công khai trên trang web. Quá trình này có thể mất từ 1-3 ngày làm việc.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['documents-2'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('documents-2')}
                  >
                    <span>TTCS Doc chấp nhận những định dạng tài liệu nào?</span>
                    <FontAwesomeIcon icon={openQuestions['documents-2'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['documents-2'] && (
                    <div className="faq-answer">
                      <p>TTCS Doc chấp nhận nhiều định dạng tài liệu khác nhau, bao gồm:</p>
                      <ul>
                        <li><strong>Văn bản:</strong> PDF, DOC, DOCX, RTF, TXT</li>
                        <li><strong>Bảng tính:</strong> XLS, XLSX, CSV</li>
                        <li><strong>Trình chiếu:</strong> PPT, PPTX</li>
                        <li><strong>Hình ảnh:</strong> JPG, PNG, GIF (trong trường hợp tài liệu dạng infographic)</li>
                        <li><strong>Khác:</strong> ZIP (với điều kiện bên trong chứa các định dạng được hỗ trợ)</li>
                      </ul>
                      <p>Giới hạn kích thước file là 100MB cho người dùng thường và 500MB cho người dùng VIP.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['documents-3'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('documents-3')}
                  >
                    <span>Tôi có thể chỉnh sửa hoặc xóa tài liệu đã đăng không?</span>
                    <FontAwesomeIcon icon={openQuestions['documents-3'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['documents-3'] && (
                    <div className="faq-answer">
                      <p>Có, bạn có thể chỉnh sửa hoặc xóa tài liệu đã đăng lên TTCS Doc:</p>
                      <ul>
                        <li><strong>Chỉnh sửa tài liệu:</strong> Truy cập vào trang "Quản lý tài liệu" trong phần tài khoản của bạn, tìm tài liệu cần chỉnh sửa và nhấp vào nút "Chỉnh sửa". Bạn có thể cập nhật thông tin mô tả, danh mục, từ khóa, nhưng không thể thay thế tệp tài liệu đã đăng.</li>
                        <li><strong>Xóa tài liệu:</strong> Truy cập vào trang "Quản lý tài liệu", tìm tài liệu cần xóa và nhấp vào nút "Xóa". Hệ thống sẽ yêu cầu xác nhận trước khi xóa vĩnh viễn.</li>
                      </ul>
                      <p>Lưu ý: Nếu tài liệu đã có người tải về, việc xóa tài liệu sẽ không xóa các bản sao đã được tải về trước đó.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['documents-4'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('documents-4')}
                  >
                    <span>Tôi có được hưởng lợi khi đóng góp tài liệu không?</span>
                    <FontAwesomeIcon icon={openQuestions['documents-4'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['documents-4'] && (
                    <div className="faq-answer">
                      <p>Có, khi bạn đóng góp tài liệu lên TTCS Doc, bạn sẽ nhận được các lợi ích sau:</p>
                      <ul>
                        <li><strong>Điểm thưởng:</strong> Mỗi tài liệu được duyệt sẽ nhận được từ 5-20 điểm tùy vào chất lượng và độ đặc thù của tài liệu</li>
                        <li><strong>Mở khóa tính năng:</strong> Tích lũy đủ điểm có thể đổi lấy các đặc quyền như lượt tải thêm, mở khóa tài liệu VIP</li>
                        <li><strong>Nâng cấp tài khoản:</strong> Người dùng tích cực đóng góp có thể được nâng cấp lên tài khoản VIP miễn phí</li>
                        <li><strong>Ghi nhận tên tác giả:</strong> Tên của bạn sẽ xuất hiện cùng với tài liệu, giúp xây dựng danh tiếng trong cộng đồng</li>
                      </ul>
                      <p>Chương trình "Cộng tác viên nổi bật" hàng tháng cũng trao thưởng cho những người đóng góp tài liệu chất lượng cao và được nhiều người tải về.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === 'download' && (
              <div className="faq-category-content">
                <h2>Tải tài liệu</h2>
                
                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['download-1'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('download-1')}
                  >
                    <span>Tôi có thể tải bao nhiêu tài liệu mỗi ngày?</span>
                    <FontAwesomeIcon icon={openQuestions['download-1'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['download-1'] && (
                    <div className="faq-answer">
                      <p>Số lượng tài liệu bạn có thể tải mỗi ngày phụ thuộc vào loại tài khoản:</p>
                      <ul>
                        <li><strong>Tài khoản thường:</strong> 5 tài liệu miễn phí mỗi ngày</li>
                        <li><strong>Tài khoản VIP Bạc:</strong> 20 tài liệu mỗi ngày</li>
                        <li><strong>Tài khoản VIP Vàng:</strong> 50 tài liệu mỗi ngày</li>
                        <li><strong>Tài khoản VIP Bạch kim:</strong> Không giới hạn</li>
                      </ul>
                      <p>Lưu ý: Số lượt tải được làm mới vào lúc 0h mỗi ngày (theo múi giờ Việt Nam).</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['download-2'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('download-2')}
                  >
                    <span>Tại sao tôi không thể tải một số tài liệu?</span>
                    <FontAwesomeIcon icon={openQuestions['download-2'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['download-2'] && (
                    <div className="faq-answer">
                      <p>Có thể có nhiều lý do khiến bạn không thể tải một số tài liệu:</p>
                      <ul>
                        <li><strong>Tài liệu chỉ dành cho VIP:</strong> Một số tài liệu đặc biệt chỉ có thể truy cập bởi người dùng VIP</li>
                        <li><strong>Đã hết lượt tải trong ngày:</strong> Bạn đã sử dụng hết số lượt tải theo giới hạn của tài khoản</li>
                        <li><strong>Vấn đề kỹ thuật:</strong> Tệp tài liệu có thể bị lỗi hoặc đang được bảo trì</li>
                        <li><strong>Tài liệu đã bị xóa:</strong> Tài liệu đã bị gỡ bỏ do vi phạm điều khoản sử dụng hoặc yêu cầu từ tác giả</li>
                        <li><strong>Hạn chế địa lý:</strong> Một số tài liệu có thể bị hạn chế ở một số quốc gia vì lý do bản quyền</li>
                      </ul>
                      <p>Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ với bộ phận hỗ trợ với ID tài liệu và mô tả vấn đề.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['download-3'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('download-3')}
                  >
                    <span>Làm thế nào để nhận thêm lượt tải?</span>
                    <FontAwesomeIcon icon={openQuestions['download-3'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['download-3'] && (
                    <div className="faq-answer">
                      <p>Bạn có thể nhận thêm lượt tải theo nhiều cách:</p>
                      <ul>
                        <li><strong>Nâng cấp tài khoản:</strong> Đăng ký gói VIP để được nhiều lượt tải hơn mỗi ngày</li>
                        <li><strong>Đóng góp tài liệu:</strong> Mỗi tài liệu được duyệt sẽ nhận được thêm lượt tải</li>
                        <li><strong>Hoàn thành nhiệm vụ:</strong> Tham gia các hoạt động như đánh giá tài liệu, chia sẻ trên mạng xã hội...</li>
                        <li><strong>Mời bạn bè:</strong> Nhận thưởng khi giới thiệu bạn bè đăng ký tài khoản mới</li>
                        <li><strong>Điểm thưởng:</strong> Sử dụng điểm thưởng tích lũy để đổi lấy lượt tải</li>
                      </ul>
                      <p>Bạn có thể theo dõi số lượt tải còn lại trong phần "Tài khoản" trên trang cá nhân của mình.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['download-4'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('download-4')}
                  >
                    <span>Tài liệu tôi tải về bị lỗi, làm thế nào để khắc phục?</span>
                    <FontAwesomeIcon icon={openQuestions['download-4'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['download-4'] && (
                    <div className="faq-answer">
                      <p>Nếu tài liệu bạn tải về bị lỗi, vui lòng thực hiện các bước sau:</p>
                      <ol>
                        <li>Kiểm tra xem bạn đã có phần mềm phù hợp để mở tài liệu (Adobe Reader cho PDF, Microsoft Office hoặc tương đương cho DOC, XLS, PPT)</li>
                        <li>Thử tải lại tài liệu một lần nữa</li>
                        <li>Xóa cache trình duyệt và cookies, sau đó thử lại</li>
                        <li>Sử dụng trình duyệt khác để tải</li>
                      </ol>
                      <p>Nếu vấn đề vẫn tồn tại, vui lòng báo cáo lỗi bằng cách:</p>
                      <ul>
                        <li>Nhấp vào nút "Báo cáo lỗi" trên trang tài liệu</li>
                        <li>Gửi email đến support@ttcsdoc.vn với tiêu đề "Tài liệu lỗi - [ID tài liệu]"</li>
                      </ul>
                      <p>Chúng tôi sẽ kiểm tra và khắc phục sớm nhất có thể, đồng thời hoàn lại lượt tải cho bạn nếu xác nhận là lỗi từ hệ thống.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === 'privacy' && (
              <div className="faq-category-content">
                <h2>Bảo mật & Quyền riêng tư</h2>
                
                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['privacy-1'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('privacy-1')}
                  >
                    <span>TTCS Doc xử lý dữ liệu cá nhân của tôi như thế nào?</span>
                    <FontAwesomeIcon icon={openQuestions['privacy-1'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['privacy-1'] && (
                    <div className="faq-answer">
                      <p>TTCS Doc cam kết bảo vệ dữ liệu cá nhân của người dùng và xử lý theo các nguyên tắc sau:</p>
                      <ul>
                        <li>Chỉ thu thập thông tin cần thiết để vận hành dịch vụ và cải thiện trải nghiệm người dùng</li>
                        <li>Không chia sẻ thông tin cá nhân với bên thứ ba mà không có sự đồng ý của người dùng (trừ trường hợp yêu cầu của pháp luật)</li>
                        <li>Bảo vệ dữ liệu bằng các biện pháp mã hóa và bảo mật hiện đại</li>
                        <li>Chỉ lưu trữ dữ liệu trong thời gian cần thiết và phù hợp với quy định pháp luật</li>
                      </ul>
                      <p>Bạn có thể đọc chi tiết về cách chúng tôi xử lý dữ liệu trong <a href="#">Chính sách Bảo mật</a> của TTCS Doc.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['privacy-2'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('privacy-2')}
                  >
                    <span>Làm thế nào để kiểm soát quyền riêng tư của tôi?</span>
                    <FontAwesomeIcon icon={openQuestions['privacy-2'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['privacy-2'] && (
                    <div className="faq-answer">
                      <p>Bạn có thể kiểm soát quyền riêng tư của mình trên TTCS Doc thông qua các tùy chọn sau:</p>
                      <ul>
                        <li><strong>Cài đặt tài khoản:</strong> Truy cập vào "Tài khoản" → "Quyền riêng tư" để điều chỉnh thông tin hiển thị với người dùng khác</li>
                        <li><strong>Tùy chọn thông báo:</strong> Tùy chỉnh loại thông báo bạn muốn nhận qua email hoặc trên trang web</li>
                        <li><strong>Lịch sử hoạt động:</strong> Xem và xóa lịch sử tìm kiếm, tài liệu đã xem gần đây</li>
                        <li><strong>Cookie và dữ liệu duyệt web:</strong> Quản lý các tùy chọn cookie trong phần cài đặt</li>
                      </ul>
                      <p>Bạn cũng có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình theo quy định của pháp luật hiện hành.</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['privacy-3'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('privacy-3')}
                  >
                    <span>TTCS Doc đảm bảo bản quyền tài liệu như thế nào?</span>
                    <FontAwesomeIcon icon={openQuestions['privacy-3'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['privacy-3'] && (
                    <div className="faq-answer">
                      <p>TTCS Doc nghiêm túc trong việc tôn trọng quyền sở hữu trí tuệ và thực hiện các biện pháp sau để đảm bảo bản quyền:</p>
                      <ul>
                        <li>Kiểm duyệt tài liệu được đăng tải để đảm bảo tuân thủ quy định bản quyền</li>
                        <li>Cung cấp hệ thống báo cáo vi phạm bản quyền cho chủ sở hữu</li>
                        <li>Gỡ bỏ nhanh chóng các nội dung vi phạm khi nhận được thông báo hợp lệ</li>
                        <li>Tạm ngừng hoặc chấm dứt tài khoản người dùng vi phạm lặp lại</li>
                      </ul>
                      <p>Nếu bạn là chủ sở hữu bản quyền và phát hiện nội dung của mình bị sử dụng trái phép, vui lòng gửi thông báo vi phạm bản quyền đến: copyright@ttcsdoc.vn</p>
                    </div>
                  )}
                </div>

                <div className="faq-item">
                  <div 
                    className={`faq-question ${openQuestions['privacy-4'] ? 'active' : ''}`}
                    onClick={() => toggleQuestion('privacy-4')}
                  >
                    <span>Quy định về chia sẻ và sử dụng lại tài liệu của TTCS Doc?</span>
                    <FontAwesomeIcon icon={openQuestions['privacy-4'] ? faMinus : faPlus} />
                  </div>
                  {openQuestions['privacy-4'] && (
                    <div className="faq-answer">
                      <p>Khi sử dụng tài liệu từ TTCS Doc, bạn cần tuân thủ các quy định sau:</p>
                      <ul>
                        <li>Tài liệu được tải về chỉ được sử dụng cho mục đích cá nhân, nghiên cứu hoặc tham khảo</li>
                        <li>Không được phân phối lại, bán, hoặc chia sẻ công khai tài liệu tải từ TTCS Doc mà không được phép</li>
                        <li>Cần trích dẫn nguồn khi sử dụng tài liệu trong công trình học thuật hoặc nghiên cứu</li>
                        <li>Tôn trọng giấy phép sử dụng cụ thể đính kèm với mỗi tài liệu (nếu có)</li>
                      </ul>
                      <p>Một số tài liệu có thể có giấy phép Creative Commons hoặc các điều khoản sử dụng riêng do người đăng tải quy định. Vui lòng đọc kỹ thông tin giấy phép trước khi sử dụng.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="faq-footer">
            <p>Bạn không tìm thấy câu trả lời cho câu hỏi của mình?</p>
            <a href="#" className="contact-support-btn">Liên hệ hỗ trợ</a>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default FrequentlyAskedQuestions;