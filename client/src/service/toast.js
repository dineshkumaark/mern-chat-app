import { toast } from "react-toastify";

export const Toast = ({ type = "success", message }) => {
   toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
   });
};
