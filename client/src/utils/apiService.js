import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

api.defaults.headers.common["Content-Type"] = "application/json";

const handleError = (error) => {
  if (error.response) {
    console.error("Server responded with status:", error.response.status);
    console.error("Response data:", error.response.data);
    toast.error(error.response.data.message);
  } else if (error.request) {
    console.error("Request made but no response received:", error.request);
  } else {
    console.error("Error in setting up request:", error.message);
  }
  throw new Error(error.message);
};

// GET Request function

export const get = async (url, customConfig = {}) => {
  try {
    const token = localStorage.getItem("chatToken");
    const config = {
      headers: {
        Authorization: token ? token : "",
        ...customConfig.headers,
      },
      ...customConfig,
    };
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const postData = async (url, data, customConfig = {}) => {
  try {
    const token = localStorage.getItem("chatToken");

    const config = {
      headers: {
        Authorization: token ? `${token}` : "",
        ...customConfig.headers,
      },
      ...customConfig,
    };

    // Set content type to 'multipart/form-data' only if data is an instance of FormData
    if (data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // Set content type to 'application/json' for regular JSON data
      config.headers["Content-Type"] = "application/json";
    }

    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PUT request function
export const putData = async (url, data, customConfig = {}) => {
  try {
    const token = localStorage.getItem("chatToken");
    const config = {
      headers: {
        Authorization: token ? `${token}` : "",
        ...customConfig.headers,
      },
      ...customConfig,
    };
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PATCH request function
export const patchData = async (url, data, customConfig = {}) => {
  try {
    const token = localStorage.getItem("chatToken");
    const config = {
      headers: {
        Authorization: token ? `${token}` : "",
        ...customConfig.headers,
      },
      ...customConfig,
    };
    const response = await api.patch(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE request function
export const deleteData = async (url, customConfig = {}) => {
  try {
    const token = localStorage.getItem("chatToken");
    const config = {
      headers: {
        Authorization: token ? `${token}` : "",
        ...customConfig.headers,
      },
      ...customConfig,
    };
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
