/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import codeSnippet from "!!raw-loader!../../../containers/Admin/heading";
import headingImg from "./headingImg.png";
import Stylesheetused from "!!raw-loader!../../../containers/Admin/style.scss";
export const Heading = () => {
  return (
    <>
      <Tabview
        componentName="Heading"
        path="\src\containers\Admin\heading.js"
        description="This is the heading component, which is used to heading in admin panel."
        codeSnippet={codeSnippet}
        libraryUsed={["react-redux"]}
        apiUsed={[]}
        stylesheetUsed={Stylesheetused}
        images={headingImg}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
