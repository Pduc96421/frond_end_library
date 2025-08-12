import * as request from "~/utils/request";

export const createReminder = async (documentId, data) => {
  try {
    const response = await request.post(
      `/reminders/${documentId}`, // Đảm bảo sử dụng đúng documentId
      data,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header đúng
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating reminder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllReminder = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/reminders`, {
      params: {
        page: page,
        size: size,
      },
    });
    
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error;
  }
};

export const toggleReminder = async (reminderId) => {
  try {
    const response = await request.put(`/reminders/${reminderId}/toggle`);
    
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error;
  }
}

export const updateReminder = async (reminderId, data) => {
  try {
    const response = await request.put(`/reminders/${reminderId}`, data);
    
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error;
  }
}

export const deleteReminder = async (reminderId) => {
  try {
    const response = await request.del(`/reminders/${reminderId}`);
    
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error;
  }
}