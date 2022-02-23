/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/notification.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const NotificationServices = () => {
  return (
    <>
      <Tabview
        componentName="NotificationServices"
        path="\src\services\notification.services.js"
        description="This services module is used for notification purposes. 
        When you will read all notifications then read all notifications will be called which 
        you will see on the notification area. If you want to delete only one notification, 
        then you will call the delete notification API used in this service module."
        codeSnippet={CodeSnippet}
        libraryUsed={["config"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/http.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
