import * as request from "~/utils/request";

export const getAllDocuments = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/documents/all-document`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getTags = async () => {
  try {
    const response = await request.get(`/documents/all-tag`);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getTopDocument = async () => {
  try {
    const response = await request.get(`/documents/top-document`);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getDocumentById = async (id) => {
  try {
    const response = await request.get(`/documents/${id}/detail`);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const uploadDocument = async (data) => {
  try {
    const response = await request.post("/documents/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error.response.data.message;
  }
};

export const searchDocument = async (keyword = "", tag = "", page = 0, size = 10) => {
  try {
    const response = await request.get(`/documents/search`, {
      params: {
        keyword: keyword,
        tag: tag,
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateDocument = async (id, data) => {
  try {
    const response = await request.post(`/documents/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error.response.data.message;
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await request.del(`/documents/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error.response.data.message;
  }
};

export const approvedDocument = async (id) => {
  try {
    const response = await request.put(`/documents/${id}/approve`);
    return response;
  } catch (error) {
    console.error("Error approving document:", error);
    throw error.response.data.message;
  }
};

export const rejectedDocument = async (id) => {
  try {
    const response = await request.put(`/documents/${id}/reject`);
    return response;
  } catch (error) {
    console.error("Error rejecting document:", error);
    throw error.response.data.message;
  }
};

export const likeDocument = async (id) => {
  try {
    const response = await request.post(`/documents/${id}/like`);
    return response;
  } catch (error) {
    console.error("Error liking document:", error);
    throw error.response.data.message;
  }
};

export const unlikeDocument = async (id) => {
  try {
    const response = await request.del(`/documents/${id}/like`);
    return response;
  } catch (error) {
    console.error("Error unliking document:", error);
    throw error.response.data.message;
  }
};

export const downloadDocument = async (id) => {
  try {
    const response = await request.get(`/documents/${id}/download`);
    return response;
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error.response.data.message;
  }
};

export const rateDocument = async (id, data) => {
  try {
    const response = await request.post(`/documents/${id}/rate`, data);
    return response;
  } catch (error) {
    console.error("Error rating document:", error);
    throw error.response.data.message;
  }
};

export const createReminder = async (documentId, data) => {
  try {
    const response = await request.post(
      `/reminders/${documentId}`, // Đảm bảo sử dụng đúng documentId
      data,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header đúng
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error creating reminder:", error.response?.data || error.message);
    throw error;
  }
};

export const getMyDocuments = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/documents/user`, {
      params: {
        page,
        size,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error;
  }
};

export const getDocumentsPending = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/documents/pending`, {
      params: {
        page,
        size,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching my documents:", error);
    throw error.response.data.message;
  }
};

export const changeAccess = async (documentId, data) => {
  try {
    const response = await request.post(`/documents/${documentId}/access`, data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getSharedDocuments = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/documents/user/share-document`, {
      params: {
        page,
        size,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching shared documents:", error);
    throw error.response.data.message;
  }
};
