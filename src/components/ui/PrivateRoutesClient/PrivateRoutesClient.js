import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getCookie } from "~/helpers/cookie";
import { showAlert } from "~/store/actions/alert";

function PrivateRoutesClient() {
  const token = getCookie("token");
  const dispatch = useDispatch();

  if (!token) {
    dispatch(showAlert("Vui lòng đăng nhập", 'error'));
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutesClient;
