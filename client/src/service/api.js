import { axiosInstance } from "./utilities";
import { getToken, logout } from "./auth";

export var api = async function (
   { method = "get", api, body, status = false, token = "" },
   config = {}
) {
   return await new Promise((resolve, reject) => {
      // setting token
      axiosInstance.defaults.headers.common["x-access-token"] = getToken()
         ? getToken()
         : "";

      axiosInstance[method](api, body ? body : "", config)
         .then((data) => {
            resolve(statusHelper(status, data));
         })
         .catch((error) => {
            if (error) {
               if (error.response) {
                  reject(statusHelper(status, error.response));
               } else {
                  reject(error);
               }
            } else {
               reject(false);
            }
         });
   });
};

var statusHelper = (status, data) => {
   if (data.status == 401) {
      logout(false);

      let query = {};
   }

   if (status) {
      return {
         status: data.status,
         response: data.data,
      };
   } else {
      return data.data;
   }
};
