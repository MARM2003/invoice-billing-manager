import api from "./axios";

export const registerAPI = (data) => {
  return api.post("/auth/register", data);
};

export const loginAPI = (data) => {
  return api.post("/auth/login", data);
};

