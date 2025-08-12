import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "~/store/actions/login";
import { decodeToken } from "~/utils/authUtils";
import { setCookie } from "~/helpers/cookie";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setCookie("token", token);
      dispatch(checkLogin(true));
      const userData = decodeToken(token);
      const targetPage = userData.role === "ADMIN" ? "/admin" : "/";
      navigate(targetPage);
    }
  }, [navigate, dispatch]);

  return <div>Đang xử lý đăng nhập...</div>;
}

export default GoogleLogin;
