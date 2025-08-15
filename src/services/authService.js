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

export const register = async (data) => {
  try {
    const res = await request.post(`/users/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendConfirmAccount = (email) => {
  try {
    const res = request.post("/users/sent-confirm-account", { email });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const confirmAccount = (email, otpConfirm) => {
  try {
    const res = request.post("/users/confirm-account", { email, otpConfirm });
    return res;
  } catch (error) {
    console.error(error);
  }
};
