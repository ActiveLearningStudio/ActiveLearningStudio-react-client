/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import FooterSnippet from "!!raw-loader!../../../components/Footer/index";
import footerimg from "./footer.PNG";
import Stylesheetused from "!!raw-loader!../../../containers/App/style.scss";
export const Footer = () => {
  return (
    <>
      <Tabview
        componentName="Footer"
        path="\src\components\Footer\index.js"
        description="The code for the footer section will be lies in this component.
     In this component, you will see three links related to terms of services, privacy policy,
      and help & support. You can click on these links and find your relative information. 
    After this, you will see the currikistudio logo on the right bottom side."
        codeSnippet={FooterSnippet}
        libraryUsed={[]}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[]}
        apiUsed={[]}
        images={footerimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
