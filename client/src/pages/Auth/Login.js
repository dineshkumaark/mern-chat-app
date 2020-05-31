import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast } from "../../service/toast";
import { bindActionCreators } from "redux";
import { getHomePageDetails } from "action/home";
import { ReactComponent as MediumLogo } from "../../assets/images/logo/medium-logo.svg";
import { Form, FormGroup } from "reactstrap";
import { NormalInput } from "../../component/Input/index";
import { AnimatedLogo } from "component/logo";
import { LoginBlock, SignUpBlock } from "../../component/loginSignup";
import { api } from "service/api";
import { auth } from "service/apiVariables";
import { login, getToken } from "service/auth";

export class LoginClass extends Component {
   state = {
      isLoaded: false,
      isLoginOTP: false,
      isSignup: false,
      isPassReset: false,
      isOTPSent: false,
      formData: {
         firstName: "",
         lastName: "",
         phonenum: "7402122488",
         email: "",
         password: "",
         phoneCode: "+91",
      },
      OTPCode: {
         code1: "",
         code2: "",
         code3: "",
         code4: "",
      },
      isNewUser: false,
      profilePic: "",
   };

   componentDidMount() {
      this.props.getHomePageDetails();

      if (getToken()) {
         this.props.history.push("/dashboard");
      }

      setTimeout(() => {
         this.setState({
            isLoaded: true,
         });
      }, 8000);
   }

   resetData = () => {
      const formData = {
         name: "",
         phonenum: "",
         email: "",
         password: "",
         phoneCode: "",
      };
      this.setState({ formData });
   };

   handleInput = (
      { target: { name, value, files = [] } },
      lastvar = "",
      isFile = false
   ) => {
      const { formData, OTPCode } = this.state;
      if (lastvar !== "") {
         OTPCode[name] = value;
         this.setState({
            OTPCode,
         });
      } else {
         if (!isFile) {
            formData[name] = value;
            this.setState({
               formData,
            });
         } else {
            console.log(name, files);

            this.setState({
               profilePic: files[0],
            });
         }
      }
   };

   toggle = (name) => {
      this.setState({
         [name]: !this.state[name],
      });
   };

   sendOTPCode = (e) => {
      this.handleSubmit(e);
      this.toggle("isOTPSent");
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const {
         isSignup,
         formData: { password, phonenum, email, phoneCode },
         isLoginOTP,
         isOTPSent,
         OTPCode: { code1, code2, code3, code4 },
      } = this.state;
      let payload = {};

      const { loginWithEmail, signInWithPhone, verifyOTPCode } = auth;

      let apiData;

      if (!isSignup) {
         loginWithEmail.body = {
            email,
            password,
         };

         apiData = loginWithEmail;
      } else {
         if (isOTPSent) {
            verifyOTPCode.body = {
               phoneCode,
               phone: phonenum,
               code: code1 + code2 + code3 + code4,
            };
            apiData = verifyOTPCode;
         } else {
            signInWithPhone.body = {
               phoneCode,
               phone: phonenum,
            };
            apiData = signInWithPhone;
         }
      }

      this._loginOrSignupData(apiData);
   };

   handleSignData = (e) => {
      e.preventDefault();
      const {
         formData: {
            firstName,
            lastName,
            password,
            phonenum,
            email,
            phoneCode,
         },
      } = this.state;

      const { signInWithEmail } = auth;

      let apiData;

      signInWithEmail.body = {
         firstName,
         lastName,
         password,
         phone: phonenum,
         email,
         phoneCode,
      };
      apiData = signInWithEmail;

      api({ ...apiData })
         .then((data) => {
            Toast({ type: "success", message: data.message });
            // this.resetData();
            this.setState({
               isSignup: false,
            });
         })
         .catch((err) => {
            Toast({ type: "error", message: err.message });
         });
   };

   _loginOrSignupData = (apiData) => {
      api({ ...apiData })
         .then((data) => {
            Toast({ type: "success", message: data.message });
            this.setState(
               {
                  isNewUser:
                     data.isNewUser !== undefined ? data.isNewUser : false,
               },
               () => {
                  if (data.token) {
                     login({ token: data.token });
                     this.props.history.push("/dashboard");
                  }
               }
            );
         })
         .catch((err) => {
            Toast({ type: "error", message: err.message });
         });
   };

