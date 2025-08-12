import axios from "axios";

import { getCookie } from "~/helpers/cookie";

const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // timeout: 10000, // 10 seconds timeout
});

// Response interceptor for handling common responses
request.interceptors.response.use(
  (response) => response.data,
);

request.interceptors.request.use(
  (config) => {
    const token = getCookie("token") || localStorage.getItem('token');
    
    if (token) {
      const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      config.headers["Authorization"] = formattedToken;
    } else {
      console.warn("No authentication token available");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (path, params = {}) => {
  try {
    const response = await request.get(path, params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (path, data = {}, config = {}) => {
  try {
    return await request.post(path, data, config);
  } catch (error) {
    throw error;
  }
};

export const put = async (path, data = {}, config = {}) => {
  try {
    return await request.put(path, data, config);
  } catch (error) {
    throw error;
  }
};

export const patch = async (path, data = {}, config = {}) => {
  try {
    return await request.patch(path, data, config);
  } catch (error) {
    throw error;
  }
};

export const del = async (path, config = {}) => {
  try {
    return await request.delete(path, config);
  } catch (error) {
    throw error;
  }
};

export default request;
