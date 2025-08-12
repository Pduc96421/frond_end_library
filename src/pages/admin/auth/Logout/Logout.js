import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteCookie } from "~/helpers/cookie";
import { checkLogin } from "~/store/actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteCookie("token");
    dispatch(checkLogin(false));
    navigate("/");
  }, [dispatch, navigate]);

  return <></>;
}

export default Logout;
