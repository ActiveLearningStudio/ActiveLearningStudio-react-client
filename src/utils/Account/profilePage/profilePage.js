/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import ProfileCodeSnippet from "!!raw-loader!../../../containers/Account/ProfilePage";
import PasswordStore from "!!raw-loader!../../../store/actions/auth";
import stylesheetUsed from "!!raw-loader!../../../containers/Account/style.scss";
import ProfilePageImg from "./profilePage.png";
export const ProfilePage = () => {
  return (
    <>
      <Tabview
        componentName="ProfilePage"
        path="\src\containers\Account\ProfilePage.js"
        description="In this component, you will see the details related to your profile. You will see your personal and organizational detail. On the other hand, you can also update your organization and personal detail. For updating your profile, You have to edit your profile page form, by entering your new name, phone number, organization name, select organization type, etc.
        After form submission, your profile will be updated. In the end, you can also see your LMS publishing list which is associated with your account."
        codeSnippet={ProfileCodeSnippet}
        libraryUsed={[
          "react-redux",
          "props-types",
          "react-fontawesome",
          "validator",
          "swal",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name: "/src/components/Footer/index",
            url: "?path=/story/component-footer-index--component",
          },
          { name: "/src/containers/Auth/Error", url: "" },
        ]}
        reduxStore={[
          { path: "/src/store/actions/auth", pathCode: PasswordStore },
        ]}
        apiUsed={[]}
        images={ProfilePageImg}
        stylesheetUsed={stylesheetUsed}
        example="https://dev.currikistudio.org/org/currikistudio/account"
      />
    </>
  );
};
