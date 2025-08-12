import * as request from "~/utils/request";

export const createLibrary = (name, description) => {
  return request.post("/library", {
    name: name,
    description: description,
  });
};

export const getLibraryById = async (id, page = 0, size = 10) => {
  try {
    const response = await request.get(`/library/user/${id}`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllLibraryOfUser = async (page = 0, size = 10) => {
  try {
    const response = await request.get(`/library`, {
      params: {
        page,
        size,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addDocumentToLibrary = async (libId, docId) => {
  try {
    const endpoint = `/library/user/${libId}/${docId}`;

    const response = await request.post(endpoint);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDocumentFromLibrary = async (libId, docId) => {
  try {
    const endpoint = `/library/user/${libId}/${docId}`;

    const response = await request.del(endpoint);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateLibrary = async (libraryId, data) => {
  try {
    const response = await request.put(`/library/${libraryId}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteLibrary = async (libraryId) => {
  try {
    const response = await request.del(`/library/${libraryId}`);

    return response;
  } catch (error) {
    throw error;
  }
}

export const changeStatusDoc = async (libraryId, documentId) => {
   try {
    const response = await request.post(`/library/${libraryId}/${documentId}/status`);

    return response;
  } catch (error) {
    throw error;
  }
}
