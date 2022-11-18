/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/EditActivity/ActivityWizard";
import ActivityWizardImg from "./EditActivity.png";
import ActivityStore from "!!raw-loader!../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../containers/CreateActivity/style.scss";
export const ActivityWizard = () => {
  return (
    <>
      <Tabview
        componentName="ActivityWizard"
        path="\src\containers\EditActivity\ActivityWizard.js"
        description="This is the component of the edit activity wizard, where you can edit information 
        related to any activity. When you will click on the edit button then you will get information in the form related to that activity. You can edit the title of your information, subject, education level and upload a new image if you want to change it.
          After this, you will build your activity and then click on the save and continue button."
        codeSnippet={CodeSnippet}
        libraryUsed={["props-types", "react-redux", "react-router-dom", "swal"]}
        customHooks={[
          {
            name:
              "/src/components/ResourceCard/EditResource/ResourceDescribeActivity",
            url:
              "?path=/story/component-resourcecard-editresource-resourcedescribeactivity--component",
          },
          {
            name:
              "/src/components/ResourceCard/EditResource/ResourceActivityBuild",
            url:
              "?path=/story/component-resourcecard-editresource-resourceactivitybuild--component",
          },
          {
            name: "/src/containers/EditActivity/ActivityMeter",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: ActivityStore },
        ]}
        apiUsed={[]}
        images={ActivityWizardImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/6031/playlist/12875/activity/47411/edit"
      />
    </>
  );
};
