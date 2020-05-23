import React, { useState } from "react";
import { Input, FormGroup } from "reactstrap";

export const NormalInput = ({
   type = "text",
   name = "test",
   status,
   className = "",
   errorText = "",
   ...InputProps
}) => {
   const [showPass, setShowPass] = useState(false);

   let isError;
   if (status === true) {
      isError = "checkmark-circle";
   } else if (status === false) {
      isError = "alert";
   }

   const handlePassword = () => {
      setShowPass(!showPass);
   };

   return (
      <FormGroup className="position-relative custom-input">
         <Input
            type={showPass ? "text" : type}
            name={name}
            className={`chatly-input ${className}`}
            {...InputProps}
         />
         {type === "password" && (
            <i
               className={`icon-${
                  showPass ? "eye" : "eye-off"
               } status-icon cursor-pointer `}
               onClick={handlePassword}
            ></i>
         )}
         {isError && (
            <i
               className={`icon-${isError} status-icon text-${
                  status === true ? "success" : "danger"
               }`}
            ></i>
         )}
         {errorText && <p className="error-text">{errorText}</p>}
      </FormGroup>
   );
};
