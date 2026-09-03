// user.api.js

import api from "./axios";

const updateProfileApi = async (formData) => {
    return api.put("/users/profile", formData);
};

export const getProfileAPI = async () => {
    return api.get("/users/profile")
}

export const updateUserProfileAPI = async (data) => {
    return api.put("/users/user-profile", data)
}

export const updateUserLogoAPI = async (formData) => {
    return api.put("/users/user-logo", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export default updateProfileApi