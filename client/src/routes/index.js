import React, { Component } from "react";
import { Route, Router, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routers from "./routes";

import * as Layout from "../layout";
import * as Pages from "../pages";

import { history } from "../helpers";

class RoutesClass extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderRoute: false,
         pathname: null,
         loading: true,
      };
   }

   componentWillMount() {}

   componentDidMount() {}

   componentWillReceiveProps({ userPermissionDetails }) {}

   render() {
      return (
         <div className="theme dark">
            <Router history={history}>
               {Routers.map(
                  ({
                     component,
                     redirect,
                     path,
                     exact = false,
                     auth = true,
                     childrens = [],
                  }) => {
                     if (childrens.length > 0) {
                        return (
                           <Route
                              path={path}
                              exact={exact}
                              key={path}
                              render={(props) => {
                                 if (redirect) {
                                    if (props.location.pathname == path) {
                                       props.history.push(redirect);
                                    }
                                 }

                                 const LayoutComponent = Layout[component];

                                 return (
                                    <LayoutComponent {...props}>
                                       {childrens.map(
                                          ({
                                             component: ChildrenComponent,
                                             path: childrenPath,
                                             exact = false,
                                             auth = true,
                                          }) => {
                                             return (
                                                <Route
                                                   path={path + childrenPath}
                                                   exact={exact}
                                                   key={path + childrenPath}
                                                   render={(props) => {
                                                      let PageComponent =
                                                         Pages[
                                                            ChildrenComponent
                                                         ];

                                                      return (
                                                         <PageComponent
                                                            {...props}
                                                         />
                                                      );
                                                   }}
                                                />
                                             );
                                          }
                                       )}
                                    </LayoutComponent>
                                 );
                              }}
                           />
                        );
                     }

                     return (
                        <Route
                           path={path}
                           exact={exact}
                           key={component || 2322}
                           render={(props) => {
                              if (component) {
                                 let PageComponent = Pages[component];
                                 return <PageComponent />;
                              }
                              if (redirect) {
                                 return <Redirect to={redirect} />;
                              }
                              return <div></div>;
                           }}
                        />
                     );
                  }
               )}
            </Router>
            <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnVisibilityChange
               draggable
               pauseOnHover
            />
         </div>
      );
   }
}

export default RoutesClass;
