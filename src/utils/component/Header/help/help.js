/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import HelpSnippet from "!!raw-loader!../../../../containers/App/help";
import helpimg from "./help.png";
import Stylesheetused from "!!raw-loader!../../../../components/Header/style.scss";
export const Help = () => {
  return (
    <>
      <Tabview
        componentName="Help"
        path="\src\containers\App\help.js"
        description="The help component will appear in the header section on the top right corner
     of the curriki studio screen. When you click on it, then you will see a list of helping 
     contents in a well-designed modal. In this list, you will see different options for your help like Getting stated,
     Create Learning Projects, curriki studio tips, and many more."
        codeSnippet={HelpSnippet}
        libraryUsed={["react-redux"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images={helpimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/"
      />
    </>
  );
};
