// user.service.js

import updateProfileApi, { getProfileAPI, updateUserProfileAPI, updateUserLogoAPI } from "../api/user.api.js";

const updateProfile = async (formData) => {
  const response = await updateProfileApi(formData);

  return response.data;
};

export const getProfile = async () => {
  const response = await getProfileAPI();

  return response.data
}

export const updateUserProfile = async (data) => {
  const response = await updateUserProfileAPI(data)


  return response.data
}

export const updateUserLogo = async (formData) => {
  const response = await updateUserLogoAPI(formData);
  console.log(response.data)
  return response.data;
};


export default updateProfile