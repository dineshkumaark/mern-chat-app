import React from "react";
import { Form } from "reactstrap";
import { NormalInput } from "component/Input";
import { OTPInput } from "component/Input/otpInput";
import FlagDropDown from "component/FlagDropdown";

export const SignUpBlock = ({
   loginTitle,
   handleSubmit,
   handleInput,
   isLoginOTP,
   formData,
   isPassReset,
   toggle,
   sendOTPCode,
   isOTPSent,
   OTPCode,
}) => {
   return (
      <Form onSubmit={handleSubmit}>
         <div className="login-title mb-4">
            <h2>{loginTitle}</h2>
         </div>
         {!isOTPSent ? (
            <div className="position-relative">
               <NormalInput
                  type="tel"
                  name="phonenum"
                  id="phonenum"
                  placeholder="Enter Number"
                  className="input-phonenum"
                  onChange={handleInput}
                  value={formData.phonenum}
               />
               <FlagDropDown
                  value={formData.phoneCode}
                  onChange={handleInput}
               />
            </div>
         ) : (
            <OTPInput handleInput={handleInput} OTPCode={OTPCode} />
         )}
         {/* {!isLoginOTP ? (
            <>
               <div className="login-block">
                  <NormalInput
                     type="email"
                     name="email"
                     id="exampleEmail"
                     placeholder="Enter Email"
                     onChange={handleInput}
                     value={formData.email}
                  />
                  <NormalInput
                     type="text"
                     name="name"
                     id="exampleEmail"
                     placeholder="Enter Name"
                     onChange={handleInput}
                     value={formData.name}
                  />
                  <NormalInput
                     type="password"
                     name="password"
                     id="password"
                     placeholder="Enter Password"
                     onChange={handleInput}
                     value={formData.password}
                  />
               </div>
            </>
         ) : (
            <NormalInput
               type="tel"
               name="phonenum"
               id="phonenum"
               placeholder="Enter Number"
               onChange={handleInput}
               value={formData.phonenum}
            />
         )}         */}
         <div
            className={`action-btn mt-5 d-flex flex-wrap align-items-center justify-content-${
               isOTPSent ? "center" : "between"
            }`}
         >
            {!isOTPSent && (
               <button
                  className="btn btn-blue mb-3 mb-lg-0"
                  type="submit"
                  onClick={sendOTPCode}
               >
                  Send OTP
               </button>
            )}
            {isOTPSent && (
               <button
                  className="btn btn-blue mb-3 mb-lg-0"
                  type="submit"
                  //    onClick={sendOTPCode}
               >
                  Verify OTP
               </button>
            )}
            {!isOTPSent && (
               <button
                  className="btn btn-white"
                  onClick={() => toggle("isSignup")}
               >
                  Login
               </button>
            )}
         </div>
         <p className="text-grey mt-3">Or you can join with</p>
         <div className="social-media-icon mt-3">
            <img
               className="cursor-pointer"
               src={require("assets/images/logo/google.png")}
               alt="google icon"
            />
         </div>
      </Form>
   );
};
