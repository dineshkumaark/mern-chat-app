import React from "react";
import { Form } from "reactstrap";
import { NormalInput } from "component/Input";
import FlagDropDown from "component/FlagDropdown";

export const LoginBlock = ({
   loginTitle,
   handleSubmit,
   handleInput,
   isLoginOTP,
   formData,
   isPassReset,
   toggle,
}) => {
   return (
      <Form onSubmit={handleSubmit}>
         <div className="login-title mb-4">
            <h2>{loginTitle}</h2>
         </div>
         {!isLoginOTP ? (
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
                  {!isPassReset && (
                     <NormalInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={handleInput}
                        value={formData.password}
                     />
                  )}
               </div>
            </>
         ) : (
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
         )}
         {!isPassReset && (
            <div className="d-flex mx-2 align-items-center justify-content-between">
               <p
                  className="text-grey cursor-pointer text-hg-underline"
                  onClick={() => {
                     //  Toast(toast);
                     toggle("isLoginOTP");
                  }}
               >
                  {`Login with ${isLoginOTP ? "Email" : "OTP"}`}
               </p>
               {!isLoginOTP && (
                  <p
                     className="text-blue cursor-pointer text-hg-underline"
                     onClick={() => toggle("isPassReset")}
                  >
                     Reset Password
                  </p>
               )}
            </div>
         )}
         {isPassReset && (
            <p
               onClick={() => toggle("isPassReset")}
               className="text-right cursor-pointer mx-2 text-hg-underline"
            >
               Back
            </p>
         )}
         <div className="action-btn my-5 d-flex flex-wrap align-items-center justify-content-between">
            <button className="btn btn-blue mb-3 mb-md-0" type="submit">
               {!isPassReset ? "Login" : "Send Mail"}
            </button>
            {!isPassReset && (
               <button
                  className="btn btn-white"
                  onClick={() => toggle("isSignup")}
               >
                  Create Account
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
