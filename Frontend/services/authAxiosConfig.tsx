import axios from "axios";
// console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);
const authAxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Request Interceptor to add token dynamically
authAxiosConfig.interceptors.request.use(
  (config) => {
    const getToken = localStorage.getItem("admin-user") || "";
    const parsedToken = JSON.parse(getToken);
    const token = parsedToken?.token || "";

    if (!config.headers) {
      config.headers={};
    }
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxiosConfig;