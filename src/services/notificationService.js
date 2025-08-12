import * as request from "~/utils/request";

export const getNotifications = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/notifications`, {
      params: {
        page: page,
        size: size,
      },
    });

    return response;
  } catch (error) {
    console.error("Add category error:", error);
    throw error;
  }
};
