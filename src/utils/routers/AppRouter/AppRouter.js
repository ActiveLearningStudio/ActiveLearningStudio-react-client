/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../routers/AppRouter";
export const AppRouter = () => {
  return (
    <>
      <Tabview
        componentName="AppRouter"
        path="\src\routers\AppRouter.js"
        description="This is the component for the app route where all the routes of your project
         will be mentioned here. When you go to any page then this component will check the redirect
          link and process that route accordingly. The app route is the entry point of every project
           from where you can control the redirection of any page. On the top, 
        you will import all the components and use them in route to redirect properly."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "history",
          "loadable",
          "ReactGA",
        ]}
        customHooks={[
          {
            name: "components/Header",
            url: "?path=/story/component-header-index--component",
          },
          {
            name: "/src/components/Sidebar/index",
            url: "?path=/story/component-sidebar-index--component",
          },
          {
            name: "/src/routers/PublicRoute",
            url: "?path=/story/routers-publicroute--component",
          },
          {
            name: "/src/routers/PrivateRoute",
            url: "?path=/story/routers-privateroute--component",
          },
          {
            name: "/src/containers/CreateActivity/index",
            url: "",
          },
          {
            name: "/src/containers/ProjectShareTemplate",
            url: "",
          },
          {
            name: "/src/containers/Preview/index",
            url: "",
          },
          {
            name: "/src/containers/Auth/RegisterPage",
            url: "?path=/story/auth-registerpage--component",
          },
          {
            name: "/src/containers/Auth/ForgotPasswordPage",
            url: "?path=/story/auth-forgetpasswordpage--component",
          },
          {
            name: "/src/containers/Groups/AddMembers/index",
            url: "?path=/story/groups-addgroupmember--index",
          },
          {
            name: "/src/containers/Auth/ConfirmEmailPage",
            url: "",
          },
          {
            name: "/src/containers/EditActivity/index",
            url: "",
          },
          {
            name: "/src/containers/LMS/LTI/Activity/index",
            url: "",
          },
          {
            name: "/src/containers/Auth/VevinsityRegistration",
            url: "?path=/story/auth-registerpage--component",
          },
          {
            name: "/src/containers/ManageOrganization/index",
            url: "",
          },
          {
            name: "/src/containers/Account/ProfilePage",
            url: "?path=/story/profile-profilepage--component",
          },
          {
            name: "/src/containers/Admin/index",
            url: "?path=/story/admin-index--component",
          },
          {
            name: "/src/containers/LMS/Canvas/DeepLinking/SearchPage/index",
            url: "",
          },
          {
            name: "/src/containers/Groups/index",
            url: "",
          },
          {
            name: "/src/containers/Teams/AddProjects/index",
            url: "?path=/story/teams-addprojects--index",
          },
          {
            name: "/src/containers/SecureProjectPreview",
            url: "",
          },
          {
            name: "/src/containers/Projects/index",
            url: "?path=/story/my-projects-index--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
