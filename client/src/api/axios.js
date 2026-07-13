import axios from "axios";
import { refreshTokenAPI } from "./auth.api";
import { getAccessToken, setAccessToken, clearAuth } from "../utils/tokenStorage";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Safety check
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest.headers?.Authorization &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await refreshTokenAPI();

        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token expired or invalid.");

        clearAuth();

        toast.error("Session expired. Please login again.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;