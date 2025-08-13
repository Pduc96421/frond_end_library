import { message } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { getCookie } from "~/helpers/cookie";

function PrivateRoutesClient() {
  const token = getCookie("token");

  if (!token) {
    message.error("Bạn cần đăng nhập để truy cập trang này");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutesClient;
