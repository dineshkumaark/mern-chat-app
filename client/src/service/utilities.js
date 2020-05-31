import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: "http://localhost:5005",
   // timeout: 2000,
   // headers: {
   //    platform: "web",
   // },
});
