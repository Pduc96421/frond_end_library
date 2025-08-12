import AllRoute from "./components/ui/AllRoute";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "~/helpers/cookie";
import { checkLogin } from "~/store/actions/login";
import { getUserInfo } from "~/services/usersService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = getCookie("token");

      if (token) {
        try {
          let userData = null;
          const savedUserData = localStorage.getItem("userData");
          if (savedUserData) {
            userData = JSON.parse(savedUserData);
            dispatch(checkLogin(true, userData));
          }

          try {
            const response = await getUserInfo();
            if (response && response.code === 200) {
              userData = response.result;
              localStorage.setItem("userData", JSON.stringify(userData));
              dispatch(checkLogin(true, userData));
            }
          } catch (apiError) {
            console.log("Không lấy được thông tin từ API:", apiError);
          }
        } catch (error) {
          console.error("Lỗi kiểm tra đăng nhập:", error);
        }
      }
    };

    checkUserStatus();
  }, [dispatch]);

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
