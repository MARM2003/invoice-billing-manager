import api from "./axios";
import refreshApi from "./refreshApi";
export const registerAPI = (data) => {
  return api.post("/auth/register", data);
};

export const loginAPI = (data) => {
  return api.post("/auth/login", data);
};

export const logoutAPI = () => {
  return api.post("/auth/logout")
}

export const refreshTokenAPI = () => {
  return refreshApi.post("/auth/refresh");
};

