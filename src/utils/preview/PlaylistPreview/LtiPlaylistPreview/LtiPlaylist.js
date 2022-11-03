/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../containers/Preview/PlaylistPreview/LtiPlaylistPreview";
import Stylesheetused from "!!raw-loader!../../../../containers/Preview/PlaylistPreview/style.scss";
import StoreSnippet from "!!raw-loader!../../../../store/actions/playlist";
import Screenshot from "./LtiPreview.png";
export const LtiPlaylist = () => {
  return (
    <>
      <Tabview
        componentName="LtiPlaylistPreview"
        path="\src\containers\Preview\PlaylistPreview\LtiPlaylistPreview.js"
        description="You will see the preview of a playlist in this component. 
        In the header section, you will see the name of the project and playlist. 
        On the right side, you will see all activities related to that project. 
        While data related to each activity will be 
        shown in the lti modal where you will find what activity is doing in this project."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "react-router-dom",
          "prop-types",
          "react-fontawesome",
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
              "/src/containers/Preview/PlaylistPreview/components/ActivitiesDropdown",
            url:
              "?path=/story/preview-playlistpreview-component-activitiesdropdown--component",
          },
          {
            name: "/src/containers/H5PPreview",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/playlist", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="hhttps://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47553/preview"
      />
    </>
  );
};
