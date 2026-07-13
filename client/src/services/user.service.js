// user.service.js

import  updateProfileApi from "../api/user.api.js";

const updateProfile = async (formData) => {
  const response = await updateProfileApi(formData);

  return response.data;
};

export default updateProfile