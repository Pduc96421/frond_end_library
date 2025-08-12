import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
  return (
    <div className="page-404">
      <div className="content-404">
        <h1 className="error-code">404</h1>
        <div className="error-message">
          <h2> Trang này không tìm thấy </h2>
          <p>Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
          <Link to="/" className="home-button">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
