/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/Auth/Logo";
import LogoImg from "./logo.png";
import Stylesheetused from "!!raw-loader!../../../containers/Auth/style.scss";
export const Logo = () => {
  return (
    <>
      <Tabview
        componentName="Logo"
        path="\src\containers\Auth\Logo.js"
        description="This component will show the logo of the curriki studio, which shows the identity of any organization. "
        codeSnippet={CodeSnippet}
        libraryUsed={["react-redux"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images={LogoImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/login"
      />
    </>
  );
};
