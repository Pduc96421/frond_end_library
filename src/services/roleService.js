import * as request from "~/utils/request";

export const getRoles = async () => {
  try {
    const response = await request.get("roles");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await request.post("roles", roleData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (name, roleData) => {
  try {
    const response = await request.put(`roles/${name}`, roleData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (name) => {
  try {
    const response = await request.del(`roles/${name}`);
    return response;
  } catch (error) {
    throw error;
  }
};