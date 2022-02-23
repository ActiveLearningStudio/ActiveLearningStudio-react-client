/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../containers/Preview/PlaylistPreview/components/ActivitiesDropdown";
import Screenshot from "./Dropdown.png";
export const ActivitiesDropdown = () => {
  return (
    <>
      <Tabview
        componentName="ActivitiesDropdown"
        path="\src\containers\Preview\PlaylistPreview\component\ActivitiesDropdown.js"
        description="The activity dropdown is used for showing dropdown around every activity where the user can perform different actions like preview, edit, delete and share. 
        This component will use every time whenever we need to show dropdown around the activities."
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types"]}
        customHooks={[
          {
            name: "components/ActivityPreviewCard/ActivityPreviewCardDropdown",
            url: "",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed=""
        example="hhttps://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47553/preview"
      />
    </>
  );
};
