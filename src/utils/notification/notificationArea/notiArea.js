/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/Notification/NotificationArea";
import notifyArea from "./notifyArea.png";
import NotificationStore from "!!raw-loader!../../../store/actions/notification";
import Stylesheetused from "!!raw-loader!../../../containers/Notification/style.scss";
export const NotiArea = () => {
  return (
    <>
      <Tabview
        componentName="NotificationArea"
        path="\src\containers\Notification\NotificationArea.js"
        description="Basically, this component is used for the creation of notification cards.
          you will see a small image with a capital letter of the user's name. After this, the notification 
 description will be shown, which you can read and understand what the sender is saying in the notification.
  You will also see the time of notification which will show that how old is that notification is. In the
   end, you will find a small dropdown list, from where you can easily delete your notification."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "react-bootstrap",
          "react-fontawesome",
          "prop-types",
        ]}
        customHooks={[]}
        reduxStore={[
          {
            path: "/src/store/actions/notification",
            pathCode: NotificationStore,
          },
        ]}
        apiUsed={[]}
        images={notifyArea}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/notification"
      />
    </>
  );
};
