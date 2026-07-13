//importing the auth API's
import { registerAPI, loginAPI, logoutAPI } from "../api/auth.api";


//register user service
export const registerUser = async (userData) => {
  const response = await registerAPI(userData);

  return response.data;
};

//login user service
export const loginUser = async (userData) => {
  const response = await loginAPI(userData);

  return response.data;
};

//logout user service
export const logoutUser = async () => {
  const response = await logoutAPI();
}
