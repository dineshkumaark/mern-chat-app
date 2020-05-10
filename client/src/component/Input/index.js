import React from "react";
import { Input } from "reactstrap";

export const NormalInput = ({
   type = "text",
   name = "test",
   ...InputProps
}) => {
   return (
      <Input type={type} name={name} className="chatly-input" {...InputProps} />
   );
};
