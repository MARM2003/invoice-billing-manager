import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials:true,
});


api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("user");
    
    if (auth) {
      const { accessToken } = JSON.parse(auth);

      if (accessToken) {
        console.log("Access Token:", accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;