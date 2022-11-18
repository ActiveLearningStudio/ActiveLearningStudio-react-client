/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../components/models/pexels";
import Screenshot from "./pexels.png";
import StoreSnippet from "!!raw-loader!../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../components/models/styles.scss";
export const Pexels = () => {
  return (
    <>
      <Tabview
        componentName="Pexels"
        path="\src\components\models\pexels.js"
        description="Through this component, you can change the thumbnail of any project or any resource.
         The component will accept props to change the thumbnail of the project/resource.
          There is a search box to select any thumbnail, when you search and click on the image below then 
          it will be select as a new thumbnail. After this there is a submit button through this you will update your thumbnail for your project."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-bootstrap",
          "react-redux",
          "react-fontawesome",
          "pexels-api-wrapper",
          "axios",
        ]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/create"
      />
    </>
  );
};
