import { registerAPI,loginAPI } from "../api/auth.api";

export const registerUser = async (userData) => {
  const response = await registerAPI(userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await loginAPI(userData);

  return response.data;
};

