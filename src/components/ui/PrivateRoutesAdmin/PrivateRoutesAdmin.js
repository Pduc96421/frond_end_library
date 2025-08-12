import { Navigate, Outlet } from "react-router-dom";

import { getCookie } from "~/helpers/cookie";
import { decodeToken } from "~/utils/authUtils";

function PrivateRoutesAdmin() {
  const token = getCookie("token");
  const userData = decodeToken(token);
  console.log(userData)
  const check = userData.role === "ADMIN";

  return <>{check ? <Outlet /> : <Navigate to={"/admin/auth/login"} />}</>;
}

export default PrivateRoutesAdmin;
