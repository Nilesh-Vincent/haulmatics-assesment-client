import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
