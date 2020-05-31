export const auth = {
   loginWithEmail: {
      url: "/auth/login",
      method: "post",
      //   token: true,
      get api() {
         return `${this.url}`;
      },
   },
   signInWithPhone: {
      url: "/phone/sendcode",
      method: "post",
      //   token: true,
      get api() {
         return `${this.url}`;
      },
   },
   signInWithEmail: {
      url: "/auth/register",
      method: "post",
      //   token: true,
      get api() {
         return `${this.url}`;
      },
   },
   verifyOTPCode: {
      url: "/phone/verify",
      method: "post",
      //   token: true,
      get api() {
         return `${this.url}`;
      },
   },
};
