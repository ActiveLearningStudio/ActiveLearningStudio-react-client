/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/Auth/LoginPage";
import LoginImg from "./login.png";
import Stylesheetused from "!!raw-loader!../../../containers/Auth/style.scss";
import StoreSnippet from "!!raw-loader!../../../store/actions/auth";
export const Login = () => {
  return (
    <>
      <Tabview
        componentName="LoginPage"
        path="\src\containers\Auth\LoginPage.js"
        description="In the login module, you can log in to your curriki studio account. By filling the login form click on the login button and then you will be redirect to the curriki studio dashboard.
          If your credential is wrong then you will get an error message regarding your account. "
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "prop-types",
          "react-fontawesome",
          "react-router-dom",
          "validator",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          { name: "/src/containers/Auth/Error", url: "" },
          {
            name: "/src/containers/Auth/Logo",
            url: "?path=/story/auth-logo--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/auth", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={LoginImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/login"
      />
    </>
  );
};
