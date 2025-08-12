import * as request from "~/utils/request";

export const getComments = async (documentId, page = 0, size = 10) => {
  try {
    const response = await request.get(`/comments/${documentId}`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error;
  }
};

export const addComment = async (documentId, data) => {
  try {
    const response = await request.post(`/comments/${documentId}`, data);
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error;
  }
};

export const likeComment = async (documentId, commentId) => {
  try {
    const response = await request.post(
      `/comments/${documentId}/${commentId}/like`
    );
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error;
  }
};

export const replies = async (documentId, commentId, page = 0, size = 10) => {
  try {
    const response = await request.get(
      `/comments/${documentId}/${commentId}/replies`,
      {
        params: {
          page: page,
          size: size,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error;
  }
};

export const deleteComment = async (documentId, commentId) => {
  try {
    const response = await request.del(`/comments/${documentId}/${commentId}`);
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error;
  }
};
