import axios from "axios";
// console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);
const apiClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export default apiClient;