   render() {
      const {
         isLoaded,
         isLoginOTP,
         isSignup,
         isPassReset,
         formData,
         isOTPSent,
         OTPCode,
         isNewUser,
         profilePic,
      } = this.state;
      let loginTitle = "";
      let toast = {
         type: "success",
         message: "Logged",
      };
      if (!isSignup && !isPassReset) {
         loginTitle = `Login with ${!isLoginOTP ? "Email" : "OTP"}`;
      } else {
         loginTitle = `${isPassReset ? "Recover" : "Create"} Account`;
      }
      return (
         <div className="login-block row no-gutters">
            <div className="col-lg-6 login-background py-lg-5 d-none d-sm-block col-md-6">
               <img
                  src={require(`../../assets/images/${
                     !isSignup ? "login-bg" : "signup-bg"
                  }.png`)}
                  alt="login-bg"
               />
            </div>
            <div className="col-lg-6 login-form col-md-6 col-12">
               <div
                  className="mb-5 login-logo"
                  style={{ opacity: isLoaded ? 1 : 0 }}
               >
                  <MediumLogo />
               </div>
               {!isSignup ? (
                  <LoginBlock
                     handleInput={this.handleInput}
                     handleSubmit={this.handleSubmit}
                     formData={formData}
                     loginTitle={loginTitle}
                     isLoginOTP={isLoginOTP}
                     isSignup={isSignup}
                     isPassReset={isPassReset}
                     toggle={this.toggle}
                     isNewUser={isNewUser}
                  />
               ) : (
                  <SignUpBlock
                     handleInput={this.handleInput}
                     handleSubmit={this.handleSubmit}
                     formData={formData}
                     loginTitle={loginTitle}
                     isLoginOTP={isLoginOTP}
                     isSignup={isSignup}
                     sendOTPCode={this.sendOTPCode}
                     handleSignData={this.handleSignData}
                     isOTPSent={isOTPSent}
                     isNewUser={isNewUser}
                     profilePic={profilePic}
                     toggle={this.toggle}
                     OTPCode={OTPCode}
                  />
               )}
               {/* <Form onSubmit={this.handleSubmit}>
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
                              onChange={this.handleInput}
                              value={formData.email}
                           />
                           {isSignup && (
                              <NormalInput
                                 type="text"
                                 name="name"
                                 id="exampleEmail"
                                 placeholder="Enter Name"
                                 onChange={this.handleInput}
                                 value={formData.name}
                              />
                           )}
                           {!isPassReset && (
                              <NormalInput
                                 type="password"
                                 name="password"
                                 id="password"
                                 placeholder="Enter Password"
                                 onChange={this.handleInput}
                                 value={formData.password}
                              />
                           )}
                        </div>
                     </>
                  ) : (
                     <NormalInput
                        type="tel"
                        name="phonenum"
                        id="phonenum"
                        placeholder="Enter Number"
                        onChange={this.handleInput}
                        value={formData.phonenum}
                     />
                  )}
                  {!isSignup && !isPassReset && (
                     <div className="d-flex mx-2 align-items-center justify-content-between">
                        <p
                           className="text-grey cursor-pointer text-hg-underline"
                           onClick={() => {
                              Toast(toast);
                              this.toggle("isLoginOTP");
                           }}
                        >
                           {`Login with ${isLoginOTP ? "Email" : "OTP"}`}
                        </p>
                        {!isLoginOTP && (
                           <p
                              className="text-blue cursor-pointer text-hg-underline"
                              onClick={() => this.toggle("isPassReset")}
                           >
                              Reset Password
                           </p>
                        )}
                     </div>
                  )}
                  {isPassReset && (
                     <p
                        onClick={() => this.toggle("isPassReset")}
                        className="text-right cursor-pointer mx-2 text-hg-underline"
                     >
                        Back
                     </p>
                  )}
                  <div className="action-btn mt-5 d-flex flex-wrap align-items-center justify-content-between">
                     <button
                        className="btn btn-blue mb-3 mb-lg-0"
                        type="submit"
                     >
                        {!isPassReset
                           ? !isSignup
                              ? "Login"
                              : "Sign up"
                           : "Send Mail"}
                     </button>
                     {!isPassReset && (
                        <button
                           className="btn btn-white"
                           onClick={() => this.toggle("isSignup")}
                        >
                           {!isSignup ? "Create Account" : "Login"}
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
               </Form> */}
            </div>
            {!isLoaded && <AnimatedLogo />}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   data: state.home.data,
});

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
      {
         getHomePageDetails,
      },
      dispatch
   );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginClass);
