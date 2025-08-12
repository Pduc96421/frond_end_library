import * as request from "~/utils/request";

export const getCategories = async () => {
  try {
    const response = await request.get(`/categories`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await request.post(`/categories`, data);
    if (response.code === 200) {
      return response;
    }
    throw new Error(response.message || "Thêm danh mục thất bại");
  } catch (error) {
    console.error("Add category error:", error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await request.put(`/categories/${id}`, data);
    if (response.code === 200) {
      return response;
    }
    throw new Error(response.message || "Cập nhật danh mục thất bại");
  } catch (error) {
    console.error("Update category error:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await request.del(`/categories/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchCategory = async (keyword) => {
  try {
    const response = await request.get(`/categories/search`, {
      params: {
        keyword: keyword,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryDocument = async (categoryId, page, size) => {
  try {
    const response = await request.get(`/categories/${categoryId}/documents`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await request.get(`/categories/${categoryId}/detail`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
