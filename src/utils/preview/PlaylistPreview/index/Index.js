/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../containers/Preview/PlaylistPreview/index";
import Stylesheetused from "!!raw-loader!../../../../containers/Preview/PlaylistPreview/style.scss";
import StoreSnippet from "!!raw-loader!../../../../store/actions/resource";
import Screenshot from "./indexPreview.png";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="PlaylistPreview"
        path="\src\containers\Preview\PlaylistPreview\index.js"
        description="In the playlist preview component, you will find the project name, playlist name, and the activity at the top of the page. 
        The purpose of this component is to show the preview of the playlist, where the user can perform or see his/her activity. 
        This is the index of playlist preview where all the components are called and used for meaningful purposes. 
        A swal (prompt box) is also used to warn the front user during performing different actions. "
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "react-router-dom",
          "prop-types",
          "react-fontawesome",
          "swal",
          "react-switch",
          "react-bootstrap",
        ]}
        customHooks={[
          {
            name:
              "/src/containers/Preview/PlaylistPreview/components/PreviousLink",
            url:
              "?path=/story/preview-playlistpreview-component-previouslink--component",
          },
          {
            name: "/src/containers/Preview/PlaylistPreview/components/NextLink",
            url:
              "?path=/story/preview-playlistpreview-component-nextlink--component",
          },
          {
            name:
              "/src/containers/Preview/PlaylistPreview/components/ActivitiesList",
            url:
              "?path=/story/preview-playlistpreview-component-activitieslist--component",
          },
          {
            name: "/src/containers/H5PPreview",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="hhttps://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47553/preview"
      />
    </>
  );
};
