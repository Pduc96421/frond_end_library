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
    // Debug
    // console.log(`Updating user ${id} with:`, data);

    // Đảm bảo các headers được đặt đúng để xử lý FormData
    const response = await request.put(`users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log('Update response:', response);
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
    // Đảm bảo có token xác thực
    const token = getCookie("token") || localStorage.getItem('token');
    if (!token) {
      throw new Error("Không có token xác thực");
    }
    
    // Gọi API với headers đúng
    const response = await request.put('/users/change-password', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response;
  } catch (error) {
    console.error("Lỗi API đổi mật khẩu:", error.message);
    if (error.response) {
      console.error("Phản hồi từ server:", {
        status: error.response.status,
        data: error.response.data
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
