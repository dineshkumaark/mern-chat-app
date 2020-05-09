import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: process.env.BASE_URL,
   // timeout: 2000,
   headers: {
      platform: "web",
   },
});
