import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHomePageDetails } from "action/home";
import { ReactComponent as MediumLogo } from "../../assets/images/logo/medium-logo.svg";
import { Form, FormGroup, Input } from "reactstrap";
import { AnimatedLogo } from "component/logo";

export class LoginClass extends Component {
   state = {
      isLoaded: false,
      isLoginOTP: false,
      isSignup: false,
      isPassReset: false,
   };
   componentDidMount() {
      this.props.getHomePageDetails();
      setTimeout(() => {
         this.setState({
            isLoaded: true,
         });
      }, 8000);
   }

   toggle = (name) => {
      this.setState({
         [name]: !this.state[name],
      });
   };

   render() {
      const { isLoaded, isLoginOTP, isSignup, isPassReset } = this.state;
      let loginTitle = "";
      if (!isSignup && !isPassReset) {
         loginTitle = `Login with ${!isLoginOTP ? "Email" : "OTP"}`;
      } else {
         loginTitle = `${isPassReset ? "Recover" : "Create"} Account`;
      }
      return (
         <div className="login-block row">
            <div className="col-7 login-background">
               <img
                  src={require("../../assets/images/login-bg.jpg")}
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

               <Form onSubmit={(e) => e.preventDefault()}>
                  <div className="login-title mb-4">
                     <h2>{loginTitle}</h2>
                  </div>
                  {!isLoginOTP ? (
                     <>
                        <div className="login-block">
                           <FormGroup>
                              <Input
                                 type="email"
                                 name="email"
                                 className="chatly-input"
                                 id="exampleEmail"
                                 placeholder="Enter Email"
                              />
                           </FormGroup>
                           {isSignup && (
                              <FormGroup>
                                 <Input
                                    type="text"
                                    name="name"
                                    className="chatly-input"
                                    id="exampleEmail"
                                    placeholder="Enter Name"
                                 />
                              </FormGroup>
                           )}
                           {!isPassReset && (
                              <FormGroup>
                                 <Input
                                    type="password"
                                    name="password"
                                    className="chatly-input"
                                    id="password"
                                    placeholder="Enter Password"
                                 />
                              </FormGroup>
                           )}
                        </div>
                     </>
                  ) : (
                     <FormGroup>
                        <Input
                           type="tel"
                           name="phonenum"
                           id="phonenum"
                           placeholder="Enter Number"
                        />
                     </FormGroup>
                  )}
                  {!isSignup && !isPassReset && (
                     <div className="d-flex mx-2 align-items-center justify-content-between">
                        <p
                           className="text-grey cursor-pointer text-hg-underline"
                           onClick={() => this.toggle("isLoginOTP")}
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
               </Form>
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
