/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../components/Loading/PlaylistsLoading";
//import Screenshot from "./ActivityCard.png";
export const PlaylistLoading = () => {
  return (
    <>
      <Tabview
        componentName="PlaylistsLoading"
        path="\src\components\Loading\PlaylistsLoading.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={["lib/placeholders"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example="https://dev.currikistudio.org/"
      />
    </>
  );
};
