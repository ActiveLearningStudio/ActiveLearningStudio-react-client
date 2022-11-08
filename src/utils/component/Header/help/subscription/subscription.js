/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import SubSnippet from "!!raw-loader!../../../../../components/Header/multitenancyDropdown";
import ApiSnippet from "!!raw-loader!../../../../../services/storage.service";
import subscription from "./subscription.png";
import SubStore from "!!raw-loader!../../../../../store/actions/organization";
import Stylesheet from "!!raw-loader!../../../../../components/Header/style.scss";
export const Subscription = () => {
  return (
    <>
      <Tabview
        componentName="Subscription"
        path="\src\components\Header\multitenancyDropdown.js"
        description="In this component, you will see organization subscribe by any user profile.
     When you click on it,
     you will see all the organization lists to which you have been subscribed."
        codeSnippet={SubSnippet}
        libraryUsed={["react-bootstrap", "react-redux", "react-router-dom"]}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/store/actions/organization", pathCode: SubStore },
        ]}
        apiUsed={[
          { path: "/src/services/storage.service", apicode: ApiSnippet },
        ]}
        images={subscription}
        stylesheetUsed={Stylesheet}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
