import { getCookie } from "~/helpers/cookie";
import * as request from "~/utils/request";

// Get Users list with pagination
export const getUsers = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`users`, {
      params: {
        page,
        size,
      },
    });
    return response; // Return pagination result from API
  } catch (error) {
    throw error;
  }
};

// Get user details by ID
export const getUserById = async (userId) => {
  try {
    const response = await request.get(`users/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update user
export const updateUser = async (id, data) => {
  try {
    const response = await request.put(`users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await request.del(`users/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Lock/Unlock user
export const toggleUserStatus = async (id, status) => {
  try {
    const response = await request.patch(`users/${id}/status`, { status });
    return response;
  } catch (error) {
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

// Change password
export const changePassword = async (data) => {
  try {
    const token = getCookie("token") || localStorage.getItem("token");
    if (!token) {
      throw new Error("Không có token xác thực");
    }

    const response = await request.put("/users/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi API đổi mật khẩu:", error.message);
    if (error.response) {
      console.error("Phản hồi từ server:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    throw error;
  }
};

export const searchUsers = async (keyword, page = 0, size = 10) => {
  try {
    const response = await request.get(`/users/search`, {
      params: {
        keyword: keyword,
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestForgotPasswordOTP = async (email) => {
  try {
    const response = await request.post("/users/forgot-password", { email });
    return response;
  } catch (error) {
    console.error("Lỗi gửi OTP quên mật khẩu:", error.message);
    throw error;
  }
};

// Verify OTP and get new password
export const verifyForgotPasswordOTP = async (data) => {
  try {
    const response = await request.post("/users/verify-forgot-password", data);
    return response;
  } catch (error) {
    console.error("Lỗi xác thực OTP:", error.message);
    if (error.response) {
      console.error("Phản hồi từ server:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    throw error;
  }
};
