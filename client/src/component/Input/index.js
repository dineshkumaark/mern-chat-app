import React from "react";
import { Input, FormGroup } from "reactstrap";

export const NormalInput = ({
   type = "text",
   name = "test",
   status = false,
   errorText = "",
   ...InputProps
}) => {
   return (
      <FormGroup className="position-relative custom-input">
         <Input
            type={type}
            name={name}
            className="chatly-input"
            {...InputProps}
         />
         {status && <span className="status-icon"></span>}
         {errorText && <p className="error-text">{errorText}</p>}
      </FormGroup>
   );
};
