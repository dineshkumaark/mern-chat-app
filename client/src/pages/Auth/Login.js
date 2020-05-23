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

export class LoginClass extends Component {
   state = {
      isLoaded: false,
      isLoginOTP: false,
      isSignup: false,
      isPassReset: false,
      isOTPSent: false,
      formData: {
         name: "",
         phonenum: "",
         email: "",
         password: "",
         phoneCode: "",
      },
      OTPCode: {
         code1: "",
         code2: "",
         code3: "",
         code4: "",
      },
   };

   componentDidMount() {
      this.props.getHomePageDetails();
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

   handleInput = ({ target: { name, value } }, lastvar = "") => {
      const { formData, OTPCode } = this.state;
      if (lastvar !== "") {
         OTPCode[name] = value;
         this.setState({
            OTPCode,
         });
      } else {
         formData[name] = value;
         this.setState({
            formData,
         });
      }
   };

   toggle = (name) => {
      this.setState({
         [name]: !this.state[name],
      });
   };

   sendOTPCode = () => {
      this.toggle("isOTPSent");
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const {
         isSignup,
         formData: { name, password, phonenum, email },
         isLoginOTP,
      } = this.state;
      let payload = {};
      console.log({ name, password, phonenum, email });
      this.resetData();
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
         <div className="login-block row">
            <div className="col-7 login-background py-5">
               <img
                  src={require(`../../assets/images/${
                     !isSignup ? "login-bg" : "signup-bg"
                  }.png`)}
                  alt="login-bg"
               />
            </div>
            <div className="col-5 login-form">
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
                     isOTPSent={isOTPSent}
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
