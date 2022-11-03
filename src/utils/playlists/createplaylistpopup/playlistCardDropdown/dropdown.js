/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import DropdownSnippet from "!!raw-loader!../../../../containers/Playlists/PlaylistCard/PlaylistCardDropdown";
import Dropdownimg from "./playlistCardDropdown.png";
import DropdownStore from "!!raw-loader!../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../containers/Playlists/PlaylistCard/style.scss";
export const Dropdown = () => {
  return (
    <>
      <Tabview
        componentName="PlaylistCardDropdown"
        path="\src\containers\Playlists\playlisCard\PlaylistCardDropdown.js"
        description="This component is used for displaying the dropdown of the playlist.
     In the dropdown, you will see a vertical menu for different actions, where you can preview ,
     edit, duplicate and publish the playlist."
        codeSnippet={DropdownSnippet}
        libraryUsed={[
          "react-bootstrap",
          "react-redux",
          "react-fontawesome",
          "react-router-dom",
          "prop-types",
        ]}
        customHooks={[
          {
            name: "/src/components/ResourceCard/ShareLink",
            url: "?path=/story/component-resourcecard-sharelink--component",
          },
          {
            name: "/src/components/ResourceCard/shareResource",
            url: "?path=/story/component-resourcecard-shareresource--component",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: DropdownStore },
        ]}
        apiUsed={[]}
        images={Dropdownimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/"
      />
    </>
  );
};
