/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../components/models/GoogleLoginModal";
import Screenshot from "./googleLogin.png";
import StoreSnippet from "!!raw-loader!../../../../store/actions/gapi";
export const GoogleLogin = () => {
  return (
    <>
      <Tabview
        componentName="GoogleLoginModal"
        path="\src\components\models\GoogleLoginModal.js"
        description="In this component, you will see a small description and a google
         login button. When you click on the Google login button then you will see  a modal
          to share your project to google classroom. If you are sure to share your project to google classroom then you can click on confirm button. 
        In this way, you will share your project to google classroom through this component. "
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-bootstrap",
          "react-redux",
          "react-google-login",
          "react-router-dom",
          "formik",
        ]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/actions/gapi", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed=""
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
