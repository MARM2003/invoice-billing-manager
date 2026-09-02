// user.service.js

import updateProfileApi, { getProfileAPI, updateUserProfileAPI } from "../api/user.api.js";

const updateProfile = async (formData) => {
  const response = await updateProfileApi(formData);

  return response.data;
};

export const getProfile = async () => {
  const response = await getProfileAPI();

  return response.data
}

export const updateUserProfile = async (data) => {
  const response=await updateUserProfileAPI(data)

  
  return response.data
}

export default updateProfile