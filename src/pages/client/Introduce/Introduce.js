import classNames from 'classnames/bind';
import styles from './Introduce.module.scss';
import { Button } from 'antd';
import { useState } from 'react';
import RegisterModal from '~/pages/client/Register/RegisterModal';
import LoginModal from '~/pages/client/Login/LoginModal';
import ForgotPasswordModal from '~/pages/client/forgotPassword/ForgotPasswordModel';

const cx = classNames.bind(styles);

function Introduce() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const handleOpenRegister = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false);
        setShowForgotPasswordModal(false);
    };

    const handleOpenLogin = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
        setShowForgotPasswordModal(false);
    };

    const handleOpenForgotPassword = () => {
        setShowForgotPasswordModal(true);
        setShowLoginModal(false);
        setShowRegisterModal(false);
    };

    return (
        <div className={cx('introduce')}>
            <div className={cx('hero-section')}>
                <div className={cx('content')}>
                    <h1>Đến với thế giới tri thức</h1>
                    <Button 
                        type="primary" 
                        className={cx('register-btn')}
                        onClick={handleOpenRegister}
                    >
                        Đăng ký để tải tài liệu
                    </Button>
                </div>
                <div className={cx('illustration-center')}>
                    <img src="https://static-2.store123doc.com/image/intro-header.png" alt="header" />
                </div>
            </div>
            
            <div className={cx('why-section')}>
                <div className={cx('illustration-right')}>
                    <img src="https://static-2.store123doc.com/image/intro-light.png" alt="light" />
                </div>
                
                <div className={cx('why-content')}>
                    <h2>TẠI SAO BẠN NÊN SỬ DỤNG THƯ VIỆN SỐ</h2>
                    <p>
                        Đây là thư viện số được thiết kế để giúp các tác giả dễ dàng xuất bản và chia sẻ các ấn phẩm tài liệu nghiên cứu của mình tới hàng triệu độc giả trên toàn cầu.
                    </p>
                </div>
            </div>
            <div className={cx('illustration-container')}>
                <div className={cx('illustration-left')}>
                    <img src="https://static-2.store123doc.com/image/intro-vector.png" alt="vector" />
                </div>
                <div className={cx('why-content')}>
                    <h2>Tiếp cận kho tri thức gần 4 triệu tài liệu</h2>
                    <p>
                        Hàng ngàn tài liệu của các chuyên ngành phục vụ cho công tác nghiên cứu và làm việc của bạn. và con số này không ngừng tăng lên
                    </p>
                </div>
            </div>
            <div className={cx('illustration-container')}>
                <div className={cx('book-illustration')}>
                    <img src="https://static-2.store123doc.com/image/intro-nao.png" alt="book" />
                </div>
                <div className={cx('why-content')}>
                    <h2>Trở thành tác giả tiếp cận tới 10 triệu độc giả</h2>
                    <p>
                        Bằng việc xuất bản và chia sẻ ấn phẩm lên đây, bạn có thể tiếp cận tới 10 triệu độc giả hàng tháng và con số này không ngừng gia tăng và mở rộng ra toàn thế giới
                    </p>
                </div>
            </div>

            <RegisterModal
                open={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onLogin={handleOpenLogin}
            />

            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onRegister={handleOpenRegister}
                onForgotPassword={handleOpenForgotPassword}
            />

            <ForgotPasswordModal
                open={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
                onLogin={handleOpenLogin}
            />
        </div>
    );
}

export default Introduce;