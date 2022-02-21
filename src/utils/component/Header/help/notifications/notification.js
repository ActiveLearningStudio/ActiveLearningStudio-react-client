/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import codeSnippet from "!!raw-loader!../../../../../components/Header/notification";
import Notificationimg from "./notification.png";
import NotiStore from "!!raw-loader!../../../../../store/actions/notification";
import Stylesheetused from "!!raw-loader!../../../../../components/Header/style.scss";
export const Notification = () => {
  return (
    <>
      <Tabview
        componentName="Notification"
        path="\src\components\Header\notification.js"
        description="This is the component for the notification area of the header section.
     If no notification will present then you will see a message for no notification available
      for now. If you have some notifications link to your profile then you will see all those 
      notifications. There are also divisions for notifications if notifications are older then
       they will be lies in the older section and if notifications are one day older then they
        will be lies in the yesterday section. while your new notifications will be lies in today's section."
        codeSnippet={codeSnippet}
        libraryUsed={["react-bootstrap", "react-redux", "react-router-dom"]}
        customHooks={[
          {
            name: "containers/Notification/NotificationArea",
            url: "?path=/story/notification-notificationarea--component",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/notification", pathCode: NotiStore },
        ]}
        apiUsed={[]}
        images={Notificationimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
