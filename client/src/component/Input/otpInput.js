import React, { Component } from "react";

export class OTPInput extends Component {
   codeRef;
   constructor(props) {
      super(props);
      this.state = {
         OTPCode: {
            code1: "",
            code2: "",
            code3: "",
            code4: "",
         },
      };

      this.codeRef = [];
   }

   handleCodeInput = (e, index) => {
      const { OTPCode, handleInput } = this.props;
      const { value, name } = e.target;
      if (OTPCode[name] !== "" && value !== "") return;
      if (index < 3 && value !== "") {
         const currentOTPInput = this.codeRef[index + 1];
         currentOTPInput.focus();
      }
      handleInput(e, "OTPCode");
   };

   render() {
      const { OTPCode } = this.props;
      return (
         <div className="custom-otp-input">
            {[...new Array(4)].map((_, index) => (
               <input
                  type="text"
                  id={`code${index + 1}`}
                  key={`code${index + 1}`}
                  name={`code${index + 1}`}
                  className="otp-code-input"
                  value={OTPCode[`code${index + 1}`]}
                  ref={(refs) => this.codeRef.push(refs)}
                  onChange={(e) => this.handleCodeInput(e, index)}
               />
            ))}
         </div>
      );
   }
}
