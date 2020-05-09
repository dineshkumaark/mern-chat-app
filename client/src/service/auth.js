import cookie from "js-cookie";
import { axiosInstance } from "./utilities";

export const login = async ({ token }) => {
   cookie.set("token", token, { expires: 1, sameSite: "lax" });

   if (token) {
      axiosInstance.defaults.headers.common["x-access-token"] = token;
   }
};

export const logout = (redirect = true) => {
   cookie.remove("token");

   axiosInstance.defaults.headers.common["x-access-token"] = null;

   // to support logging out from all windows
};

export const getToken = () => {
   return cookie.get("token") ? cookie.get("token") : null;
};
