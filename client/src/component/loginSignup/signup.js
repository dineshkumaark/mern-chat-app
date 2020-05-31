import React, { useState } from "react";
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
   profilePic = "",
   handleSignData,
   isNewUser = false,
}) => {
   const [isLoggedIn, setLoggedIn] = useState(false);

   return (
      <Form onSubmit={handleSubmit}>
         <div className={`login-title mb-4 ${isLoggedIn ? "text-center" : ""}`}>
            <h2>{`${isLoggedIn ? "Upload Profile Picture" : loginTitle}`}</h2>
         </div>
         {true ? (
            <>
               <div className="login-block">
                  <NormalInput
                     type="text"
                     name="firstName"
                     id="firstName"
                     placeholder="Enter First Name"
                     onChange={handleInput}
                     value={formData.firstName}
                  />
                  <NormalInput
                     type="text"
                     name="lastName"
                     id="lastName"
                     placeholder="Enter Last Name"
                     onChange={handleInput}
                     value={formData.lastName}
                  />
                  <NormalInput
                     type="email"
                     name="email"
                     id="exampleEmail"
                     placeholder="Enter Email"
                     onChange={handleInput}
                     value={formData.email}
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
            <>
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
            </>
         )}
         {isLoggedIn && (
            <div className="upload-profilepic mt-4">
               <div className="picture">
                  <img
                     src={
                        profilePic === ""
                           ? require("../../assets/images/default-pro-pic.jpg")
                           : window.URL.createObjectURL(profilePic)
                     }
                  />
               </div>
            </div>
         )}
         {!isLoggedIn && !true ? (
            <>
               <div
                  className={`action-btn mt-5 d-flex flex-wrap align-items-center justify-content-${
                     isOTPSent ? "center" : "between"
                  }`}
               >
                  <button
                     className="btn btn-blue mb-3 mb-md-0"
                     type="submit"
                     onClick={sendOTPCode}
                  >
                     {`${!isOTPSent ? " Send OTP" : "Verify OTP"}`}
                  </button>
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
            </>
         ) : (
            <div
               className={`action-btn mt-5 d-flex flex-wrap align-items-center justify-content-start`}
            >
               <button
                  className="btn btn-blue"
                  // onClick={() => toggle("isSignup")}
                  onClick={(e) => {
                     handleSignData(e);
                     e.stopPropagation();
                  }}
               >
                  SignIn
               </button>
            </div>
         )}
         {isLoggedIn && (
            <>
               {profilePic === "" ? (
                  <div
                     className={`action-btn mt-5 d-flex flex-wrap align-items-center justify-content-center
                  }`}
                  >
                     <div className="position-relative">
                        <button
                           className="btn btn-blue"
                           onClick={() => toggle("isSignup")}
                        >
                           Upload
                        </button>
                        <input
                           type="file"
                           className="custom-file-input"
                           accept=".jpg,.png"
                           name="profilePic"
                           onChange={(e) => handleInput(e, "", true)}
                        />
                     </div>
                     <a className="text-blue ml-4" href="#">
                        Skip
                     </a>
                  </div>
               ) : (
                  <div className="mt-5 d-flex flex-wrap align-items-center justify-content-center">
                     <button
                        className="btn btn-white mr-2"
                        onClick={(e) => handleInput(e, "", true)}
                     >
                        Cancel
                     </button>
                     <button
                        className="btn btn-blue ml-3"
                        onClick={() => toggle("isSignup")}
                     >
                        Save
                     </button>
                  </div>
               )}
            </>
         )}
      </Form>
   );
};
