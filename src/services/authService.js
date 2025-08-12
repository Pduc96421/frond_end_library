import { setCookie } from "~/helpers/cookie";
import * as request from "~/utils/request";

export const login = async (username, password) => {
  try {
    const response = await request.post(`/auth/login`, {
      username: username,
      password: password,
    });

    return response;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await request.get("/users/my-info");
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};
