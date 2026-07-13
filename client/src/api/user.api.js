// user.api.js

import api from "./axios";

const updateProfileApi = async (formData) => {
    return api.put("/users/profile", formData);
};

export default updateProfileApi