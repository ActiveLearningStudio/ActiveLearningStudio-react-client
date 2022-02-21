/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/Auth/RegisterPage";
import RegisterImg from "./register.png";
import Stylesheetused from "!!raw-loader!../../../containers/Auth/style.scss";
import StoreSnippet from "!!raw-loader!../../../store/actions/auth";
export const Register = () => {
  return (
    <>
      <Tabview
        componentName="RegisterPage"
        path="\src\containers\Auth\RegisterPage.js"
        description="This is the component of the register page. On this page, you can create your new curriki studio account. By clicking on the link to the register button, 
         you will see a signup form. Enter the account details which you want to set
          and then click on the signup button. In this way, you can create a new curriki studio account.
There is also another option for registering yourself, which is signup with a google login. 
In this link, you can also create your Curriki studio account with Gmail if you already sign in to your Gmail account"
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "prop-types",
          "react-fontawesome",
          "react-router-dom",
          "validator",
          "swal",
          "query-string",
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
        images={RegisterImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/register"
      />
    </>
  );
};
